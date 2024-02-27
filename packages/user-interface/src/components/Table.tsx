import {
  Table as TableComp,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
} from "@gemeente-denhaag/table";
import React from "react";

interface CellObject {
  className?: string;
  children?: React.ReactNode;
  href?: string;
  head?: boolean;
}

type CellSingle = React.ReactNode | string | undefined;

export type Cell = CellSingle | CellObject;

interface Props {
  headers?: Cell[];
  rows?: Cell[][];
}

const Table = ({ headers, rows }: Props) => {
  const isObject = (cell: Cell): cell is CellObject => {
    return (
      typeof cell === "object" &&
      cell !== null &&
      ("className" in cell ||
        "children" in cell ||
        "href" in cell ||
        "head" in cell)
    );
  };

  const renderCell = (cell: Cell, head?: boolean) => {
    if (isObject(cell)) {
      if (cell.head)
        return (
          <TableHeader className={cell.className} href={cell.href}>
            {cell.children}
          </TableHeader>
        );

      return (
        <TableCell className={cell.className} href={cell.href}>
          {cell.children}
        </TableCell>
      );
    }

    if (head) return <TableHeader>{cell}</TableHeader>;
    return <TableCell>{cell}</TableCell>;
  };

  return (
    <TableComp>
      {headers && (
        <TableHead>
          <TableRow>{headers.map((head) => renderCell(head, true))}</TableRow>
        </TableHead>
      )}
      {rows && (
        <TableBody>
          {rows.map((row) => (
            <TableRow>{row.map((cell) => renderCell(cell))}</TableRow>
          ))}
        </TableBody>
      )}
    </TableComp>
  );
};

export default Table;
