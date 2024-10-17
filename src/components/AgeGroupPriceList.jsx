import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import PriceInput from "./PriceInput";
import AgeGroupSelect from "./AgeGroupSelect";

import { getNumberIntervals_test } from "../lib/getNumberIntervals";

function AgeGroupPriceList({ onChange }) {
  const [result, setResult] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const addComponent = () => {
    setResult([...result, { ageGroup: [0, 20], price: 0 }]);
  };
  const removeItem = (index) => {
    let temp = result.filter((item, resultIndex) => resultIndex !== index);
    setResult(temp);
  };
  const validate = () => {
    if (result.length === 0) return;
    let stack = [];
    for (let i = 0; i < result.length; i++) {
      stack.push(result[i].ageGroup);
    }

    const numberIntervals = getNumberIntervals_test(stack);
    if (numberIntervals.notInclude.length === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  useEffect(() => {
    if (onChange) {
      onChange(result);
      validate();
    }
  }, [result, onChange]);

  return (
    <div>
      {result.length > 0 &&
        result.map((item, index) => (
          <div key={index}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>價格設定 - {index + 1}</h4>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: ".3rem",
                  color: "red",
                  cursor: "pointer",
                }}
                onClick={() => removeItem(index)}
              >
                <CloseOutlined />
                <p>移除</p>
              </div>
              {/* <button onClick={() => removeItem(index)}>x</button> */}
            </div>
            <div style={{ display: "flex", gap: "2rem" }}>
              <AgeGroupSelect
                index={index}
                result={result}
                setResult={setResult}
              />
              <PriceInput index={index} result={result} setResult={setResult} />
            </div>
          </div>
        ))}

      <div
        style={{
          textAlign: "left",
          marginTop: "3rem",
        }}
      >
        <Button onClick={addComponent} disabled={disabled}>
          +新增價格設定
        </Button>
      </div>
    </div>
  );
}

export default AgeGroupPriceList;
