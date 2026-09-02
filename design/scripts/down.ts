import { runMain } from "./lib/cli.ts";
import { runCompose } from "./lib/docker.ts";

const main = async (): Promise<void> => {
  await runCompose("down");

  console.log("Stopped.");
  console.log(
    "Design data is kept in the docker volumes and in design/snapshot/gopherconjp.penpot.",
  );
};

runMain(main);
