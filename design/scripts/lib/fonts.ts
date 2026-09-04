import { paths } from "./config.ts";
import { type Penpot } from "./penpot.ts";

const FONTS: {
  file: string;
  family: string;
  fontId: string;
  weight: number;
  style: "normal" | "italic";
}[] = [
  {
    file: "BIZTER-Bold.ttf",
    family: "BIZTER",
    fontId: "d8be7013-916c-48aa-9bf9-ebde154d3033",
    weight: 700,
    style: "normal",
  },
  {
    file: "BIZTER-Regular.ttf",
    family: "BIZTER",
    fontId: "d8be7013-916c-48aa-9bf9-ebde154d3033",
    weight: 400,
    style: "normal",
  },
  {
    file: "Cica-Bold.ttf",
    family: "Cica",
    fontId: "07d794ec-33dc-41f8-be46-77d7bb370d1f",
    weight: 700,
    style: "normal",
  },
  {
    file: "Cica-Regular.ttf",
    family: "Cica",
    fontId: "07d794ec-33dc-41f8-be46-77d7bb370d1f",
    weight: 400,
    style: "normal",
  },
];

// oxlint-disable no-await-in-loop -- fonts upload sequentially on purpose

export const uploadFonts = async (penpot: Penpot, teamId: string): Promise<void> => {
  const existing = await penpot.getFontVariants(teamId);

  for (const { file, family, fontId, weight, style } of FONTS) {
    const registered = existing.some(
      (v) => v.fontFamily === family && v.fontWeight === weight && v.fontStyle === style,
    );
    if (registered) {
      console.log(`  ${file} already registered (${family} ${weight})`);
      continue;
    }

    const sessionId = await penpot.createUploadSession(1);
    await penpot.uploadChunk(sessionId, 0, Bun.file(`${paths.fonts}/${file}`));
    await penpot.createFontVariant({
      teamId,
      fontId,
      family,
      weight,
      style,
      uploads: { "font/ttf": sessionId },
    });

    console.log(`  uploaded ${file} (${family} ${weight})`);
  }
};
