"use client";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  type RowSelectionState,
  type Row,
} from "@tanstack/react-table";
import { useState } from "react";
import { Settings, Download } from "lucide-react";
import Pagination from "@/components/tables/Pagination";
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

function csvEscape(val: unknown): string {
  const s = val == null ? "" : String(val);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function toSearchString(val: unknown): string {
  if (val == null) return "";
  if (typeof val === "object") {
    try {
      return JSON.stringify(val);
    } catch {
      return String(val);
    }
  }
  return String(val);
}

function searchableGlobalFilter<T>(
  row: Row<T>,
  _columnId: string,
  filterValue: unknown
): boolean {
  const needle = String(filterValue ?? "").trim().toLowerCase();
  if (!needle) return true;

  const haystack = [
    ...row.getAllCells().map((cell) => cell.getValue()),
    ...Object.values(row.original as Record<string, unknown>),
  ]
    .flat()
    .map(toSearchString);

  return haystack.some((s) => s.toLowerCase().includes(needle));
}

export default function DataTable<T>({
  data,
  columns,
  loading,
  error,
  searchPlaceholder = "Buscar...",
  pageSize: initialPageSize = 10,
  pageSizeOptions = [10, 20, 50],
  keyExtractor,
  enableRowSelection = true,
  enableColumnVisibility = true,
  enableExport = true,
  enableSearch = true,
  entityName = "items",
  toolbarActions,
  onSelectedAction,
  selectedActionLabel = "Generar PDF",
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const selectableCol: ColumnDef<T> = {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
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
    enableSorting: false,
    enableHiding: false,
  };

  const allColumns = enableRowSelection
    ? [selectableCol, ...columns]
    : columns;

  const table = useReactTable({
    data,
    columns: allColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
    globalFilterFn: searchableGlobalFilter,
    autoResetPageIndex: false,
    initialState: { pagination: { pageSize: initialPageSize } },
    getRowId: (row, index) => String(keyExtractor(row) ?? index),
  });

  const selectedCount = Object.keys(rowSelection).length;

  const exportCsv = () => {
    const visibleColumns = table.getAllLeafColumns().filter((col) => {
      if (col.id === "select") return false;
      return col.getIsVisible();
    });
    const headers = visibleColumns.map((col) => {
      const h = col.columnDef.header;
      return csvEscape(typeof h === "function" ? col.id : (h as string) || col.id);
    });
    const rows = table.getCoreRowModel().rows.map((row) =>
      visibleColumns.map((col) => csvEscape(row.getValue(col.id))).join(",")
    );
    const csv = [headers.join(","), ...rows].join("\r\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${entityName}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        {enableSearch && (
          <input
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full sm:w-72 px-4 py-2.5 text-sm border border-border rounded-lg bg-white dark:bg-secondary dark:border-border dark:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        )}

        <div className="flex items-center gap-2">
          {enableRowSelection && selectedCount > 0 && (
            <>
              <span className="text-sm text-muted-foreground">{selectedCount} seleccionados</span>
              {onSelectedAction && (
                <button
                  onClick={() => {
                    const ids = table.getSelectedRowModel().rows.map((r) => keyExtractor(r.original));
                    onSelectedAction(ids);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary"
                >
                  {selectedActionLabel}
                </button>
              )}
            </>
          )}

          {enableExport && (
            <button
              onClick={exportCsv}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium border border-border rounded-lg hover:bg-muted dark:border-border dark:hover:bg-secondary"
            >
              <Download className="size-4" />
              Exportar
            </button>
          )}

          {enableColumnVisibility && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium border border-border rounded-lg hover:bg-muted dark:border-border dark:hover:bg-secondary">
                  <Settings className="size-4" />
                  Columnas
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Visibilidad</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {table.getAllLeafColumns().filter((c) => c.id !== "select" && c.getCanHide()).map((col) => {
                  const h = col.columnDef.header;
                  const label = typeof h === "string" ? h : col.id;
                  return (
                    <DropdownMenuCheckboxItem
                      key={col.id}
                      checked={col.getIsVisible()}
                      onCheckedChange={(value) => col.toggleVisibility(!!value)}
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

      {error && <div className="p-3 mb-4 text-sm text-red-600 bg-red-100 rounded-lg">{error}</div>}

      <div className="overflow-hidden rounded-xl border border-border bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b border-border dark:border-white/[0.05]">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-5 py-3 text-left text-xs font-medium text-muted-foreground cursor-pointer select-none"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                      {{ asc: " ▲", desc: " ▼" }[header.column.getIsSorted() as string] ?? ""}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-border dark:divide-white/[0.05]">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {allColumns.map((_, j) => (
                      <td key={j} className="px-5 py-4">
                        <div className="h-4 bg-secondary rounded dark:bg-secondary animate-pulse" style={{ width: `${60 + Math.random() * 40}%` }} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={allColumns.length} className="px-5 py-8 text-center text-sm text-muted-foreground">
                    Sin datos
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className={row.getIsSelected() ? "bg-blue-50 dark:bg-blue-900/20" : ""}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-5 py-4 text-sm text-foreground/80 dark:text-muted-foreground">
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

      {table.getRowModel().rows.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            Mostrar
            <Select
              value={String(table.getState().pagination.pageSize)}
              onValueChange={(v) => table.setPageSize(Number(v))}
            >
              <SelectTrigger className="w-16 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pageSizeOptions.map((s) => (
                  <SelectItem key={s} value={String(s)}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            por página
          </div>

          <Pagination
            currentPage={table.getState().pagination.pageIndex + 1}
            totalPages={table.getPageCount()}
            onPageChange={(p) => table.setPageIndex(p - 1)}
          />
        </div>
      )}
    </div>
  );
}
