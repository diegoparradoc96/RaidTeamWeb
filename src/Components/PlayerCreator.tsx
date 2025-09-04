import React, { useState } from "react";
import { Image } from "@chakra-ui/react";
/* chakra */
import { Button, CloseButton, Dialog, Portal, Input } from "@chakra-ui/react";
/* types */
import type { IPlayerClass } from "../types";
/* utils */
import {
  warriorClass,
  paladinClass,
  mageClass,
  priestClass,
  rogueClass,
  shamanClass,
  warlockClass,
  druidClass,
  hunterClass,
} from "../utils";

interface PlayerCreatorProps {
  onClick: () => void;
}

const PlayerCreator: React.FC<PlayerCreatorProps> = ({ onClick }) => {
  const [isSelected, setIsSelected] = useState(false);

  const playerClassSelector = ({
    playerClass,
  }: {
    playerClass: IPlayerClass;
  }) => {
    return (
      <>
        <p className="text-center">{playerClass.name}</p>
        <div className="flex flex-row justify-center">
          {playerClass.spec.map((specInfo) => (
            <Image
              key={specInfo.name}
              src={specInfo.image}
              alt={specInfo.name}
              boxSize="45px"
              objectFit="cover"
              cursor="pointer"
              onClick={() => setIsSelected(!isSelected)}
              border={isSelected ? "2px solid" : "2px solid transparent"}
              borderColor={isSelected ? "blue.500" : "transparent"}
              borderRadius="md"
              transition="all 0.2s"
              _hover={{
                transform: "scale(1.05)",
                borderColor: isSelected ? "blue.600" : "gray.300",
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
                <Input placeholder="Enter player name" />
              </div>

              <div className="h-5"></div>

              <div className="flex flex-row">
                <div className="w-2/6">
                  {playerClassSelector({ playerClass: warriorClass })}
                </div>
                <div className="w-2/6">
                  {playerClassSelector({ playerClass: paladinClass })}
                </div>
                <div className="w-2/6">
                  {playerClassSelector({ playerClass: rogueClass })}
                </div>
              </div>

              <div className="h-2"></div>

              <div className="flex flex-row">
                <div className="w-2/6">
                  {playerClassSelector({ playerClass: hunterClass })}
                </div>
                <div className="w-2/6">
                  {playerClassSelector({ playerClass: mageClass })}
                </div>
                <div className="w-2/6">
                  {playerClassSelector({ playerClass: warlockClass })}
                </div>
              </div>

              <div className="h-2"></div>

              <div className="flex flex-row">
                <div className="w-2/6">
                  {playerClassSelector({ playerClass: shamanClass })}
                </div>
                <div className="w-2/6">
                  {playerClassSelector({ playerClass: priestClass })}
                </div>
                <div className="w-2/6">
                  {playerClassSelector({ playerClass: druidClass })}
                </div>
              </div>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button onClick={onClick}>Create</Button>
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
