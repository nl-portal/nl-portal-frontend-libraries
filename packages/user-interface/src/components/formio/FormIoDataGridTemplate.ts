import { Templates } from "@formio/js";
import { escape } from "lodash-es";
import "./FormIoDataGridTemplate.scss";

export function installDenHaagTemplates() {
  const base =
    (Templates as any).templates?.bootstrap || (Templates as any).current || {};

  // // Helper: safely coerce to array
  // const toArray = (v: any): any[] =>
  //   Array.isArray(v) ? v : v && typeof v === "object" ? Object.values(v) : [];

  // Helper: get a cell's HTML string (already rendered by Form.io)
  const cellToHtml = (cell: any): string => {
    if (!cell) return "";
    if (typeof cell === "string") return cell;
    if (typeof cell === "object") {
      if (typeof cell.markup === "string") return cell.markup;
      if (typeof cell.content === "string") return cell.content;
    }
    return String(cell);
  };

  const denhaagDatagrid = {
    ...base.datagrid,

    /**
     * IMPORTANT:
     * - We DO include per-cell child HTML from ctx.rows (pre-rendered by Form.io).
     * - We wrap each cell with a single placeholder element having ref="${datagridKey}".
     *   DataGrid.attach() expects exactly one such ref per visible column per row.
     * - We do NOT call col.render() here, and we do NOT mutate child components.
     */
    form(ctx: any) {
      const datagridKey = ctx.datagridKey; // e.g. "datagrid-undefinedDataGrid"
      const columns = ctx.columns || []; // visible columns in order

      const addLabel = escape(
        ctx.t(ctx.component.addAnother || "Rij toevoegen"),
      );
      const removeLabel = escape(
        ctx.t(ctx.component.removeRow || "Verwijderen"),
      );

      // Build one card-style row from a ctx.rows entry (object with column keys)
      const renderRow = (rowObj: any, rowIndex: number) => {
        // For each visible column, pull the pre-rendered child HTML
        const cellsHtml = columns
          .map((col: any) => {
            const key = col?.key;
            console.log("col", col);
            const cellHtml =
              key && rowObj && rowObj[key] != null
                ? cellToHtml(rowObj[key])
                : cellToHtml(Object.values(rowObj || {})[0]);

            // SINGLE placeholder with the correct ref, enclosing the child HTML.
            // This lets DataGrid.attach() find placeholders and attach components
            // at (rowIndex * rowLength + colIndex).
            return `
              <div class="dg-cell" ref="${datagridKey}">
                ${cellHtml || ""}
              </div>
            `;
          })
          .join("");

        const removeButton = ctx.hasRemoveButtons
          ? `
            <footer class="dg-row__footer dg-actions">
              <button
                ref="${datagridKey}-removeRow"
                type="button"
                class="denhaag-button denhaag-button--danger removeRow"
                aria-label="${removeLabel}">
                ${removeLabel}
              </button>
            </footer>
          `
          : "";

        return `
          <section
            class="dg-row"
            ref="${datagridKey}-row"
            data-row-index="${rowIndex}"
            aria-labelledby="${datagridKey}-row-title-${rowIndex + 1}">
            <header class="dg-row__header">
              <h3 id="${datagridKey}-row-title-${rowIndex + 1}" class="dg-row__title">
                ${escape(ctx.t("Item"))} ${rowIndex + 1}
              </h3>
            </header>
            <div class="dg-row__body">
              ${cellsHtml}
            </div>
            ${removeButton}
          </section>
        `;
      };

      // Use ctx.rows (array of objects with pre-rendered child HTML per column key)
      const rows = Array.isArray(ctx.rows) ? ctx.rows : [];
      const rowsHtml = rows.map(renderRow).join("");

      const topAdd =
        ctx.hasAddButton && ctx.hasTopSubmit
          ? `
            <div class="dg-controls dg-controls--top">
              <button
                ref="${datagridKey}-addRow"
                type="button"
                class="denhaag-button denhaag-button--primary addRow"
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
              <button
                ref="${datagridKey}-addRow"
                type="button"
                class="denhaag-button denhaag-button--primary addRow"
                aria-label="${addLabel}">
                ${addLabel}
              </button>
            </div>
          `
          : "";

      // tbody MUST match what DataGrid.attach() loads with loadRefs()
      return `
        <div class="denhaag-datagrid" role="group" aria-label="${escape(
          ctx.component.label || "Data Grid",
        )}">
          ${topAdd}
          <div class="dg-body" ref="${datagridKey}-tbody" data-key="${datagridKey}">
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
}
