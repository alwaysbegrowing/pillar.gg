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

const StepNames = Object.freeze({
  clips: ClipsStepNames,
  mobile: MobileStepNames,
});

const NumSteps = Object.freeze({
  clips: 96,
  mobile: 23,
});

const calcProgress = (eventId: number, uploadType: string) => {
  const steps = NumSteps[uploadType];
  return Math.floor((eventId / steps) * 100);
};

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
        progress: -1,
        isDone: false,
        url: null,
        id: lastEvent?.id,
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
        progress: 100,
        id: lastEvent?.id,
        isDone: true,
      };
    }
  }

  if (Object.values(StepNames[eventType]).includes(name)) {
    const progress = calcProgress(lastEvent?.id || 0, eventType);
    const isDone = progress === 100;
    const endDate = isDone ? timestamp : new Date();
    return {
      endDate,
      name,
      url: null,
      progress,
      id: lastEvent?.id,
      isDone,
    };
  }

  return null;
};

export default parseSfnEvents;
