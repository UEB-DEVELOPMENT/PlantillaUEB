import React from "react";
import {
  Avatar as UebAvatar,
  AvatarFallback,
} from "@ueb-development/ui/components/avatar";

interface AvatarTextProps {
  name: string;
  className?: string;
}

const AvatarText: React.FC<AvatarTextProps> = ({ name, className = "" }) => {
  // Generate initials from name
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <UebAvatar className={className}>
      <AvatarFallback className="bg-muted text-sm font-medium text-muted-foreground">
        {initials}
      </AvatarFallback>
    </UebAvatar>
  );
};

export default AvatarText;