import {
  Table as TableComp,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
} from "@gemeente-denhaag/table";

export type Cell =
  | string
  | undefined
  | {
      className?: string;
      children?: React.ReactNode;
      href?: string;
      head?: boolean;
    };

interface Props {
  headers?: Cell[];
  rows?: Cell[][];
}

const Table = ({ headers, rows }: Props) => {
  const renderCell = (cell: Cell, head?: boolean) => {
    if (typeof cell === "string" || typeof cell === "undefined") {
      if (head) return <TableHeader>{cell}</TableHeader>;
      return <TableCell>{cell}</TableCell>;
    }

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
