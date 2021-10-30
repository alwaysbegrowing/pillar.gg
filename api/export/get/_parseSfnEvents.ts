import type { HistoryEvent } from '@aws-sdk/client-sfn';

const ClipsStepNames = Object.freeze({
  processClips: 'Process Clips',
  downloadIndividualClips: 'Download Individual Clips',
  callMediaconvert: 'Call Mediaconvert',
  uploadToYoutube: 'Upload to Youtube?',
  sendEmail: 'Send Email',
  sendExportFailureEmail: 'Send Export Failure Email',
});

const MobileStepNames = Object.freeze({
  downloadClips: 'Download Clips',
  cropVideo: 'Crop Video',
  CombineVideo: 'Combine Video',
  sendMobileNotificationEmail: 'Send Mobile Notification Email',
  sendFailureEmail: 'Send Failure Email',
});

const UserProgressNames = Object.freeze({
  done: 'Done.',
  rendering: 'Rendering...',
  gettingClips: 'Getting Clip(s)...',
  failed: 'Failed.',
  uploading: 'Uploading...',
});

const ClipsStepProgress = Object.freeze({
  'Process Clips': UserProgressNames.gettingClips,
  'Download Individual Clips': UserProgressNames.gettingClips,
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
    if (!key.includes('Details')) {
      return false;
    }
    if (event[key] === undefined) {
      return false;
    }
    return true;
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
  const { name, output } = details;

  if (output) {
    const outputObj = JSON.parse(output);
    const { Payload } = outputObj;
    if (Payload?.url) {
      return {
        endDate: timestamp,
        name,
        url: Payload.url,
        progress: UserProgressNames.done,
      };
    }
  }

  if (Object.values(StepNames[eventType]).includes(name)) {
    return {
      endDate: timestamp,
      name,
      url: null,
      progress: StepProgress[eventType][name],
    };
  }

  return null;
};

export default parseSfnEvents;
