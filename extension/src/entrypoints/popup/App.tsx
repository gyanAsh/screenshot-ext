import { useState } from "react";
import reactLogo from "@/assets/react.svg";
import wxtLogo from "/wxt.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <section className="grid gap-5 w-45">
      <div className="flex gap-2.5 w-full items-center justify-center">
        <a href="https://wxt.dev" target="_blank">
          <img src={wxtLogo} className="size-12" alt="WXT logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="size-12" alt="React logo" />
        </a>
      </div>

      <button
        className="bg-white text-black p-1.5 text-base font-semibold 
      hover:scale-105 active:scale-[0.98] cursor-pointer duration-75 ease-in-out
      rounded-lg"
      >
        Click to login
      </button>
      <h1>User has not logged in</h1>
    </section>
  );
}

export default App;
