import * as fs from "node:fs"
import * as url from "node:url"
import * as p from "node:path"

let __dirname = url.fileURLToPath(new URL(".", import.meta.url))
let input = fs.readFileSync(p.resolve(__dirname, "input.txt"), "utf-8")

let matchDigits = (digits: string) => (s: string) =>
  s.split("").flatMap((char) => (digits.includes(char) ? [char] : []))

let concat =
  <T extends string>(first: T) =>
  (second: T) =>
    `${first}${second}`

let toInt = (s: string) => Number.parseInt(s, 10)

let getFirstAndLast = <T>(a: ReadonlyArray<T>) => [a.at(0)!, a.at(-1)!]

let main = (lines: ReadonlyArray<string>, digits: string) => {
  let matchDigitsForLine = matchDigits(digits)
  return lines
    .map((line) => matchDigitsForLine(line))
    .filter((ln) => Array.isArray(ln) && ln.length > 0)
    .map((matches) => {
      let [first, last] = getFirstAndLast(matches)
      let combined = concat(first)(last)
      return toInt(combined)
    })
    .reduce((acc, curr) => acc + curr, 0)
}

let digits = "0123456789"
let lines = input.split("\n")
let answer = main(lines, digits)

console.table({ answer })
