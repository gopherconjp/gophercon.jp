export const runMain = (main: () => Promise<void>): void => {
  main().catch((error: unknown) => {
    console.error(`[penpot] ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  });
};
