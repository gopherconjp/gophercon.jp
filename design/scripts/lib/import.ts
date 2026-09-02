import { existsSync } from "node:fs";

import { cfg, paths } from "./config.ts";
import { type Penpot } from "./penpot.ts";

interface EnsureResult {
  projectId: string;
  fileId: string;
  action: "exists" | "imported" | "created";
}

// Ensure the gophercon.jp project + design file exist, restoring the git
// snapshot when the file is missing.
export const ensureDesign = async (penpot: Penpot): Promise<EnsureResult> => {
  const found = await penpot.findDesign(cfg.project, cfg.file);
  if (found?.file) {
    return { projectId: found.project.id, fileId: found.file.id, action: "exists" };
  }

  let project = found?.project;
  if (!project) {
    const teams = await penpot.getTeams();
    const team = teams.find((t) => t.isDefault) ?? teams[0];
    if (!team) {
      throw new Error("no team available for the profile");
    }

    project = await penpot.createProject(team.id, cfg.project);
  }

  if (existsSync(paths.snapshot)) {
    const fileId = await penpot.importFile(project.id, cfg.file, Bun.file(paths.snapshot));
    return { projectId: project.id, fileId, action: "imported" };
  }

  const file = await penpot.createFile(project.id, cfg.file);
  return { projectId: project.id, fileId: file.id, action: "created" };
};
