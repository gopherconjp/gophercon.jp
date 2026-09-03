import { ask, runMain } from "./lib/cli.ts";
import { runCompose } from "./lib/docker.ts";

const main = async (): Promise<void> => {
  const answer = (
    await ask("All Penpot data will be deleted (docker volumes, DB wiped). Continue? [y/N] ")
  )
    .trim()
    .toLowerCase();
  if (answer !== "y" && answer !== "yes") {
    console.log("Aborted.");
    return;
  }

  await runCompose("down", "-v");

  console.log("");
  console.log("All Penpot data wiped. Run `bun run penpot` to start fresh from the snapshot.");
};

runMain(main);
