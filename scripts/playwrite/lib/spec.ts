export interface VideoSpec {
  fps: number;
  cssWidth: number;
  cssHeight: number;
  scale: number;
}

export const shorts4k60: VideoSpec = {
  fps: 60,
  cssWidth: 540,
  cssHeight: 960,
  scale: 4,
};

export const frameMs = (spec: VideoSpec): number => 1000 / spec.fps;

export const secondsToFrames = (spec: VideoSpec, seconds: number): number =>
  Math.round(seconds * spec.fps);
