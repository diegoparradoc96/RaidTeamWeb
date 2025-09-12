import { useEffect, useState, useRef } from "react";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

/* chakra */
import { Image, Text } from "@chakra-ui/react";
/* context */
import { usePlayer } from "../context";
/* components */
import { DecisionAlert } from "./DecisionAlert";
/* services */
import { playerService } from "../data/services";
import type { IPlayer } from "@/types/IPlayer";

// Componente para cada jugador individual
const PlayerItem = ({
  player,
  onRemove,
}: {
  player: IPlayer;
  onRemove: (player: IPlayer) => void;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  const [dragging, setDragging] = useState<boolean>(false);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      const cleanup = draggable({
        element: element,
        getInitialData: () => ({ player }), // Opcional: datos del jugador para el drag
        onDragStart: () => {
          console.log(`Dragging player: ${player.name}`);
          setDragging(true);
        },
        onDrop: () => {
          console.log(`Dropped player: ${player.name}`);
          setDragging(false);
        },
      });

      return cleanup; // Limpia el event listener cuando se desmonte
    }
  }, [player]);

  return (
    <li
      ref={ref}
      className={`flex flex-row items-center justify-between mb-2 cursor-move ${
        dragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-center gap-2">
        <Image src={player.class.spec.image} alt={player.name} boxSize="30px" />
        <Text textStyle="sm">
          {player.name.length > 10
            ? player.name.substring(0, 10) + ".."
            : player.name}
        </Text>
      </div>
      <DecisionAlert
        strDescription={`Are you sure you want to remove ${player.name}?`}
        funExecute={() => onRemove(player)}
      />
    </li>
  );
};

const PlayersList = () => {
  const { arrPlayers, removePlayer, addPlayers } = usePlayer();

  useEffect(() => {
    getPlayers();
  }, []);

  const getPlayers = async () => {
    try {
      const players = await playerService.getPlayers();
      console.log("Fetched player:", players);
      addPlayers(players);
    } catch (error) {
      console.error("Error fetching player:", error);
    }
  };

  const handleRemovePlayer = async (player: IPlayer) => {
    try {
      const success = await playerService.removePlayer(player.name);
      if (success) {
        removePlayer(player);
      }
    } catch (error) {
      console.error("Error removing player:", error);
    }
  };

  return (
    <div className="w-full">
      <ul>
        {arrPlayers.map((player) => (
          <PlayerItem
            key={player.name}
            player={player}
            onRemove={handleRemovePlayer}
          />
        ))}
      </ul>
    </div>
  );
};

export { PlayersList };
