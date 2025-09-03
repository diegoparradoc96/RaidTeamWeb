import React from "react";

interface IconButtonProps {
  onClick: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <p>+</p>
    </button>
  );
};

export { IconButton };
