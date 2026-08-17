import React from "react";
import {
  Avatar as UebAvatar,
  AvatarImage,
  AvatarBadge,
} from "@ueb-development/ui/components/avatar";

interface AvatarProps {
  src: string; // URL of the avatar image
  alt?: string; // Alt text for the avatar
  size?: "xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge"; // Avatar size
  status?: "online" | "offline" | "busy" | "none"; // Status indicator
}

const sizeMap: Record<
  NonNullable<AvatarProps["size"]>,
  { ds: "sm" | "default" | "lg"; className?: string }
> = {
  xsmall: { ds: "sm" },
  small: { ds: "sm" },
  medium: { ds: "default" },
  large: { ds: "lg" },
  xlarge: { ds: "lg", className: "size-14" },
  xxlarge: { ds: "lg", className: "size-16" },
};

const statusColorClasses = {
  online: "bg-success",
  offline: "bg-destructive",
  busy: "bg-warning",
};

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "User Avatar",
  size = "medium",
  status = "none",
}) => {
  const { ds, className } = sizeMap[size];

  return (
    <UebAvatar size={ds} className={className}>
      <AvatarImage src={src} alt={alt} />
      {status !== "none" && (
        <AvatarBadge className={statusColorClasses[status]} />
      )}
    </UebAvatar>
  );
};

export default Avatar;