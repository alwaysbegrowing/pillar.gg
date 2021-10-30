/* eslint-disable @typescript-eslint/consistent-indexed-object-style */

export const ExportTypes = Object.freeze({
  mobile: 'mobile',
  youtube: 'youtube',
  clips: 'clips',
});

export interface Export {
  executionArn: string;
  startDate: number;
  videoId: string;
  uploadType: string;
}
