import React, {createContext, useContext, useState} from 'react';
import type {ReactNode} from "react";

/* types */
import type {IPlayer} from "../types";

interface IPlayerContext {
  player: IPlayer;
  addPlayer: (player: IPlayer) => void;
  clearPlayer: () => void;
}

const PlayerContext = createContext<IPlayerContext | undefined>(undefined);

const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [player, setPlayer] = useState<IPlayer>({ name: "", class: {    
    name: "",
    spec: {
      name: "",
      image: ""
    }
  } });

  const addPlayer = (newPlayer: IPlayer) => {
    setPlayer(newPlayer);
  }

  const clearPlayer = () => {
    setPlayer({ name: "", class: { name: "", spec: { name: "", image: "" } } });
  };

  return (
    <PlayerContext.Provider value={{ player, addPlayer, clearPlayer }}>
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
