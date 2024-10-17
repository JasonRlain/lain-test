import { getNumberIntervals_test } from "../../src/lib/getNumberIntervals";

describe("getNumberIntervals_test Function", () => {
  it("case-1", () => {
    const intervals = [
      [6, 11],
      [5, 8],
      [17, 20],
      [7, 7],
      [14, 17],
    ];

    const result = getNumberIntervals_test(intervals);

    const expectedOverlap = [
      [6, 8],
      [17, 17],
    ];
    const expectedNotInclude = [
      [0, 4],
      [12, 13],
    ];

    expect(result.overlap).to.deep.equal(expectedOverlap);

    expect(result.notInclude).to.deep.equal(expectedNotInclude);
  });
  it("case-2", () => {
    const intervals = [
      [1, 10],
      [2, 9],
      [3, 8],
    ];

    const result = getNumberIntervals_test(intervals);

    const expectedOverlap = [[2, 9]];
    const expectedNotInclude = [
      [0, 0],
      [11, 20],
    ];

    expect(result.overlap).to.deep.equal(expectedOverlap);
    expect(result.notInclude).to.deep.equal(expectedNotInclude);
  });

  it("case-3", () => {
    const intervals = [
      [0, 4],
      [10, 14],
      [18, 20],
    ];

    const result = getNumberIntervals_test(intervals);

    const expectedOverlap = [];
    const expectedNotInclude = [
      [5, 9],
      [15, 17],
    ];

    expect(result.overlap).to.deep.equal(expectedOverlap);
    expect(result.notInclude).to.deep.equal(expectedNotInclude);
  });
  it("empty intervals array", () => {
    const intervals = [];

    const result = getNumberIntervals_test(intervals);

    expect(result.overlap).to.deep.equal([]);
    expect(result.notInclude).to.deep.equal([[0, 20]]);
  });
});
