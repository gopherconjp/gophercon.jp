import path from "node:path";

import type { VideoSpec } from "./spec.ts";

export interface OperationPaths {
  framesDir: string;
  out: string;
}

export const resolveOperationDirs = (operation: string, spec: VideoSpec): OperationPaths => {
  const root = path.resolve(import.meta.dir, "../../..");
  const tag = `${spec.cssWidth * spec.scale}x${spec.cssHeight * spec.scale}-${spec.fps}fps`;

  return {
    framesDir: path.join(root, "dist", "playwrite", operation, "frames"),
    out: path.join(root, "dist", "playwrite", operation, `${operation}-${tag}.mp4`),
  };
};

export const encodeFrames = async (
  framesDir: string,
  out: string,
  spec: VideoSpec,
): Promise<void> => {
  const count = await countFrames(framesDir);
  if (count === 0) {
    throw new Error(`No frames in ${framesDir}`);
  }

  const proc = Bun.spawn(
    [
      "ffmpeg",
      "-y",
      "-framerate",
      String(spec.fps),
      "-i",
      path.join(framesDir, "%04d.png"),
      "-c:v",
      "h264_videotoolbox",
      "-b:v",
      "80M",
      "-pix_fmt",
      "yuv420p",
      "-movflags",
      "+faststart",
      "-r",
      String(spec.fps),
      out,
    ],
    { stdout: "inherit", stderr: "inherit" },
  );
  const code = await proc.exited;
  if (code !== 0) {
    throw new Error(`ffmpeg exited with ${code}`);
  }

  console.log(`Wrote ${out} (${count} frames)`);
};

const countFrames = async (framesDir: string): Promise<number> => {
  const glob = new Bun.Glob("*.png");

  let count = 0;
  for await (const _ of glob.scan(framesDir)) {
    count += 1;
  }

  return count;
};
