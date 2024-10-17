export function getNumberIntervals_test(intervals) {
  // input : [[6, 11], [5, 8], [17, 20], [7, 7], [14,17]]
  // output: { overlap: [[6, 8], [17, 17]], notInclude: [[0, 4], [12, 13]] }

  let arr = {};

  for (let i = 0; i <= 20; i++) {
    arr[i] = 0;
  }

  for (let i = 0; i < intervals.length; i++) {
    for (let n = intervals[i][0]; n <= intervals[i][1]; n++) {
      arr[n]++;
    }
  }

  // console.log(arr);
  let start = 0;
  let end = 0;
  let flag = false;

  let overlap = [];

  for (let key in arr) {
    if (arr[key] >= 2) {
      start = flag ? start : key;
      flag = true;
    } else {
      if (flag) overlap.push([parseInt(start), parseInt(end)]);
      start = key;
      flag = false;
    }

    if (flag) {
      end = key;
    }
  }

  if (flag) {
    overlap.push([parseInt(start), parseInt(end)]);
  }

  // console.log(overlap);

  let notInclude = [];
  start = 0;
  end = 0;
  flag = false;
  for (let key in arr) {
    if (arr[key] === 0) {
      start = flag ? start : key;
      flag = true;
    } else {
      if (flag) notInclude.push([parseInt(start), parseInt(end)]);
      start = key;
      flag = false;
    }

    if (flag) {
      end = key;
    }
  }

  if (flag) {
    notInclude.push([parseInt(start), parseInt(end)]);
  }

  // console.log(notInclude);
  return { overlap: overlap, notInclude: notInclude };
}
