import Image from "next/image";
import { Inter, Orbitron } from "next/font/google";
import React, { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin-ext"] });
const orbitron = Orbitron({ weight: "400", subsets: ["latin"] });

export default function Home() {
  const [input, setInput] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState(0);
  const [operator, setOperator] = useState<string[]>([]);
  const [result, setResult] = useState("");
  const [operation, setOperation] = useState<string[]>([]);

  const buttons = [
    {
      className: "bg-slate-500",
      text: "/",
      id: "divide",
      handleClick: handleClickOperator,
    },
    {
      className: "bg-slate-500",
      text: "x",
      id: "multiply",
      handleClick: handleClickOperator,
    },
    { className: "bg-slate-600", text: "7", id: "seven" },
    { className: "bg-slate-600", text: "8", id: "eight" },
    { className: "bg-slate-600", text: "9", id: "nine" },
    {
      className: "bg-slate-500",
      text: "-",
      id: "subtract",
      handleClick: handleClickOperator,
    },
    { className: "bg-slate-600", text: "4", id: "four" },
    { className: "bg-slate-600", text: "5", id: "five" },
    { className: "bg-slate-600", text: "6", id: "six" },
    {
      className: "bg-slate-500",
      text: "+",
      id: "add",
      handleClick: handleClickOperator,
    },
    { className: "bg-slate-600", text: "1", id: "one" },
    { className: "bg-slate-600", text: "2", id: "two" },
    { className: "bg-slate-600", text: "3", id: "three" },
    {
      className: "row-span-2 bg-sky-900",
      text: "=",
      id: "equals",
      handleClick: handleResult,
    },
    { className: "col-span-2 bg-slate-600", text: "0", id: "zero" },
    {
      className: "bg-slate-600",
      text: ".",
      id: "decimal",
      handleClick: handleClickDecimal,
    },
  ] as {
    className: string;
    text: string;
    id: string;
    handleClick?: () => any;
  }[];

  useEffect(() => {
    console.log(input);
    console.log(operator);
    const newoperation = [];
    for (let i = 0; i < input.length; i++) {
      if (input[i]) newoperation.push(input[i]);
      if (operator[i]) newoperation.push(operator[i]);
    }
    setOperation(newoperation);
  }, [input, operator]);

  useEffect(() => {
    setResult(input[currentInput]);
  }, [input]);

  useEffect(() => {
    setResult(operator[currentInput - 1]);
  }, [operator]);

  const handleAC = () => {
    setInput([]);
    setOperator([]);
    setCurrentInput(0);
    setResult("0");
  };

  const handleClick = (e: React.MouseEvent) => {
    console.log(input[currentInput]);
    const { name } = e.target as HTMLButtonElement;
    if (!input[currentInput]) setInput([...input, name]);
    else if (input[currentInput] === "0")
      setInput([...input.slice(0, -1), name]);
    else setInput([...input.slice(0, -1), input[currentInput] + name]);
  };

  function handleClickOperator(e: React.MouseEvent) {
    const { name } = e.target as HTMLButtonElement;
    console.log(operator[currentInput]);
    if (operator[currentInput] && operator[currentInput] != "-")
      setOperator([...operator.slice(0, -1), name]);
    else {
      setOperator([...operator, name]);
      setCurrentInput(input.length);
    }
  }

  function handleClickDecimal() {
    console.log("decimal");
    if (input[currentInput].includes(".")) return;
    else setInput([...input.slice(0, -1), input[currentInput] + "."]);
  }

  function handleResult() {
    const calInput = input.map((num) => parseFloat(num));
    const calOperator = operator.map((op) => op);
    calOperator.forEach((op, i) => {
      if (op === "x") {
        calInput[i] = calInput[i] * calInput[i + 1];
        calInput.splice(i + 1, 1);
        calOperator.splice(i, 1);
      } else if (op === "/") {
        calInput[i] = calInput[i] / calInput[i + 1];
        calInput.splice(i + 1, 1);
        calOperator.splice(i, 1);
      }
    });
    calOperator.forEach((op, i) => {
      if (op === "+") {
        calInput[i] = calInput[i] + calInput[i + 1];
        calInput.splice(i + 1, 1);
        calOperator.splice(i, 1);
      } else if (op === "-") {
        calInput[i] = calInput[i] - calInput[i + 1];
        calInput.splice(i + 1, 1);
        calOperator.splice(i, 1);
      }
    });
    setResult(calInput[0].toString());
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="grid h-96 grid-cols-4 grid-rows-6 gap-0.5 bg-slate-800 p-1 md:w-72">
        <div className="col-span-4 flex flex-col">
          <div
            className={`${orbitron.className} basis-1/2 text-end text-2xl`}
            id=""
          >
            {operation}
          </div>
          <div
            className={`${orbitron.className} basis-1/2 text-end text-2xl text-green-300`}
            id="display"
          >
            {result || "0"}
          </div>
        </div>
        <button className="col-span-2 bg-red-700" id="clear" onClick={handleAC}>
          AC
        </button>
        {buttons.map((button) => (
          <button
            className={`${button.className}`}
            id={button.id}
            name={button.text}
            key={button.id}
            onClick={button.handleClick || handleClick}
          >
            {button.text}
          </button>
        ))}
      </div>
    </main>
  );
}
