import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { getNumberIntervals_test } from "../lib/getNumberIntervals";

const initOptions = () => {
  const options = [];
  for (let i = 0; i < 21; i++) {
    options.push({
      value: i,
      label: i.toString(),
      disabled: false,
    });
  }
  return options;
};

function AgeGroupSelect({ index, result, setResult }) {
  const [lowerOptions, setLowerOptions] = useState(() => initOptions());
  const [upperOptions, setUpperOptions] = useState(() => initOptions());
  const [error, setError] = useState(false);

  const getAgeGroupAndNumberIntervals = (array) => {
    let getAget = array.map((item) => {
      return item.ageGroup;
    });
    return getNumberIntervals_test(getAget);
  };
  // ■ 已選擇 0 到 20 歲,則起始年齡和結束年齡都可以選擇 0 ~ 20 歲
  // ■ 若先選擇起始年齡,假設 6 歲,則結束年齡只能選擇 6 ~ 20 歲
  // ■ 若先選擇結束年齡,假設 15 歲,則起始年齡只能選擇 0 ~ 15 歲
  // ■ 已選擇 7 到 17 歲,則起始年齡可以選擇 0 ~ 17 歲,結束年齡可以選擇 7 ~ 20 歲

  const onChange = (value) => {
    //lower
    let _optinals = upperOptions;
    for (let i = 0; i <= 20; i++) {
      if (i < value) {
        _optinals[i].disabled = true;
      } else {
        _optinals[i].disabled = false;
      }
    }
    if (result) {
      let maps = result.map((item, id) => {
        if (index === id) {
          return { ...item, ageGroup: [value, item.ageGroup[1]] };
        } else {
          return { ...item };
        }
      });
      setResult(maps);
    }
    setUpperOptions(_optinals);
  };

  const onChange2 = (value) => {
    //upper
    let _optinals = lowerOptions;
    for (let i = 0; i <= 20; i++) {
      if (i > value) {
        _optinals[i].disabled = true;
      } else {
        _optinals[i].disabled = false;
      }
    }
    if (result) {
      let maps = result.map((item, id) => {
        if (index === id) {
          return { ...item, ageGroup: [item.ageGroup[0], value] };
        } else {
          return { ...item };
        }
      });
      setResult(maps);
    }
    setLowerOptions(_optinals);
  };
  useEffect(() => {
    if (result) {
      const numberIntervals = getAgeGroupAndNumberIntervals(result);
      let flag = false;
      for (let i = 0; i < numberIntervals.overlap.length; i++) {
        for (
          let j = result[index].ageGroup[0];
          j <= result[index].ageGroup[1];
          j++
        ) {
          if (
            j >= numberIntervals.overlap[i][0] &&
            j <= numberIntervals.overlap[i][1]
          ) {
            flag = true;
            break;
          }
        }
        if (flag) {
          break;
        }
      }
      setError(flag);
    }
  }, [result, index]);

  return (
    <div>
      <div style={{ textAlign: "left", color: "gray", marginBottom: "5px" }}>
        <span>年齡</span>
      </div>
      <div style={{ display: "flex" }}>
        <Select
          defaultValue={0}
          value={result && result[index].ageGroup[0]}
          style={{ width: 120 }}
          options={lowerOptions}
          onChange={onChange}
          status={error ? "error" : ""}
        />
        <div style={{ width: 30 }}>~</div>
        <Select
          defaultValue={20}
          value={result && result[index].ageGroup[1]}
          style={{ width: 120 }}
          options={upperOptions}
          onChange={onChange2}
          status={error ? "error" : ""}
        />
      </div>
      {error && (
        <div
          style={{
            textAlign: "left",
            color: "red",
            background: "#FFDEDE",
            borderRadius: "5px",
            padding: ".3rem",
          }}
        >
          <span>年齡區間不可重疊</span>
        </div>
      )}
    </div>
  );
}

export default AgeGroupSelect;
