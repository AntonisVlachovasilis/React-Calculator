import "./App.css";
import { useState } from "react";

function Calculator() {
  const elements = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "+",
    "-",
    "*",
    "/",
    "=",
    ".",
    "(",
    ")",
    "AC",
  ];
  const [num, setNum] = useState("0");
  return (
    <div className="App">
      <div className="title">
        <h1>My React Calculator</h1>
      </div>
      <div className="panel">
        <div className="calculator-container">
          <div className="screen">{num}</div>
          <div className="button-container-wrapper">
            {elements.map((elem) => {
              return <CalcButtons digit={elem} num={num} setNum={setNum} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const CalcButtons = (props) => {
  return (
    <button
      className="digit-container"
      onClick={(e) => {
        if (props.digit !== "AC" && props.digit !== "=") {
          if (props.num === "0" && props.digit > 0 && props.digit !== ".") {
            props.setNum(e.target.value);
          } else if (props.digit === "0" && props.num === "0") {
            props.setNum("0");
          } else if (
            props.digit === "(" ||
            (props.digit === ")" && props.num === "0")
          ) {
            props.setNum(props.digit);
          } else {
            props.setNum(props.num + e.target.value);
          }
        } else if (props.digit === "AC") {
          props.setNum("0");
        } else {
          // props.setNum(eval(props.num));
          const logExp = props.num.split("");
          if (!logExp.includes("(")) {
            if (!logExp.includes("*") && !logExp.includes("/")) {
              props.setNum(eval(props.num));
            } else if (logExp.includes("*")) {
              const newLogExp = logExp.splice(
                logExp.indexOf("*") - 1,
                3,
                eval(
                  logExp
                    .slice(logExp.indexOf("*") - 1, logExp.indexOf("*") + 2)
                    .join("")
                ).toString()
              );
              props.SetNum(eval(newLogExp.join("")));
            }
          }
        }
      }}
      value={props.digit}
    >
      {props.digit}
    </button>
  );
};

export default Calculator;
