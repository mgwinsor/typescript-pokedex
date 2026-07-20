import { State } from "./state.js";

export function commandExit(state: State, ...args: string[]) {
  console.log("Closing the Pokedex... Goodbye!");
  state.readline.close();
  process.exit(0);
}
