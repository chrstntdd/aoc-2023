import { test, expect } from "vitest"

import {
  getCards,
  getPointsForMatches,
  matchWinningNumbers,
  removeCard,
  splitOnBar
} from "./mod.ts"

test("splitOnBar", () => {
  expect(splitOnBar("12 | 32")).toEqual(["12 ", " 32"])
})
test("removeCard", () => {
  expect(
    removeCard("Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53")
  ).toEqual("41 48 83 86 17 | 83 86  6 31 17  9 48 53")
})
test("getCards", () => {
  expect(
    getCards(removeCard("Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53"))
  ).toEqual({
    own: [83, 86, 6, 31, 17, 9, 48, 53],
    winning: [41, 48, 83, 86, 17]
  })
})
test("matchWinningNumbers", () => {
  expect(
    matchWinningNumbers({
      own: [83, 86, 6, 31, 17, 9, 48, 53],
      winning: [41, 48, 83, 86, 17]
    })
  ).toEqual([83, 86, 17, 48])
})
test("getPointForMatches", () => {
  expect(
    getPointsForMatches(
      matchWinningNumbers({
        own: [83, 86, 6, 31, 17, 9, 48, 53],
        winning: [41, 48, 83, 86, 17]
      })
    )
  ).toEqual(8)
})
