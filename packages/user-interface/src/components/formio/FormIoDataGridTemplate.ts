// installDenHaagTemplates.ts
import { Templates } from "@formio/js";
import { escape } from "lodash-es";

export function installDenHaagTemplates() {
  const base =
    (Templates as any).templates?.bootstrap ||
    (Templates as any).current ||
    {};

  const toArray = (v: any): any[] =>
    Array.isArray(v) ? v : (v && typeof v === "object" ? Object.values(v) : []);

  const cellToHtml = (cell: any): string => {
    if (!cell) return "";
    if (typeof cell === "string") return cell;
    if (typeof cell === "object") {
      // Some template packs stick the HTML under "markup" or "content"
      if (typeof cell.markup === "string") return cell.markup;
      if (typeof cell.content === "string") return cell.content;
    }
    return String(cell);
  };

  const rowsFromCtx = (ctx: any): string => {
    // ctx.rows can be: string[], object[], or missing
    const rows = toArray(ctx?.rows);
    if (!rows.length) return "";
    return rows
      .map((row: any) => {
        const cells = toArray(row);
        return cells.map(cellToHtml).join("");
      })
      .map((cellsHtml: string) => {
        // Wrap each row in our div row shell
        return `<div class="dg-row">${cellsHtml}</div>`;
      })
      .join("");
  };

  const denhaagDatagrid = {
    ...base.datagrid,

    form(ctx: any) {
      const key = ctx.datagridKey;
      const instance = ctx.instance;
      const addLabel = escape(ctx.t(ctx.component.addAnother || "Rij toevoegen"));
      const removeLabel = escape(ctx.t(ctx.component.removeRow || "Verwijderen"));

      // Columns can be array or object
      const columns = toArray(ctx.columns);
      const hasHeader = !!ctx.hasHeader;

      const headerHtml = hasHeader
        ? `
          <div class="dg-header">
            ${columns
              .map(
                (c: any) =>
                  `<div class="dg-colheader">${escape(c?.label || c?.title || "")}</div>`
              )
              .join("")}
            ${ctx.hasExtraColumn ? `<div class="dg-colheader dg-colheader--actions"></div>` : ""}
          </div>
        `
        : "";

      // Try to render rows from live instance (best) -> fallback to pre-rendered ctx.rows
      let rowsHtml = "";
      const iRows = toArray(instance?.rows);

      if (iRows.length) {
        rowsHtml = iRows
          .map((row: any, rowIndex: number) => {
            const cols = toArray(row);
            const cellsHtml = cols
              .map((col: any) => {
                // Prefer the child’s render() output if available
                const content = typeof col?.render === "function" ? col.render() : "";
                return `
                  <div class="dg-cell" ref="${key}">
                    ${content}
                  </div>
                `;
              })
              .join("");

            const removeCell = ctx.hasRemoveButtons
              ? `
                <div class="dg-cell dg-actions">
                  <button ref="${key}-removeRow" type="button"
                    class="denhaag-button denhaag-button--danger"
                    aria-label="${removeLabel}">
                    ${removeLabel}
                  </button>
                </div>
              `
              : "";

            return `
              <div class="dg-row" ref="${key}-row" data-row-index="${rowIndex}">
                ${cellsHtml}${removeCell}
              </div>
            `;
          })
          .join("");
      } else {
        // Fallback: use whatever the core already pre-rendered into ctx.rows
        rowsHtml = rowsFromCtx(ctx);
      }

      const topAdd =
        ctx.hasAddButton && ctx.hasTopSubmit
          ? `
            <div class="dg-controls dg-controls--top">
              <button ref="${key}-addRow" type="button"
                class="denhaag-button denhaag-button--primary"
                aria-label="${addLabel}">
                ${addLabel}
              </button>
            </div>
          `
          : "";

      const bottomAdd =
        ctx.hasAddButton && ctx.hasBottomSubmit
          ? `
            <div class="dg-controls dg-controls--bottom">
              <button ref="${key}-addRow" type="button"
                class="denhaag-button denhaag-button--primary"
                aria-label="${addLabel}">
                ${addLabel}
              </button>
            </div>
          `
          : "";

      return `
        <div class="denhaag-datagrid">
          ${topAdd}
          ${headerHtml}
          <div class="dg-body" ref="${key}-tbody" data-key="${key}">
            ${rowsHtml}
          </div>
          ${bottomAdd}
        </div>
      `;
    },
  };

  const denhaagPack = {
    ...base,
    class: "formio-denhaag",
    datagrid: denhaagDatagrid,
  };

  (Templates as any).addTemplates?.({ denhaag: denhaagPack });
  (Templates as any).framework = "denhaag";
  (Templates as any).current = denhaagPack;

  // Optional debug:
  // console.log("✅ Den Haag template pack installed.", {
  //   framework: (Templates as any).framework,
  //   hasDatagrid: !!(Templates as any).current?.datagrid,
  // });
}
