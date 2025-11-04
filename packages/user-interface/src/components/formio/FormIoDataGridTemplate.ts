import { Templates } from "@formio/js";
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

const renderDataGrid = (ctx: any) => {
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
};

Templates.templates["denhaag"] = Templates.templates["denhaag"] || {};

// Belangrijk: sommige builds roepen voor textarea tóch 'input' aan.
// Daarom laten we 'input' conditioneel kiezen.
Templates.templates["denhaag"].datagrid = {
  form: (ctx: any) => renderDataGrid(ctx),
};

// (Je button-template laat je zoals die was)
// Activeer bij voorkeur via een naam:
Templates.current = "denhaag";


//   // Helpers (zelfde als bij je input)
// const escapeHtml = (v: any) =>
//   String(v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

// const escapeAttr = (v: any) =>
//   String(v).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

// function serializeAttrs(attr: any, extras: Record<string, any>, omitKeys: string[] = []) {
//   if (typeof attr === 'string') {
//     const toAdd = Object.entries(extras)
//       .filter(([k, v]) =>
//         v !== false && v != null &&
//         !omitKeys.includes(k) &&
//         !attr.includes(`${k}=`) &&
//         !(k === 'class' && attr.includes('class='))
//       )
//       .map(([k, v]) => (v === true ? k : `${k}="${escapeAttr(v)}"`))
//       .join(' ');
//     return (attr + (toAdd ? ' ' + toAdd : '')).trim();
//   }
//   const merged = { ...(extras || {}), ...(attr || {}) }; // Form.io wint
//   omitKeys.forEach(k => { if (k in merged) delete (merged as any)[k]; });
//   return Object.entries(merged)
//     .filter(([_, v]) => v !== false && v != null)
//     .map(([k, v]) => (v === true ? k : `${k}="${escapeAttr(v)}"`))
//     .join(' ');
// }

//   Templates.current = {
//     button: {
//       form: (ctx: any) => `
//       <button
//         ref="button"
//         type="${ctx.component.action === "submit" ? "submit" : "button"}"
//         class="denhaag-button"
//         ${ctx.disabled ? "disabled" : ""}
//       >
//         <span class="denhaag-button__label">
//           ${ctx.t(ctx.component.label || "Button")}
//         </span>
//       </button>
//     `,
//     },
//     input: {
//       form: (ctx: any) => {
//         // ---------- helpers ----------
//         const escapeAttr = (v: any) =>
//           String(v)
//             .replace(/&/g, "&amp;")
//             .replace(/"/g, "&quot;")
//             .replace(/</g, "&lt;")
//             .replace(/>/g, "&gt;");

//         const serializeAttrs = (attr: any, extra: Record<string, any>) => {
//           // attr kan string (sommige builds) of object (jouw build) zijn
//           if (typeof attr === "string") {
//             // voeg alleen extra toe die NIET al in de string zitten
//             const toAdd = Object.entries(extra)
//               .filter(
//                 ([k, v]) => v !== false && v != null && !attr.includes(`${k}=`),
//               )
//               .map(([k, v]) => (v === true ? k : `${k}="${escapeAttr(v)}"`))
//               .join(" ");
//             return (attr + (toAdd ? " " + toAdd : "")).trim();
//           }
//           const merged = { ...(extra || {}), ...(attr || {}) }; // Form.io attr wint
//           return Object.entries(merged)
//             .filter(([_, v]) => v !== false && v != null)
//             .map(([k, v]) => (v === true ? k : `${k}="${escapeAttr(v)}"`))
//             .join(" ");
//         };

//         // ---------- data uit ctx ----------
//         const fallbackId = ctx.instance?.id || ctx.component.key || "textfield";
//         const inputId = ctx.input?.id || fallbackId;

//         const label = ctx.t(ctx.component.label || "");
//         const description = ctx.t(ctx.component.description || "");
//         const placeholder = ctx.t(ctx.component.placeholder || "");
//         const hasErrors = Array.isArray(ctx.errors) && ctx.errors.length > 0;

//         // Utrecht classes + invalid state
//         const wrapperClass = `utrecht-form-field utrecht-form-field--text${hasErrors ? " utrecht-form-field--invalid" : ""}`;
//         const utrechtBaseInputClass = `utrecht-textbox utrecht-textbox--html-input${hasErrors ? " utrecht-textbox--invalid" : ""}`;

//         // class samenstellen: Utrecht class + eventuele class uit attr
//         const attrObj =
//           typeof ctx.input?.attr === "object" ? ctx.input.attr || {} : {};
//         const combinedClass = [utrechtBaseInputClass, attrObj.class]
//           .filter(Boolean)
//           .join(" ");
//         // class mag niet dubbel in attr-string, dus we geven 'm als extra en halen 'class' uit attrObj weg
//         if (attrObj.class) delete attrObj.class;

//         // A11y error-koppeling
//         const errorId = `err-${inputId}`;
//         const needsDescribedBy =
//           hasErrors &&
//           !(
//             (typeof ctx.input?.attr === "string" &&
//               ctx.input.attr.includes("aria-describedby")) ||
//             (typeof ctx.input?.attr === "object" &&
//               ctx.input.attr?.["aria-describedby"])
//           );

//         // Extra basisattrs die we zeker willen hebben (maar Form.io attr wint)
//         const extra = {
//           id: inputId,
//           name: ctx.input?.name || `data[${ctx.component.key}]`,
//           type: ctx.input?.type || ctx.component.inputType || "text",
//           dir: "auto",
//           placeholder,
//           required: !!ctx.component.validate?.required || undefined,
//           disabled: !!ctx.disabled || undefined,
//           "aria-describedby": needsDescribedBy ? errorId : undefined,
//           class: combinedClass,
//         };

//         const inputAttributes = serializeAttrs(ctx.input?.attr, extra);

//         return `
//         <div class="${wrapperClass}" ref="element">
//           ${
//             ctx.component.label !== false
//               ? `<label for="${inputId}" class="utrecht-form-label" ref="label">${label}</label>`
//               : ""
//           }

//           ${
//             description
//               ? `<div class="utrecht-form-field-description">${description}</div>`
//               : ""
//           }

//           <label class="pra-textbox" for="${inputId}">
//             <input ref="input" ${inputAttributes} />
//           </label>

//           <div class="utrecht-form-field-error-message" id="${errorId}" ref="messageContainer">
//             ${hasErrors ? ctx.errors.join("<br>") : ""}
//           </div>
//         </div>
//       `;
//       },
//     },
//     textarea: {
//       form: (ctx: any) => {
//         const fallbackId = ctx.instance?.id || ctx.component.key || "textarea";
//         const inputId = ctx.input?.id || fallbackId;

//         const hasErrors = Array.isArray(ctx.errors) && ctx.errors.length > 0;

//         // Wrapper + textarea classes (pas zo nodig aan naar exacte DS-classnames)
//         const wrapperClass = `utrecht-form-field utrecht-form-field--text${hasErrors ? " utrecht-form-field--invalid" : ""}`;
//         const baseClass = `utrecht-textbox utrecht-textbox--html-textarea${hasErrors ? " utrecht-textbox--invalid" : ""}`;

//         // Combineer met class uit attr (object-builds)
//         const attrObj =
//           typeof ctx.input?.attr === "object" ? ctx.input.attr || {} : {};
//         const combinedClass = [baseClass, attrObj.class]
//           .filter(Boolean)
//           .join(" ");
//         if (attrObj.class) delete attrObj.class;

//         const labelText = ctx.t(ctx.component.label || "");
//         const description = ctx.t(ctx.component.description || "");
//         const placeholder = ctx.t(ctx.component.placeholder || "");

//         // Prefillwaarde uit attr (object of string) -> content van <textarea>
//         const valueFromAttr =
//           typeof ctx.input?.attr === "object"
//             ? (ctx.input.attr?.value ?? "")
//             : typeof ctx.input?.attr === "string"
//               ? (ctx.input.attr.match(/\bvalue="([^"]*)"/)?.[1] ?? "")
//               : "";

//         // A11y error-koppeling
//         const errorId = `err-${inputId}`;
//         const needsDescribedBy =
//           hasErrors &&
//           !(
//             (typeof ctx.input?.attr === "string" &&
//               ctx.input.attr.includes("aria-describedby")) ||
//             (typeof ctx.input?.attr === "object" &&
//               ctx.input.attr?.["aria-describedby"])
//           );

//         // Extras: alleen aanvullen wat nog niet in attr zit
//         const extras = {
//           id: inputId,
//           name: ctx.input?.name || `data[${ctx.component.key}]`,
//           dir: "auto",
//           placeholder,
//           required: !!ctx.component.validate?.required || undefined,
//           disabled: !!ctx.disabled || undefined, // => disabled-variant
//           class: combinedClass,
//           "aria-describedby": needsDescribedBy ? errorId : undefined,
//           rows: ctx.component.rows || undefined,
//           cols: ctx.component.cols || undefined,
//           // géén value attribuut bij textarea
//         };

//         const textareaAttributes = serializeAttrs(ctx.input?.attr, extras, [
//           "value",
//         ]);

//         return `
//           <div class="${wrapperClass}" ref="element">
//             ${
//               ctx.component.label !== false
//                 ? `<label for="${inputId}" class="utrecht-form-label" ref="label">${labelText}</label>`
//                 : ""
//             }

//             ${description ? `<div class="utrecht-form-field-description">${description}</div>` : ""}

//             <label class="pra-textbox" for="${inputId}">
//               <textarea ref="input" ${textareaAttributes}>${escapeHtml(valueFromAttr)}</textarea>
//             </label>

//             <div class="utrecht-form-field-error-message" id="${errorId}" ref="messageContainer">
//               ${hasErrors ? ctx.errors.join("<br>") : ""}
//             </div>
//           </div>
//         `;
//       },
//     },
//   };

// Activeer jouw template set
//Templates.current = "denhaag";
// }
