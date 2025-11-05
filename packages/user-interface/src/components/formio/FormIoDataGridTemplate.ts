import { escape } from "lodash-es";
import "./FormIoDataGridTemplate.scss";

const cellToHtml = (cell: any): string => {
  if (!cell) return "";
  if (typeof cell === "string") return cell;
  if (typeof cell === "object") {
    if (typeof cell.markup === "string") return cell.markup;
    if (typeof cell.content === "string") return cell.content;
  }
  return String(cell);
};

export const nlPortalDataGrid = {
  form: (ctx: any) => {
    const datagridKey = ctx.datagridKey;
    const columns = ctx.columns || [];

    const addLabel = escape(ctx.t(ctx.component.addAnother || "Rij toevoegen"));
    const removeLabel = escape(ctx.t(ctx.component.removeRow || "Verwijderen"));

    const renderRow = (rowObj: any, rowIndex: number) => {
      const cellsHtml = columns
        .map((col: any) => {
          const key = col?.key;
          const cellHtml =
            key && rowObj && rowObj[key] != null
              ? cellToHtml(rowObj[key])
              : cellToHtml(Object.values(rowObj || {})[0]);

          return `
                  <div class="nl-portal-formio-datagrid-cell" ref="${datagridKey}">
                    ${cellHtml || ""}
                  </div>
                `;
        })
        .join("");

      const removeButton = ctx.hasRemoveButtons
        ? `
                <footer class="nl-portal-formio-datagrid-row__footer nl-portal-formio-datagrid-actions">
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
                class="nl-portal-formio-datagrid-row"
                ref="${datagridKey}-row"
                data-row-index="${rowIndex}"
                aria-labelledby="${datagridKey}-row-title-${rowIndex + 1}">
                <header class="nl-portal-formio-datagrid-row__header">
                  <h3 id="${datagridKey}-row-title-${rowIndex + 1}" class="nl-portal-formio-datagrid-row__title">
                    ${escape(ctx.t("Item"))} ${rowIndex + 1}
                  </h3>
                </header>
                <div class="nl-portal-formio-datagrid-row__body">
                  ${cellsHtml}
                </div>
                ${removeButton}
              </section>
            `;
    };

    const rows = Array.isArray(ctx.rows) ? ctx.rows : [];
    const rowsHtml = rows.map(renderRow).join("");

    const topAdd =
      ctx.hasAddButton && ctx.hasTopSubmit
        ? `
                <div class="nl-portal-formio-datagrid-controls nl-portal-formio-datagrid-controls--top">
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
                <div class="nl-portal-formio-datagrid-controls nl-portal-formio-datagrid-controls--bottom">
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

    return `
            <div class="nl-portal-formio-datagrid" role="group" aria-label="${escape(
              ctx.component.label || "Data Grid",
            )}">
              ${topAdd}
              <div class="nl-portal-formio-datagrid-body" ref="${datagridKey}-tbody" data-key="${datagridKey}">
                ${rowsHtml}
              </div>
              ${bottomAdd}
            </div>
          `;
  },
};
