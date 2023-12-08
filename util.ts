import * as fs from "node:fs"
import * as url from "node:url"
import * as p from "node:path"

let __dirname = url.fileURLToPath(new URL(".", import.meta.url))

export let readPuzzleInput = (name: string) =>
  fs.readFileSync(p.resolve(__dirname, name), "utf-8")

export let splitByNewline = (lines: string) =>
  lines.split("\n") as ReadonlyArray<string>
