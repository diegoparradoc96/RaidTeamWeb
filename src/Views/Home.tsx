import React, { useState } from "react";

/* components */
import { IconButton } from "../Components";

const Home: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div className="flex flex-row w-full">
      <section className="w-1/6 h-screen p-2 border-stone-600 border-r-1">
        <div className="flex flex-row justify-between ">
          <h2 className="flex items-center">Players</h2>
          <IconButton onClick={() => {console.log("IconButton clicked")}} />
        </div>
      </section>
      <section className="">
        <button onClick={() => setCount(count + 1)} className="w-32">
          {count}
        </button>
      </section>
    </div>
  );
};

export { Home };
