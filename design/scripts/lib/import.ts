import { existsSync } from "node:fs";

import { cfg, paths } from "./config.ts";
import { type Penpot } from "./penpot.ts";

const importSnapshot = async (penpot: Penpot, projectId: string): Promise<string> =>
  penpot.importFile(projectId, cfg.file, Bun.file(paths.snapshot));

interface EnsureResult {
  projectId: string;
  fileId: string;
  action: "exists" | "imported" | "created";
}

// Ensure the gophercon.jp project + design file exist, restoring the git
// snapshot when the file is missing.
export const ensureDesign = async (penpot: Penpot): Promise<EnsureResult> => {
  const projects = await penpot.getAllProjects();
  let project = projects.find((p) => p.name === cfg.project);
  if (!project) {
    const teams = await penpot.getTeams();
    const team = teams.find((t) => t.isDefault) ?? teams[0];
    if (!team) {
      throw new Error("no team available for the profile");
    }

    project = await penpot.createProject(team.id, cfg.project);
  }

  const files = await penpot.getProjectFiles(project.id);
  const existing = files.find((f) => f.name === cfg.file);
  if (existing) {
    return { projectId: project.id, fileId: existing.id, action: "exists" };
  }

  if (existsSync(paths.snapshot)) {
    const fileId = await importSnapshot(penpot, project.id);
    return { projectId: project.id, fileId, action: "imported" };
  }

  const file = await penpot.createFile(project.id, cfg.file);
  return { projectId: project.id, fileId: file.id, action: "created" };
};
