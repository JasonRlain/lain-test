import "./App.css";
import { addComma } from "./lib/addComma";
import { getNumberIntervals_test } from "./lib/getNumberIntervals";

import PriceInput from "./components/PriceInput";
import AgeGroupSelect from "./components/AgeGroupSelect";
import AgeGroupPriceList from "./components/AgeGroupPriceList";

function App() {
  const styled = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
  const { overlap, notInclude } = getNumberIntervals_test([
    [6, 11],
    [5, 8],
    [17, 20],
    [7, 7],
    [14, 17],
  ]);
  return (
    <div className="App">
      <section style={styled}>
        <h2>請根據如下條件實作使用正規表達式將數字加上千分位的 function</h2>
        <div>{addComma(-7855948.9527)}</div>
      </section>
      <section style={styled}>
        <h2>
          請根據如下條件實作找出數字 0 到 20 間重疊與未包含的數字區間 function
        </h2>
        <h4>overlap</h4>
        <div style={{ display: "flex", gap: "5px" }}>
          {overlap.map((item, index) => (
            <div key={index}>
              [{item[0]}, {item[1]}]
            </div>
          ))}
        </div>
        <h4>notInclude</h4>
        <div style={{ display: "flex", gap: "5px" }}>
          {notInclude.map((item, index) => (
            <div key={index}>
              [{item[0]}, {item[1]}]
            </div>
          ))}
        </div>
      </section>
      <section style={styled}>
        <h2>實作 PriceInput 元件</h2>
        <PriceInput />
      </section>
      <section style={styled}>
        <h2>實作 AgeGroupSelect 元件</h2>
        <AgeGroupSelect />
      </section>
      <section style={styled}>
        <h2>使用前四題的 Function 和 Component,實作 AgeGroupPriceList UI</h2>
        <AgeGroupPriceList onChange={(result) => console.log(result)} />
      </section>
    </div>
  );
}

export default App;
