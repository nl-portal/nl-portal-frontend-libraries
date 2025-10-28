import { Templates } from "@formio/js";
import { escape } from "lodash-es";
import "./FormIoDataGridTemplate.scss";

export function installDenHaagTemplates() {
  const base =
    (Templates as any).templates?.bootstrap || (Templates as any).current || {};

  const toArray = (v: any): any[] =>
    Array.isArray(v) ? v : v && typeof v === "object" ? Object.values(v) : [];

  const cellToHtml = (cell: any): string => {
    if (!cell) return "";
    if (typeof cell === "string") return cell;
    if (typeof cell === "object") {
      if (typeof cell.markup === "string") return cell.markup;
      if (typeof cell.content === "string") return cell.content;
    }
    return String(cell);
  };

  const rowsFromCtx = (ctx: any, key: string, removeLabel: string): string => {
    const rows = toArray(ctx?.rows);
    if (!rows.length) return "";

    return rows
      .map((row: any, i: number) => {
        const cells = toArray(row);
        const cellsHtml = cells.map(cellToHtml).join("");

        const removeCell = ctx.hasRemoveButtons
          ? `
            <footer class="dg-row__footer dg-actions">
              <button ref="${key}-removeRow" type="button"
                class="denhaag-button denhaag-button--danger removeRow"
                aria-label="${removeLabel}">
                ${removeLabel}
              </button>
            </footer>
          `
          : "";

        return `
          <section class="dg-row" ref="${key}-row" data-row-index="${i}" aria-labelledby="dg-row-title-${i + 1}">
            <header class="dg-row__header">
              <h3 id="dg-row-title-${i + 1}" class="dg-row__title">Item ${i + 1}</h3>
            </header>
            <div class="dg-row__body">
              ${cellsHtml}
            </div>
            ${removeCell}
          </section>
        `;
      })
      .join("");
  };

  const denhaagDatagrid = {
    ...base.datagrid,

    form(ctx: any) {
      const key = ctx.datagridKey;
      const instance = ctx.instance;
      const addLabel = escape(
        ctx.t(ctx.component.addAnother || "Rij toevoegen"),
      );
      const removeLabel = escape(
        ctx.t(ctx.component.removeRow || "Verwijderen"),
      );

      let rowsHtml = "";
      const iRows = toArray(instance?.rows);

      if (iRows.length) {
        rowsHtml = iRows
          .map((row: any, rowIndex: number) => {
            const cols = toArray(row);
            const cellsHtml = cols
              .map((col: any) => {
                col.component.name = `${col.component.key}${rowIndex}`;

                const content =
                  typeof col?.render === "function" ? col.render() : "";

                return `
      <div class="dg-cell" ref="${key}">
        ${content}
      </div>
    `;
              })
              .join("");

            const removeCell = ctx.hasRemoveButtons
              ? `
                <footer class="dg-row__footer dg-actions">
                  <button ref="${key}-removeRow" type="button"
                    class="denhaag-button denhaag-button--danger removeRow"
                    aria-label="${removeLabel}">
                    ${removeLabel}
                  </button>
                </footer>
              `
              : "";

            return `
              <section class="dg-row" ref="${key}-row" data-row-index="${rowIndex}" aria-labelledby="dg-row-title-${rowIndex + 1}">
                <header class="dg-row__header">
                  <h3 id="dg-row-title-${rowIndex + 1}" class="dg-row__title">Item ${rowIndex + 1}</h3>
                </header>
                <div class="dg-row__body">
                  ${cellsHtml}
                </div>
                ${removeCell}
              </section>
            `;
          })
          .join("");
      } else {
        rowsHtml = rowsFromCtx(ctx, key, removeLabel);
      }

      const topAdd =
        ctx.hasAddButton && ctx.hasTopSubmit
          ? `
            <div class="dg-controls dg-controls--top">
              <button ref="${key}-addRow" type="button"
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
              <button ref="${key}-addRow" type="button"
                class="denhaag-button denhaag-button--primary addRow"
                aria-label="${addLabel}">
                ${addLabel}
              </button>
            </div>
          `
          : "";

      return `
        <div class="denhaag-datagrid" role="group" aria-label="${escape(ctx.component.label || "Data Grid")}">
          ${topAdd}
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
}
