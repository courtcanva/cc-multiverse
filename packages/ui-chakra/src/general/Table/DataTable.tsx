import * as React from "react";
import { Center, chakra, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

export type DataTableProps<Data extends object> = {
  data: Data[];
  columns: ColumnDef<Data, any>[];
};

export function DataTable<Data extends object>({ data, columns }: DataTableProps<Data>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <Table>
      <Thead bg="gray.50">
        {table
          .getHeaderGroups()
          .map((headerGroup: { id: React.Key | null | undefined; headers: any[] }) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map(
                (header: {
                  column: { columnDef: { meta: any; header: any } };
                  id: React.Key | null | undefined;
                  getContext: () => any;
                }) => {
                  const meta: any = header.column.columnDef.meta;
                  return (
                    <Th key={header.id} isNumeric={meta?.isNumeric}>
                      <Center>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </Center>
                    </Th>
                  );
                }
              )}
            </Tr>
          ))}
      </Thead>
      <Tbody>
        {table
          .getRowModel()
          .rows.map((row: { id: React.Key | null | undefined; getVisibleCells: () => any[] }) => (
            <Tr key={row.id}>
              {row
                .getVisibleCells()
                .map(
                  (cell: {
                    column: { columnDef: { meta: any; cell: any } };
                    id: React.Key | null | undefined;
                    getContext: () => any;
                  }) => {
                    const meta: any = cell.column.columnDef.meta;
                    return (
                      <Td key={cell.id} isNumeric={meta?.isNumeric}>
                        <Center>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Center>
                      </Td>
                    );
                  }
                )}
            </Tr>
          ))}
      </Tbody>
    </Table>
  );
}
