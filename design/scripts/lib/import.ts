import { existsSync } from "node:fs";

import { cfg, snapshotPath } from "./config.ts";
import { type Penpot, type Project } from "./penpot.ts";

interface EnsureResult {
  projectId: string;
  fileId: string;
  action: "exists" | "imported" | "created";
}

export const ensureProject = async (penpot: Penpot): Promise<Project> => {
  const projects = await penpot.getAllProjects();
  const found = projects.find((p) => p.name === cfg.project);
  if (found) {
    return found;
  }

  const teams = await penpot.getTeams();
  const team = teams.find((t) => t.isDefault) ?? teams[0];
  if (!team) {
    throw new Error("no team available for the profile");
  }

  return penpot.createProject(team.id, cfg.project);
};

// Ensure the project + design file exist for `file`, restoring its snapshot when the file is missing.
export const ensureDesign = async (penpot: Penpot, file: string): Promise<EnsureResult> => {
  const found = await penpot.findDesign(cfg.project, file);
  if (found?.file) {
    return { projectId: found.project.id, fileId: found.file.id, action: "exists" };
  }

  const project = await ensureProject(penpot);
  const snapshot = snapshotPath(file);

  if (existsSync(snapshot)) {
    const fileId = await penpot.importFile(project.id, file, Bun.file(snapshot));
    return { projectId: project.id, fileId, action: "imported" };
  }

  const created = await penpot.createFile(project.id, file);
  return { projectId: project.id, fileId: created.id, action: "created" };
};
