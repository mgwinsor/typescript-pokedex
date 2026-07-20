import { getCommands } from "./commands.js";

import type { State } from "./state.js";

export function startREPL(state: State) {
  state.readline.prompt();

  state.readline.on("line", async (input) => {
    const words = cleanInput(input);
    if (words.length === 0) {
      state.readline.prompt();
      return;
    }

    const commandName = words[0];
    const commandArgs = words.splice(1);

    const commands = getCommands();
    const cmd = commands[commandName];
    if (!cmd) {
      console.log(
        `Unknown command: "${commandName}". Type "help" for a list of commands.`,
      );
      state.readline.prompt();
      return;
    }

    try {
      cmd.callback(state, ...commandArgs);
    } catch (e) {
      console.log((e as Error).message);
    }

    state.readline.prompt();
  });
}

export function cleanInput(input: string): string[] {
  return input
    .toLocaleLowerCase()
    .trim()
    .split(" ")
    .filter((word) => word !== "");
}
