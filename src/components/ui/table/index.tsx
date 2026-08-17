import React, { ReactNode } from "react";
import {
  Table as UebTable,
  TableHeader as UebTableHeader,
  TableBody as UebTableBody,
  TableRow as UebTableRow,
  TableHead as UebTableHead,
  TableCell as UebTableCell,
} from "@ueb-development/ui/components/table";

// Props for Table
interface TableProps {
  children: ReactNode; // Table content (thead, tbody, etc.)
  className?: string; // Optional className for styling
}

// Props for TableHeader
interface TableHeaderProps {
  children: ReactNode; // Header row(s)
  className?: string; // Optional className for styling
}

// Props for TableBody
interface TableBodyProps {
  children: ReactNode; // Body row(s)
  className?: string; // Optional className for styling
}

// Props for TableRow
interface TableRowProps {
  children: ReactNode; // Cells (th or td)
  className?: string; // Optional className for styling
}

// Props for TableCell
interface TableCellProps {
  children: ReactNode; // Cell content
  isHeader?: boolean; // If true, renders as <th>, otherwise <td>
  className?: string; // Optional className for styling
}

// Table Component
const Table: React.FC<TableProps> = ({ children, className }) => {
  return <UebTable className={className}>{children}</UebTable>;
};

// TableHeader Component
const TableHeader: React.FC<TableHeaderProps> = ({ children, className }) => {
  return <UebTableHeader className={className}>{children}</UebTableHeader>;
};

// TableBody Component
const TableBody: React.FC<TableBodyProps> = ({ children, className }) => {
  return <UebTableBody className={className}>{children}</UebTableBody>;
};

// TableRow Component
const TableRow: React.FC<TableRowProps> = ({ children, className }) => {
  return <UebTableRow className={className}>{children}</UebTableRow>;
};

// TableCell Component
const TableCell: React.FC<TableCellProps> = ({
  children,
  isHeader = false,
  className,
}) => {
  if (isHeader) {
    return <UebTableHead className={className}>{children}</UebTableHead>;
  }
  return <UebTableCell className={className}>{children}</UebTableCell>;
};

export { Table, TableHeader, TableBody, TableRow, TableCell };