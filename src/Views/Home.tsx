import React, { useState } from "react";

const Home: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <button
      onClick={() => setCount(count + 1)}
      className="w-32"
    >
      {count}
    </button>
  );
};

export { Home };
