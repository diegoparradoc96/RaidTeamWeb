import { useEffect, useRef, useState } from 'react';
import { Box, Text, Image } from '@chakra-ui/react';
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import type { IPlayer } from '@/types/IPlayer';

const RaidSlot = ({ 
  player, 
  index,
  onPlayerDrop,
  isPlayerInRaid
}: { 
  player: IPlayer | null; 
  index: number;
  onPlayerDrop: (player: IPlayer, index: number) => void;
  isPlayerInRaid: (player: IPlayer) => boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOver, setIsOver] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const cleanup = dropTargetForElements({
      element,
      onDragEnter: (event) => {
        const playerData = event.source.data.player as IPlayer;
        const wouldBeInvalid = isPlayerInRaid(playerData);
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
        // Access the dragged data from the source element
        const playerData = event.source.data.player as IPlayer;
        if (playerData) {
          console.log(`Dropped ${playerData.name} into slot ${index}`);
          onPlayerDrop(playerData, index);
        }
      },
    });

    return cleanup;
  }, [index, isPlayerInRaid]);

  return (
    <Box
      ref={ref}
      borderWidth="2px"
      borderStyle="dashed"
      borderColor={isInvalid ? "red.500" : (isOver ? "blue.500" : "gray.300")}
      borderRadius="md"
      p={4}
      minH="100px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bg={isOver ? "gray.100" : "transparent"}
      transition="all 0.2s"
    >
      {player ? (
        <>
          <Image src={player.class.spec.image} alt={player.name} boxSize="40px" />
          <Text mt={2}>{player.name}</Text>
        </>
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

  const handlePlayerDrop = (player: IPlayer, slotIndex: number) => {
    // Verificar si el jugador ya está en la raid
    if (isPlayerInRaid(player)) {
      console.warn(`${player.name} is already in the raid group`);
      return;
    }

    // Si el jugador no está en la raid, actualizamos el slot
    const newSlots = [...raidSlots];
    newSlots[slotIndex] = player;
    setRaidSlots(newSlots);
    
    console.log(`${player.name} has been added to the raid group`);
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg">
      <Text fontSize="xl" mb={4}>Raid Group</Text>
      <Box display="grid" gridTemplateColumns="repeat(5, 1fr)" gap={4}>
        {raidSlots.map((player, index) => (
          <RaidSlot 
            key={index} 
            player={player} 
            index={index} 
            onPlayerDrop={handlePlayerDrop} 
            isPlayerInRaid={isPlayerInRaid}
          />
        ))}
      </Box>
    </Box>
  );
};

export { Raid };
