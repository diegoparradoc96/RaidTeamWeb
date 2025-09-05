import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

/* types */
import type { IPlayer } from "../types";

interface IPlayerContext {
  player: IPlayer;
  arrPlayers: IPlayer[];
  selectPlayer: (player: IPlayer) => void;
  addPlayer: (player: IPlayer) => void;
  addPlayers: (players: IPlayer[]) => void;
  removePlayer: (player: IPlayer) => void;
  clearPlayer: () => void;
}

const PlayerContext = createContext<IPlayerContext | undefined>(undefined);

const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [player, setPlayer] = useState<IPlayer>({
    name: "",
    class: {
      name: "",
      spec: {
        name: "",
        image: "",
      },
    },
  });
  const [arrPlayers, setArrPlayers] = useState<IPlayer[]>([]);

  const selectPlayer = (newPlayer: IPlayer) => {
    setPlayer(newPlayer);
  };

  const addPlayer = (newPlayer: IPlayer) => {
    setArrPlayers((prev) => [...prev, newPlayer]);
  };

  const addPlayers = (newPlayers: IPlayer[]) => {
    setArrPlayers((prev) => [...prev, ...newPlayers]);
  };

  /* debo remover por id no por nombre */
  const removePlayer = (player: IPlayer) => {
    setArrPlayers((prev) => prev.filter((p) => p.name !== player.name));
  };

  const clearPlayer = () => {
    setPlayer({ name: "", class: { name: "", spec: { name: "", image: "" } } });
  };

  return (
    <PlayerContext.Provider
      value={{
        player,
        selectPlayer,
        arrPlayers,
        addPlayer,
        addPlayers,
        removePlayer,
        clearPlayer,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};

export { PlayerProvider, usePlayer };
