import { useEffect, useRef, useState } from 'react';
import { Box, Text, Image } from '@chakra-ui/react';
import { dropTargetForElements, draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { DecisionAlert } from './DecisionAlert';
import type { IPlayer } from '@/types/IPlayer';

const RaidSlot = ({ 
  player, 
  index,
  onPlayerDrop,
  onPlayerRemove,
  isPlayerInRaid
}: { 
  player: IPlayer | null; 
  index: number;
  onPlayerDrop: (player: IPlayer, index: number, sourceIndex?: number) => void;
  onPlayerRemove: (index: number) => void;
  isPlayerInRaid: (player: IPlayer) => boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOver, setIsOver] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Configurar el elemento como droppable
    const dropCleanup = dropTargetForElements({
      element,
      onDragEnter: (event) => {
        const playerData = event.source.data.player as IPlayer;
        // Solo es inválido si el jugador está en la raid
        // y viene de fuera (no es un movimiento interno)
        const sourceIndex = event.source.data.sourceIndex as number | undefined;
        const wouldBeInvalid = sourceIndex === undefined && isPlayerInRaid(playerData);
        setIsInvalid(wouldBeInvalid);
        setIsOver(true);
      },
      onDragLeave: () => {
        setIsInvalid(false);
        setIsOver(false);
      },
      onDrop: (event) => {
        setIsOver(false);
        setIsInvalid(false);
        const playerData = event.source.data.player as IPlayer;
        const sourceIndex = event.source.data.sourceIndex as number | undefined;
        if (playerData) {
          console.log(`Dropped ${playerData.name} into slot ${index} from ${sourceIndex ?? 'outside'}`);
          onPlayerDrop(playerData, index, sourceIndex);
        }
      },
    });

    // Si hay un jugador en el slot, hacerlo draggable
    let dragCleanup = () => {};
    if (player) {
      dragCleanup = draggable({
        element,
        getInitialData: () => ({ 
          player,
          sourceIndex: index 
        }),
      });
    }

    return () => {
      dropCleanup();
      dragCleanup();
    };
  }, [index, isPlayerInRaid, player]);

  return (
    <Box
      ref={ref}
      borderWidth="2px"
      borderStyle="dashed"
      borderColor={isInvalid ? "red.500" : (isOver ? "blue.500" : "gray.300")}
      borderRadius="md"
      p={4}
      minH="60px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bg={isOver ? "gray.100" : "transparent"}
      transition="all 0.2s"
    >
      {player ? (
        <Box 
          width="100%" 
          display="flex" 
          alignItems="center" 
          justifyContent="space-between"
          gap={4}
        >
          <Image 
            src={player.class.spec.image} 
            alt={player.name} 
            boxSize="40px" 
            style={{ pointerEvents: 'none' }} 
            draggable={false}
          />
          <Text flex="1" textAlign="center">{player.name}</Text>
          <DecisionAlert
            strDescription={`Are you sure you want to remove ${player.name} from the raid?`}
            funExecute={() => onPlayerRemove(index)}
          />
        </Box>
      ) : (
        <Text color="gray.500">Empty Slot {index + 1}</Text>
      )}
    </Box>
  );
};

const Raid = () => {
  const [raidSlots, setRaidSlots] = useState<(IPlayer | null)[]>(
    Array(5).fill(null)
  );

  const isPlayerInRaid = (player: IPlayer) => {
    return raidSlots.some(slot => slot?.name === player.name);
  };

  const handlePlayerDrop = (player: IPlayer, targetIndex: number, sourceIndex?: number) => {
    const newSlots = [...raidSlots];

    // Si es un movimiento dentro de la raid
    if (sourceIndex !== undefined) {
      // Si el slot destino está ocupado, intercambiamos posiciones
      if (newSlots[targetIndex]) {
        const targetPlayer = newSlots[targetIndex];
        newSlots[sourceIndex] = targetPlayer;
      } else {
        // Si el slot destino está vacío, simplemente movemos y limpiamos el origen
        newSlots[sourceIndex] = null;
      }
      newSlots[targetIndex] = player;
    } 
    // Si es un jugador nuevo desde fuera de la raid
    else {
      // Verificar si el jugador ya está en la raid
      if (isPlayerInRaid(player)) {
        console.warn(`${player.name} is already in the raid group`);
        return;
      }
      
      // Simplemente reemplazamos el jugador en el slot objetivo,
      // sin importar si está ocupado o no
      newSlots[targetIndex] = player;
      console.log(`${player.name} has been added to the raid group`);
    }

    setRaidSlots(newSlots);
  };

  const handleRemovePlayer = (index: number) => {
    const newSlots = [...raidSlots];
    newSlots[index] = null;
    setRaidSlots(newSlots);
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" maxW="600px">
      <Text fontSize="xl" mb={4}>Raid Group</Text>
      <Box display="flex" flexDirection="column" gap={4}>
        {raidSlots.map((player, index) => (
          <RaidSlot 
            key={index} 
            player={player} 
            index={index} 
            onPlayerDrop={handlePlayerDrop} 
            onPlayerRemove={handleRemovePlayer}
            isPlayerInRaid={isPlayerInRaid}
          />
        ))}
      </Box>
    </Box>
  );
};

export { Raid };
