import React, { useEffect } from "react";

/* components */
import { PlayerCreator, PlayersList, Raid } from "../components";
import localforage from "localforage";

const Home: React.FC = () => {
  useEffect(() => {
    console.log("Localforage: ", localforage);
  }, []);
  return (
    <div className="flex flex-row w-full">
      <section className="w-1/6 h-screen border-stone-600 bg-zinc-900 items-center flex flex-col">
        <div className="flex flex-row w-5/6 justify-between">
          <h2 className="flex items-center">Players</h2>
          <PlayerCreator />
        </div>

        <div className="h-2"></div>

        <div className="flex flex-row w-5/6">
          <PlayersList />
        </div>
      </section>
      <section className="flex items-center justify-center w-5/6 h-screen">
        <p>Aqui va la raid</p>
        <Raid />
      </section>
    </div>
  );
};

export { Home };
