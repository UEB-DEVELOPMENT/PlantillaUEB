"use client";

import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Checkbox } from "@ueb-development/ui/components/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ueb-development/ui/components/select";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@ueb-development/ui/components/dropdown-menu";
import { Button } from "@ueb-development/ui/components/button";
import { Input } from "@ueb-development/ui/components/input";
import { Download, Settings } from "lucide-react";
import Pagination from "@/components/tables/Pagination";

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  loading?: boolean;
  error?: string;
  searchPlaceholder?: string;
  pageSize?: number;
  pageSizeOptions?: number[];
  keyExtractor: (row: T) => string | number;
  enableRowSelection?: boolean;
  enableColumnVisibility?: boolean;
  enableExport?: boolean;
  enableSearch?: boolean;
  entityName?: string;
  toolbarActions?: React.ReactNode;
  onSelectedAction?: (ids: (string | number)[]) => void;
  selectedActionLabel?: string;
}

const SKELETON_WIDTHS = Array.from(
  { length: 5 },
  () => `${Math.floor(60 + Math.random() * 41)}%`
);

function csvEscape(value: unknown): string {
  const str = String(value ?? "");
  return /[",\n\r]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
}

function DataTable<T>({
  data,
  columns,
  loading = false,
  error,
  searchPlaceholder = "Buscar...",
  pageSize = 10,
  pageSizeOptions = [10, 20, 50],
  keyExtractor,
  enableRowSelection = true,
  enableColumnVisibility = true,
  enableExport = true,
  enableSearch = true,
  entityName = "datos",
  toolbarActions,
  onSelectedAction,
  selectedActionLabel = "Generar PDF",
}: DataTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  const tableColumns = React.useMemo<ColumnDef<T>[]>(() => {
    if (!enableRowSelection) return columns;

    const selectableCol: ColumnDef<T> = {
      id: "select",
      enableSorting: false,
      enableHiding: false,
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
    };

    return [selectableCol, ...columns];
  }, [enableRowSelection, columns]);

  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      sorting,
      globalFilter,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    globalFilterFn: "auto",
    getRowId: (row, index) => String(keyExtractor(row) ?? index),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize } },
  });

  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const selectedIds = selectedRows.map((row) => keyExtractor(row.original));

  const handleExport = () => {
    const visibleColumns = table
      .getVisibleLeafColumns()
      .filter((col) => col.id !== "select");
    const headerRow = visibleColumns.map((col) => {
      const header = col.columnDef.header;
      return typeof header === "string" ? header : col.id;
    });
    const rows = table.getFilteredRowModel().rows.map((row) =>
      visibleColumns.map((col) => csvEscape(row.getValue(col.id)))
    );
    const csv = "\uFEFF" + [headerRow, ...rows].map((r) => r.join(",")).join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${entityName}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        {enableSearch && (
          <Input
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            placeholder={searchPlaceholder}
            className="w-full border-border rounded-lg focus-visible:ring-primary sm:w-72"
          />
        )}

        <div className="flex flex-wrap items-center gap-2">
          {selectedIds.length > 0 && (
            <>
              <span className="text-sm text-muted-foreground">
                {selectedIds.length} seleccionados
              </span>
              {onSelectedAction && (
                <Button
                  onClick={() => onSelectedAction(selectedIds)}
                  className="bg-primary"
                >
                  {selectedActionLabel}
                </Button>
              )}
            </>
          )}

          {enableExport && (
            <Button variant="outline" onClick={handleExport}>
              <Download />
              Exportar
            </Button>
          )}

          {enableColumnVisibility && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Settings />
                  Columnas
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Columnas visibles</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {table
                  .getAllLeafColumns()
                  .filter((col) => col.getCanHide())
                  .map((col) => {
                    const header = col.columnDef.header;
                    const label = typeof header === "string" ? header : col.id;
                    return (
                      <DropdownMenuCheckboxItem
                        key={col.id}
                        className="capitalize"
                        checked={col.getIsVisible()}
                        onCheckedChange={(value) =>
                          col.toggleVisibility(!!value)
                        }
                      >
                        {label}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {toolbarActions}
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full caption-bottom text-sm">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      onClick={
                        header.column.getCanSort()
                          ? header.column.getToggleSortingHandler()
                          : undefined
                      }
                      className="cursor-pointer select-none px-5 py-3 text-left text-xs font-medium text-muted-foreground"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {header.column.getCanSort() &&
                      header.column.getIsSorted()
                        ? header.column.getIsSorted() === "asc"
                          ? " ▲"
                          : " ▼"
                        : null}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-border dark:divide-white/[0.05]">
              {loading ? (
                Array.from({ length: 5 }).map((_, rowIndex) => (
                  <tr key={`skeleton-${rowIndex}`}>
                    {tableColumns.map((_, colIndex) => (
                      <td key={colIndex} className="px-5 py-4">
                        <div
                          suppressHydrationWarning
                          className="h-4 animate-pulse rounded bg-secondary dark:bg-secondary"
                          style={{ width: SKELETON_WIDTHS[rowIndex] }}
                        />
                      </td>
                    ))}
                  </tr>
                ))
              ) : error ? (
                <tr>
                  <td
                    colSpan={tableColumns.length}
                    className="px-5 py-8 text-center text-sm text-destructive"
                  >
                    {error}
                  </td>
                </tr>
              ) : table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={tableColumns.length}
                    className="px-5 py-8 text-center text-sm text-muted-foreground"
                  >
                    Sin datos
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className={
                      row.getIsSelected()
                        ? "bg-blue-50 dark:bg-blue-900/20"
                        : ""
                    }
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-5 py-4 text-sm text-foreground/80 dark:text-muted-foreground"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {!loading && !error && table.getRowModel().rows.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Mostrar</span>
            <Select
              value={String(table.getState().pagination.pageSize)}
              onValueChange={(value) => table.setPageSize(Number(value))}
            >
              <SelectTrigger className="h-8 w-16">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pageSizeOptions.map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">por página</span>
          </div>
          <Pagination
            currentPage={table.getState().pagination.pageIndex + 1}
            totalPages={table.getPageCount()}
            onPageChange={(page) => table.setPageIndex(page - 1)}
          />
        </div>
      )}
    </div>
  );
}

export default DataTable;
