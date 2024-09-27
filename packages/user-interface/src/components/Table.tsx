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
import classNames from "classnames";

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
    let classes = classNames("denhaag-table__cell--align-top");

    if (isObject(cell)) {
      classes = classNames(classes, cell.className);

      if (cell.head)
        return (
          <TableHeader
            key={keyString}
            className={classes}
            href={cell.href}
            Link={PortalLink}
          >
            {cell.children}
          </TableHeader>
        );

      return (
        <TableCell
          key={keyString}
          className={classes}
          href={cell.href}
          Link={PortalLink}
        >
          {cell.children}
        </TableCell>
      );
    }

    if (head)
      return (
        <TableHeader key={keyString} className={classes}>
          {cell}
        </TableHeader>
      );

    return (
      <TableCell key={keyString} className={classes}>
        {cell}
      </TableCell>
    );
  };

  return (
    <TableComp>
      {headers && (
        <TableHead>
          <TableRow>
            {headers.map((cell, index) =>
              renderCell(`header-${index}`, cell, true),
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
