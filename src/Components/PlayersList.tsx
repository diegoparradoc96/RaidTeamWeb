import { useEffect } from "react";

/* chakra */
import { Image, Text } from "@chakra-ui/react";
/* context */
import { usePlayer } from "../context";
/* components */
import { DecisionAlert } from "./DecisionAlert";
/* services */
import { playerService } from "../data/services";
import type { IPlayer } from "@/types/IPlayer";

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
  const handdleRemovePlayer = async (player: IPlayer) => {
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
      <ul className="">
        {arrPlayers.map((player) => (
          <li
            key={player.name}
            className="flex flex-row items-center justify-between mb-2" // Cambié gap-2 por justify-between
          >
            <div className="flex items-center gap-2">
              {" "}
              {/* Agrupa la imagen y el texto */}
              <Image
                src={player.class.spec.image}
                alt={player.name}
                boxSize="30px"
              />
              <Text textStyle="sm">
                {player.name.length > 10
                  ? player.name.substring(0, 10) + ".."
                  : player.name}
              </Text>
            </div>
            <DecisionAlert
              strDescription={`Are you sure you want to remove ${player.name}?`}
              funExecute={() => handdleRemovePlayer(player)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export { PlayersList };
