/* chakra */
import { Image, Text } from "@chakra-ui/react";
/* context */
import { usePlayer } from "../context";
/* components */
import { DecisionAlert } from "./DecisionAlert";

const PlayersList = () => {
  const { arrPlayers, removePlayer } = usePlayer();

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
              funExecute={() => removePlayer(player)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export { PlayersList };
