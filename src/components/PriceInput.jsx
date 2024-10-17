import React, { useState } from "react";
import { InputNumber } from "antd";
import { addComma } from "../lib/addComma";

function PriceInput({ index, result, setResult }) {
  const [error, setError] = useState(false);

  const handleChange = (value) => {
    if (value === null) {
      setError(true);
    } else {
      setError(false);
    }

    if (result) {
      let maps = result.map((item, id) => {
        if (index === id) {
          return { ...item, price: value };
        } else {
          return { ...item };
        }
      });
      setResult(maps);
    }
  };

  return (
    <div>
      <div style={{ textAlign: "left", color: "gray", marginBottom: "5px" }}>
        <span>入住費用 (每人每晚)</span>
      </div>

      <InputNumber
        prefix="TW"
        status={error ? "error" : ""}
        defaultValue={0}
        value={result && result[index].price}
        formatter={(value) => addComma(value)}
        onChange={handleChange}
        style={{
          width: "100%",
        }}
      />
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
          <span>不可為空白</span>
        </div>
      )}
      <div style={{ textAlign: "right", color: "gray", marginTop: "4px" }}>
        <span>輸入0表示免費</span>
      </div>
    </div>
  );
}

export default PriceInput;
