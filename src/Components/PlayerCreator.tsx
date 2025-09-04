import React, { useState } from "react";
import { Image } from "@chakra-ui/react";
/* chakra */
import { Button, CloseButton, Dialog, Portal, Input } from "@chakra-ui/react";
/* types */
import type { IPlayerClasses } from "../types";
/* utils */
import {
  warriorClasses,
  paladinClasses,
  mageClasses,
  priestClasses,
  rogueClasses,
  shamanClasses,
  warlockClasses,
  druidClasses,
  hunterClasses,
} from "../utils";
/* context */
import { usePlayer } from "../context";

interface PlayerCreatorProps {}

const PlayerCreator: React.FC<PlayerCreatorProps> = () => {
  const { player, addPlayer, clearPlayer } = usePlayer();

  const [playerName, setPlayerName] = useState("");

  const handleCreatePlayer = () => {
    console.log("player", player);
    addPlayer({ name: playerName, class: player.class });
  };

  const playerClassSelector = ({
    playerClasses,
  }: {
    playerClasses: IPlayerClasses;
  }) => {
    return (
      <>
        <p className="text-center">{playerClasses.name}</p>
        <div className="flex flex-row justify-center">
          {playerClasses.spec.map((specInfo) => (
            <Image
              key={specInfo.name}
              src={specInfo.image}
              alt={specInfo.name}
              boxSize="45px"
              objectFit="cover"
              cursor="pointer"
              onClick={() =>
                addPlayer({
                  name: playerName,
                  class: { name: playerClasses.name, spec: specInfo },
                })
              }
              border={
                player.class.name == playerClasses.name &&
                player.class.spec.name == specInfo.name
                  ? "2px solid"
                  : "2px solid transparent"
              }
              borderColor={
                player.class.name == playerClasses.name &&
                player.class.spec.name == specInfo.name
                  ? "blue.500"
                  : "transparent"
              }
              borderRadius="md"
              transition="all 0.2s"
              _hover={{
                transform: "scale(1.05)",
                borderColor:
                  player.class.name == playerClasses.name &&
                  player.class.spec.name == specInfo.name
                    ? "blue.600"
                    : "gray.300",
              }}
            />
          ))}
        </div>
      </>
    );
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          +
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header alignSelf="center">
              <Dialog.Title>Create new player</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <div className="flex flex-row">
                <p className="flex items-center w-2/6 mr-2">Player name:</p>
                <Input
                  placeholder="Enter player name"
                  onChange={(e) => setPlayerName(e.target.value)}
                />
              </div>

              <div className="h-5"></div>

              <div className="flex flex-row">
                <div className="w-2/6">
                  {playerClassSelector({ playerClasses: warriorClasses })}
                </div>
                <div className="w-2/6">
                  {playerClassSelector({ playerClasses: paladinClasses })}
                </div>
                <div className="w-2/6">
                  {playerClassSelector({ playerClasses: rogueClasses })}
                </div>
              </div>

              <div className="h-2"></div>

              <div className="flex flex-row">
                <div className="w-2/6">
                  {playerClassSelector({ playerClasses: hunterClasses })}
                </div>
                <div className="w-2/6">
                  {playerClassSelector({ playerClasses: mageClasses })}
                </div>
                <div className="w-2/6">
                  {playerClassSelector({ playerClasses: warlockClasses })}
                </div>
              </div>

              <div className="h-2"></div>

              <div className="flex flex-row">
                <div className="w-2/6">
                  {playerClassSelector({ playerClasses: shamanClasses })}
                </div>
                <div className="w-2/6">
                  {playerClassSelector({ playerClasses: priestClasses })}
                </div>
                <div className="w-2/6">
                  {playerClassSelector({ playerClasses: druidClasses })}
                </div>
              </div>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={clearPlayer}>
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Dialog.ActionTrigger asChild>
                <Button
                  onClick={() => {
                    handleCreatePlayer();
                    clearPlayer();
                  }}
                >
                  Create
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export { PlayerCreator };
