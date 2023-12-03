import * as fs from "node:fs";
import * as url from "node:url";
import * as p from "node:path";

let __dirname = url.fileURLToPath(new URL(".", import.meta.url));
let input = fs.readFileSync(p.resolve(__dirname, "input.txt"), "utf-8");

let matchDigits = (digits: string) => (s: string) =>
  s.split("").flatMap((char) => (digits.includes(char) ? [char] : []));

let concat =
  <T extends string>(first: T) =>
  (second: T) =>
    `${first}${second}`;

let toInt = (s: string) => Number.parseInt(s, 10);

let getFirstAndLast = <T>(a: ReadonlyArray<T>) => [a.at(0)!, a.at(-1)!];

let sumArr = (a: ReadonlyArray<number>) =>
  a.reduce((acc, curr) => acc + curr, 0);

let main = (lines: ReadonlyArray<string>, digits: string) => {
  let matchDigitsForLine = matchDigits(digits);
  return lines
    .map((line) => matchDigitsForLine(line))
    .filter((ln) => Array.isArray(ln) && ln.length > 0)
    .map((matches) => {
      let [first, last] = getFirstAndLast(matches);
      let combined = concat(first)(last);
      return toInt(combined);
    })
    .reduce((acc, curr) => acc + curr, 0);
};

let digits = "0123456789";
let lines = input.split("\n");
let answer = main(lines, digits);

console.table({ answer });

{
  // Part 2
  let digitWords = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ] as const;
  let toDigitWordLookup = (dw: typeof digitWords) => {
    let r = {} as Record<(typeof dw)[number], string>;
    for (let index = 0; index < dw.length; index++) {
      let el = dw[index];
      r[el] = index.toString();
    }
    return r;
  };
  let digitWordLookup = toDigitWordLookup(digitWords);

  let matchNumbers = (lookup: typeof digitWordLookup) => (s: string) => {
    let reStr = `${Object.values(lookup).join("|")}|${Object.keys(lookup).join(
      "|",
    )}`;
    let re = new RegExp(reStr, "g");

    return s.matchAll(re);
  };

  let unwrapFromMatch = (r: RegExpMatchArray) => r.at(0)!;

  let main = (lines: ReadonlyArray<string>, lookup: typeof digitWordLookup) => {
    return sumArr(
      lines
        .map((line) => [...matchNumbers(lookup)(line)])
        .filter((ln) => Array.isArray(ln) && ln.length > 0)
        .map((ns) => {
          let [first, last] = getFirstAndLast(ns)
            .map((m) => unwrapFromMatch(m))
            .map((digitOrWord) => {
              if (digitOrWord in lookup) {
                return lookup[digitOrWord as keyof typeof lookup];
              }
              return digitOrWord;
            });
          let combined = concat(first)(last);

          return toInt(combined);
        }),
    );
  };

  let part2Answer = main(lines, digitWordLookup);

  console.table({ part2Answer });
}
