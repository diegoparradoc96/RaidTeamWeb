import React, { useState } from "react";

/* chakra */
import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { LuPencil } from "react-icons/lu";

interface EditNameDialogProps {
  currentName: string;
  iconSize?: "sm" | "md" | "lg";
  onSave: (newName: string) => void;
}

const EditNameDialog: React.FC<EditNameDialogProps> = ({
  currentName,
  onSave,
  iconSize = "md",
}) => {
  const [newName, setNewName] = useState(currentName);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <IconButton size={iconSize}>
          <LuPencil color="white" />
        </IconButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header alignSelf="center">
              <Dialog.Title>Edit raid name</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <div className="flex flex-col gap-2">
                <p className="text-sm">Current name: {currentName}</p>
                <Input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Enter new name"
                />
              </div>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Dialog.ActionTrigger asChild>
                <Button
                  onClick={() => {
                    if (newName && newName !== currentName) {
                      onSave(newName);
                    }
                  }}
                >
                  Save
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

export { EditNameDialog };
