import type { HistoryEvent } from '@aws-sdk/client-sfn';

enum ClipsStepNames {
  processClips = 'Process Clips',
  downloadIndividualClips = 'Download Individual Clips',
  callMediaconvert = 'Call Mediaconvert',
  uploadToYoutube = 'Upload to Youtube?',
  sendEmail = 'Send Email',
  sendExportFailureEmail = 'Send Export Failure Email',
}

enum MobileStepNames {
  downloadClips = 'Download Clips',
  cropVideo = 'Crop Video',
  CombineVideo = 'Combine Video',
  sendMobileNotificationEmail = 'Send Mobile Notification Email',
  sendFailureEmail = 'Send Failure Email',
}

enum UserProgressNames {
  done = 'Done.',
  rendering = 'Rendering...',
  gettingClips = 'Getting Clip(s)...',
  failed = 'Failed.',
  uploading = 'Uploading...',
}

const ClipsStepProgress = Object.freeze({
  'Process Clips': UserProgressNames.gettingClips,
  'Download Individual Clips': UserProgressNames.rendering,
  'Call Mediaconvert': UserProgressNames.rendering,
  'Upload to Youtube?': UserProgressNames.uploading,
  'Send Email': UserProgressNames.done,
  'Send Export Failure Email': UserProgressNames.failed,
});

const MobileStepProgress = Object.freeze({
  'Download Clips': UserProgressNames.gettingClips,
  'Crop Video': UserProgressNames.rendering,
  'Combine Video': UserProgressNames.rendering,
  'Send Mobile Notification Email': UserProgressNames.done,
  'Send Failure Email': UserProgressNames.failed,
});

const StepNames = Object.freeze({
  clips: ClipsStepNames,
  mobile: MobileStepNames,
});

const StepProgress = Object.freeze({
  clips: ClipsStepProgress,
  mobile: MobileStepProgress,
});

const getEventDetails = (event: HistoryEvent) => {
  const eventKeys = Object.keys(event);

  const detailsKey = eventKeys.find((key) => {
    if (event[key] === undefined) {
      return false;
    }
    return key.includes('Details');
  });

  const details = detailsKey ? event[detailsKey] : undefined;

  return details;
};

const parseSfnEvents = (events: HistoryEvent[], eventType: string) => {
  // gets all events, makes a copy, reverses the order
  // gets the first event that has event details we care about
  const lastEvent = events
    .slice(0)
    .reverse()
    .find((event) => {
      const details = getEventDetails(event);
      if (!details) {
        return false;
      }
      if (!details?.output) {
        return false;
      }

      if (details?.type) {
        if (details?.type.includes('Failed')) {
          return true;
        }
      }

      const acceptableNames = Object.values(StepNames[eventType]);

      if (details?.name) {
        if (acceptableNames.includes(details.name)) {
          return true;
        }
      }

      if (details?.output) {
        const { Payload } = JSON.parse(details.output);

        if (Payload?.url) {
          return true;
        }
      }

      return false;
    });

  if (!lastEvent) {
    return null;
  }

  const details = getEventDetails(lastEvent);

  const { timestamp } = lastEvent;
  const { name, output, type } = details;

  if (type) {
    if (type.includes('Failed')) {
      return {
        endDate: timestamp,
        name: 'Failure',
        progress: UserProgressNames.failed,
        isDone: false,
        url: null,
      };
    }
  }

  if (output) {
    const outputObj = JSON.parse(output);
    const { Payload } = outputObj;
    if (Payload?.url) {
      return {
        endDate: timestamp,
        name,
        url: Payload.url,
        progress: UserProgressNames.done,
        isDone: true,
      };
    }
  }

  if (Object.values(StepNames[eventType]).includes(name)) {
    const isDone = StepProgress[eventType][name] === UserProgressNames.done;
    const endDate = isDone ? timestamp : new Date();
    return {
      endDate,
      name,
      url: null,
      progress: StepProgress[eventType][name],
      isDone,
    };
  }

  return null;
};

export default parseSfnEvents;
