import { walk } from "jsr:@std/fs";
import { relative } from "node:path";
import chalk from "npm:chalk";

export async function tree(dir: string): Promise<string[]> {
  const out = [];
  for await (const entry of walk(dir)) {
    out.push(relative(dir, entry.path));
  }
  return out;
}

if (import.meta.main) {
  const files = await tree(Deno.args[0]);
  console.log(chalk.blue(files.join("\n")));
}
