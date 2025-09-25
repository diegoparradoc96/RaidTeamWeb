import React from "react";

/* chakra */
import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  IconButton,
} from "@chakra-ui/react";
import { LuTrash2 } from "react-icons/lu";
import { MdCleaningServices } from "react-icons/md";

interface DecisionAlertProps {
  strDescription: string;
  icon?: string;
  iconSize?: "sm" | "md" | "lg";
  funExecute: () => void;
}

const DecisionAlert: React.FC<DecisionAlertProps> = ({
  funExecute,
  strDescription,
  icon = "trash",
  iconSize = "md",
}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <IconButton size={iconSize}>
          {icon === "trash" && <LuTrash2 color="white" />}
          {icon === "clean" && <MdCleaningServices color="white" />}
        </IconButton>
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
                <p className="flex items-center w-2/6 mr-2">{strDescription}</p>
              </div>

              <div className="h-5"></div>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Dialog.ActionTrigger asChild>
                <Button onClick={() => funExecute()}>Accept</Button>
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

export { DecisionAlert };
