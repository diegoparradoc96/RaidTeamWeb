import { useEffect, useState, useRef } from "react";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

/* chakra */
import { Image, Text } from "@chakra-ui/react";
/* context */
import { usePlayer } from "../context";
/* components */
import { DecisionAlert } from "../components";
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
        <Image 
          src={player.class.spec.image} 
          alt={player.name} 
          boxSize="30px"
          style={{ pointerEvents: 'none' }}
          draggable={false}
        />
        <Text textStyle="sm">
          {player.name.length > 10
            ? player.name.substring(0, 10) + ".."
            : player.name}
        </Text>
      </div>
      <DecisionAlert
        strDescription={`Are you sure you want to remove ${player.name}?`}
        funExecute={() => onRemove(player)}
        iconSize="sm"
      />
    </li>
  );
};

const classOrder = [
  "Warrior",
  "Paladin",
  "Hunter",
  "Rogue",
  "Priest",
  "Shaman",
  "Mage",
  "Warlock",
  "Druid",
];

const specOrder: { [key: string]: string[] } = {
  Warrior: ["Arms", "fury", "Prot"],
  Paladin: ["Holy", "Protection", "Retribution"],
  Hunter: ["Beast Mastery", "Marksmanship", "Survival"],
  Rogue: ["Assassination", "Outlaw", "Subtlety"],
  Priest: ["Discipline", "Holy", "Shadow"],
  Shaman: ["Elemental", "Enhancement", "Restoration"],
  Mage: ["Arcane", "Fire", "Frost"],
  Warlock: ["Affliction", "Demonology", "Destruction"],
  Druid: ["Balance", "Feral", "Restoration"],
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

  const sortPlayers = (players: IPlayer[]) => {
    return players.sort((a, b) => {
      // Primero ordenar por clase
      const classIndexA = classOrder.indexOf(a.class.name);
      const classIndexB = classOrder.indexOf(b.class.name);
      if (classIndexA !== classIndexB) return classIndexA - classIndexB;

      // Luego ordenar por especialización dentro de la misma clase
      const specOrderForClass = specOrder[a.class.name] || [];
      const specIndexA = specOrderForClass.indexOf(a.class.spec.name);
      const specIndexB = specOrderForClass.indexOf(b.class.spec.name);
      if (specIndexA !== specIndexB) return specIndexA - specIndexB;

      // Finalmente ordenar por nombre si todo lo demás es igual
      return a.name.localeCompare(b.name);
    });
  };

  const groupPlayersByClass = (players: IPlayer[]) => {
    const grouped = new Map<string, IPlayer[]>();
    
    classOrder.forEach(className => {
      const classPlayers = players.filter(p => p.class.name === className);
      if (classPlayers.length > 0) {
        grouped.set(className, sortPlayers(classPlayers));
      }
    });
    
    return grouped;
  };

  const groupedPlayers = groupPlayersByClass(arrPlayers);

  return (
    <div className="w-full">
      <div style={{ 
        maxHeight: "600px", 
        overflowY: "auto", 
        scrollbarWidth: "thin",
        paddingRight: "10px"
      }}>
        <div>
          {Array.from(groupedPlayers.entries()).map(([className, players]) => (
            <div key={className}>
              <Text 
                color="blue.200" 
                fontSize="sm" 
                fontWeight="medium" 
                mb={2} 
                mt={3}
              >
                {className}
              </Text>
              <ul>
                {players.map((player) => (
                  <PlayerItem
                    key={player.name}
                    player={player}
                    onRemove={handleRemovePlayer}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { PlayersList };
