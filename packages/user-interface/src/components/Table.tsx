import {
  Table as TableComp,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
} from "@gemeente-denhaag/table";
import React from "react";
import { PortalLink } from "..";

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

  const renderCell = (keyString: string, cell: Cell, head?: boolean) => {
    if (isObject(cell)) {
      if (cell.head)
        return (
          <TableHeader
            key={keyString}
            className={cell.className}
            href={cell.href}
            Link={PortalLink}
          >
            {cell.children}
          </TableHeader>
        );

      return (
        <TableCell
          key={keyString}
          className={cell.className}
          href={cell.href}
          Link={PortalLink}
        >
          {cell.children}
        </TableCell>
      );
    }

    if (head) return <TableHeader key={keyString}>{cell}</TableHeader>;
    return <TableCell key={keyString}>{cell}</TableCell>;
  };

  return (
    <TableComp>
      {headers && (
        <TableHead>
          <TableRow>
            {headers.map((head, index) =>
              renderCell(`header-${index}`, head, true),
            )}
          </TableRow>
        </TableHead>
      )}
      {rows && (
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) =>
                renderCell(`row-${rowIndex}-${cellIndex}`, cell),
              )}
            </TableRow>
          ))}
        </TableBody>
      )}
    </TableComp>
  );
};

export default Table;
