import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ueb-development/ui/components/card";

interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string; // Additional custom classes for styling
  desc?: string; // Description text
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
  desc = "",
}) => {
  return (
    <Card className={className}>
      <CardHeader className="border-b border-border/50 px-6 py-5">
        <CardTitle>{title}</CardTitle>
        {desc && <CardDescription>{desc}</CardDescription>}
      </CardHeader>

      {/* Card Body */}
      <CardContent className="border-t border-border/50 p-4 sm:p-6">
        <div className="space-y-6">{children}</div>
      </CardContent>
    </Card>
  );
};

export default ComponentCard;