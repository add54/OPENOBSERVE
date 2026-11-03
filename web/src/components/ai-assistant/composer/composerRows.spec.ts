// Copyright 2026 OpenObserve Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import { describe, expect, it } from "vitest";

import {
  ONE_ROW_TEXT_PX,
  composerFitsOneRow,
  composerPopoverClass,
  type ComposerRowInput,
} from "./composerUi";

const ROW: ComposerRowInput = {
  narrow: false,
  extras: false,
  frameWidth: 600,
  controlsWidth: 216,
};

describe("composerFitsOneRow", () => {
  it("holds one row while the frame leaves the text its room beside the controls", () => {
    expect(composerFitsOneRow(ROW)).toBe(true);
    expect(composerFitsOneRow({ ...ROW, frameWidth: 216 + 28 + ONE_ROW_TEXT_PX })).toBe(true);
  });

  it("moves the text above the controls in a frame too narrow for that room (F2)", () => {
    expect(composerFitsOneRow({ ...ROW, frameWidth: 216 + 28 + ONE_ROW_TEXT_PX - 1 })).toBe(false);
    expect(composerFitsOneRow({ ...ROW, frameWidth: 406 })).toBe(false);
  });

  it("always takes two rows when narrow or with extras", () => {
    expect(composerFitsOneRow({ ...ROW, narrow: true })).toBe(false);
    expect(composerFitsOneRow({ ...ROW, extras: true })).toBe(false);
  });

  it("stays on one row until the frame has been measured", () => {
    expect(composerFitsOneRow({ ...ROW, frameWidth: 0 })).toBe(true);
  });
});

describe("composerPopoverClass", () => {
  it("takes 3 px a side off a 20 rem window", () => {
    expect(composerPopoverClass(true)).toContain("calc(20rem-0.375rem)");
    expect(composerPopoverClass(false)).toContain("min(20rem");
  });
});
