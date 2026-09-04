import { paths } from "./config.ts";
import { type Penpot } from "./penpot.ts";

const FONTS: { file: string; family: string; weight: number; style: "normal" | "italic" }[] = [
  { file: "BIZTER-Bold.ttf", family: "BIZTER", weight: 700, style: "normal" },
  { file: "BIZTER-Regular.ttf", family: "BIZTER", weight: 400, style: "normal" },
  { file: "Cica-Bold.ttf", family: "Cica", weight: 700, style: "normal" },
  { file: "Cica-Regular.ttf", family: "Cica", weight: 400, style: "normal" },
];

// oxlint-disable no-await-in-loop -- fonts upload sequentially on purpose

export const uploadFonts = async (penpot: Penpot, teamId: string): Promise<void> => {
  const existing = await penpot.getFontVariants(teamId);
  for (const { file, family, weight, style } of FONTS) {
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
      fontId: crypto.randomUUID(),
      family,
      weight,
      style,
      uploads: { "font/ttf": sessionId },
    });

    console.log(`  uploaded ${file} (${family} ${weight})`);
  }
};
