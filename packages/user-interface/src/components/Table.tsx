import {
  Table as TableComp,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
} from "@gemeente-denhaag/table";
import React from "react";

export interface CellObject {
  className?: string;
  children?: React.ReactNode;
  href?: string;
  head?: boolean;
}

export type CellSingle = React.ReactNode | string | undefined;

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

  const renderCell = (index: number, cell: Cell, head?: boolean) => {
    if (isObject(cell)) {
      const key = cell.children ? cell?.children.toString() : index;

      if (cell.head)
        return (
          <TableHeader key={key} className={cell.className} href={cell.href}>
            {cell.children}
          </TableHeader>
        );

      return (
        <TableCell key={key} className={cell.className} href={cell.href}>
          {cell.children}
        </TableCell>
      );
    }

    const key = cell?.toString();
    if (head) return <TableHeader key={key}>{cell}</TableHeader>;
    return <TableCell key={key}>{cell}</TableCell>;
  };

  return (
    <TableComp>
      {headers && (
        <TableHead>
          <TableRow>
            {headers.map((head, index) => renderCell(index, head, true))}
          </TableRow>
        </TableHead>
      )}
      {rows && (
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => renderCell(cellIndex, cell))}
            </TableRow>
          ))}
        </TableBody>
      )}
    </TableComp>
  );
};

export default Table;
