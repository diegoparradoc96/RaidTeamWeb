import { useEffect, useRef, useState } from "react";
import {
  Box,
  Text,
  Image,
  Button,
  createListCollection,
  Select,
  Portal,
} from "@chakra-ui/react";
import {
  dropTargetForElements,
  draggable,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import type { IPlayer } from "@/types/IPlayer";
import { raidService } from "@/data/services";

interface RaidBoxProps {
  boxId: number;
  slots: (IPlayer | null)[];
  onPlayerDrop: (
    player: IPlayer,
    targetBoxId: number,
    targetIndex: number,
    sourceBoxId?: number,
    sourceIndex?: number
  ) => void;
  onPlayerRemove: (boxId: number, index: number) => void;
  isPlayerInRaid: (player: IPlayer) => boolean;
}

const RaidSlot = ({
  player,
  index,
  boxId,
  onPlayerDrop,
  onPlayerRemove,
  isPlayerInRaid,
}: {
  player: IPlayer | null;
  index: number;
  boxId: number;
  onPlayerDrop: (
    player: IPlayer,
    targetBoxId: number,
    targetIndex: number,
    sourceBoxId?: number,
    sourceIndex?: number
  ) => void;
  onPlayerRemove: (boxId: number, index: number) => void;
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
        const wouldBeInvalid =
          sourceIndex === undefined && isPlayerInRaid(playerData);
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
        const sourceBoxId = event.source.data.sourceBoxId as number | undefined;
        const sourceIndex = event.source.data.sourceIndex as number | undefined;

        if (playerData) {
          console.log(
            `Dropped ${playerData.name} into box ${boxId} slot ${index} from ${
              sourceBoxId !== undefined
                ? `box ${sourceBoxId} slot ${sourceIndex}`
                : "outside"
            }`
          );
          onPlayerDrop(playerData, boxId, index, sourceBoxId, sourceIndex);
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
          sourceBoxId: boxId,
          sourceIndex: index,
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
      borderWidth="1px"
      borderStyle="solid"
      borderColor={
        isInvalid ? "red.400" : isOver ? "blue.400" : "whiteAlpha.200"
      }
      borderRadius="md"
      h="44px"
      px={3}
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={isOver ? "whiteAlpha.200" : player ? "whiteAlpha.100" : "transparent"}
      transition="all 0.2s ease"
      _hover={{
        borderColor: isInvalid ? "red.400" : "blue.400",
        bg: "whiteAlpha.100",
      }}
    >
      {player ? (
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Image
              src={player.class.spec.image}
              alt={player.name}
              boxSize="30px"
              style={{ pointerEvents: "none" }}
              draggable={false}
            />
            <Text flex="1">{player.name}</Text>
          </Box>

          <Box
            cursor="pointer"
            color="whiteAlpha.600"
            width="20px"
            height="20px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="xs"
            onClick={() => onPlayerRemove(boxId, index)}
            zIndex={1}
            transition="all 0.2s"
            _hover={{
              color: "red.400",
            }}
          >
            ✕
          </Box>
        </Box>
      ) : (
        <Text color="gray.500"></Text>
      )}
    </Box>
  );
};

const RaidBox = ({
  boxId,
  slots,
  onPlayerDrop,
  onPlayerRemove,
  isPlayerInRaid,
}: RaidBoxProps) => {
  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="md"
      width="100%"
      borderColor="whiteAlpha.200"
      bg="transparent"
      transition="all 0.2s ease"
    >
      <Text fontSize="md" mb={4} fontWeight="medium" color="blue.200">
        Group {boxId + 1}
      </Text>
      <Box display="flex" flexDirection="column" gap={3} width="100%">
        {slots.map((player, index) => (
          <RaidSlot
            key={index}
            boxId={boxId}
            player={player}
            index={index}
            onPlayerDrop={onPlayerDrop}
            onPlayerRemove={onPlayerRemove}
            isPlayerInRaid={isPlayerInRaid}
          />
        ))}
      </Box>
    </Box>
  );
};

const Raid = () => {
  const [raidName, setRaidName] = useState<string>("default");
  const [raidBoxes, setRaidBoxes] = useState<(IPlayer | null)[][]>(
    Array(5)
      .fill(null)
      .map(() => Array(5).fill(null))
  );
  const [availableRaids, setAvailableRaids] = useState<string[]>([]);
  const raids = createListCollection({
    // items: [
    //   { label: "React.js", value: "react" },
    //   { label: "Vue.js", value: "vue" },
    //   { label: "Angular", value: "angular" },
    //   { label: "Svelte", value: "svelte" },
    // ],
    items: [...availableRaids.map((raid) => ({ label: raid, value: raid }))],
  });

  // Cargar la lista de raids disponibles
  useEffect(() => {
    const loadRaidsList = async () => {
      try {
        const raids = await raidService.getAllRaids();
        setAvailableRaids(raids);
      } catch (error) {
        console.error("Error loading raids list:", error);
      }
    };
    loadRaidsList();
  }, []);

  // Cargar la raid guardada cuando se monta el componente
  useEffect(() => {
    const loadRaid = async () => {
      try {
        const savedRaid = await raidService.getRaid(raidName);
        if (savedRaid) {
          setRaidBoxes(savedRaid);
        }
      } catch (error) {
        console.error("Error loading raid:", error);
      }
    };
    loadRaid();
  }, [raidName]);

  // Guardar la raid cada vez que cambie
  useEffect(() => {
    const saveRaid = async () => {
      try {
        await raidService.saveRaid(raidName, raidBoxes);
        console.log(`Raid "${raidName}" saved successfully`);
      } catch (error) {
        console.error("Error saving raid:", error);
      }
    };
    saveRaid();
  }, [raidBoxes, raidName]);

  const isPlayerInRaid = (player: IPlayer) => {
    return raidBoxes.some((box) =>
      box.some((slot) => slot?.name === player.name)
    );
  };
  const handlePlayerDrop = (
    player: IPlayer,
    targetBoxId: number,
    targetIndex: number,
    sourceBoxId?: number,
    sourceIndex?: number
  ) => {
    const newBoxes = raidBoxes.map((box) => [...box]);

    // Si es un movimiento dentro de la raid (ya sea en la misma caja o entre cajas)
    if (sourceBoxId !== undefined && sourceIndex !== undefined) {
      // Si el slot destino está ocupado, intercambiamos posiciones
      if (newBoxes[targetBoxId][targetIndex]) {
        const targetPlayer = newBoxes[targetBoxId][targetIndex];
        newBoxes[sourceBoxId][sourceIndex] = targetPlayer;
      } else {
        // Si el slot destino está vacío, limpiamos el origen
        newBoxes[sourceBoxId][sourceIndex] = null;
      }
      newBoxes[targetBoxId][targetIndex] = player;
    }
    // Si es un jugador nuevo desde fuera de la raid
    else {
      // Verificar si el jugador ya está en la raid
      if (isPlayerInRaid(player)) {
        console.warn(`${player.name} is already in a raid group`);
        return;
      }

      // Reemplazamos el jugador en el slot objetivo
      newBoxes[targetBoxId][targetIndex] = player;
      console.log(`${player.name} has been added to group ${targetBoxId + 1}`);
    }

    setRaidBoxes(newBoxes);
  };
  const handleRemovePlayer = (boxId: number, index: number) => {
    const newBoxes = raidBoxes.map((box) => [...box]);
    newBoxes[boxId][index] = null;
    setRaidBoxes(newBoxes);
  };
  const handleAddNewRaid = () => {
    const newRaidName = `Raid ${availableRaids.length + 1}`;
    setRaidName(newRaidName);
    setRaidBoxes(
      Array(5)
        .fill(null)
        .map(() => Array(5).fill(null))
    );
    // Actualizamos la lista de raids
    setAvailableRaids((prevRaids) => [...prevRaids, newRaidName]);
  };

  return (
    <Box display="flex" flexDirection="column" width="100%" gap={4}>
      <Box px={6}>
        <Box display="flex" alignItems="end" gap={2}>
          <Select.Root collection={raids} size="md" width="320px">
            <Select.HiddenSelect />
            <Select.Label>Select a raid</Select.Label>

            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Select a raid" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>

            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {raids.items.map((raid) => (
                    <Select.Item
                      item={raid}
                      key={raid.value}
                      onClick={() => setRaidName(raid.value)}
                    >
                      {raid.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>

          <Button colorScheme="blue" size="md" onClick={handleAddNewRaid}>
            +
          </Button>
        </Box>
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(5, 1fr)"
        //flexWrap="wrap"
        justifyContent="space-between"
        gap={4}
        width="100%"
        bg="transparent"
        px={6}
      >
        {raidBoxes.map((slots, boxId) => (
          <RaidBox
            key={boxId}
            boxId={boxId}
            slots={slots}
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
