// // /* eslint-disable @typescript-eslint/no-explicit-any */
// // // FormIoCustomDataGrid.ts
// // // Keep core DataGrid behavior, only restyle/replace Add/Remove buttons after attach/redraw.

// // import { Components } from '@formio/js'; // IMPORTANT: use formiojs registry, not @formio/react
// // import { escape } from 'lodash-es';

// // const CoreDataGrid: any = (Components as any).components.datagrid;

// // export default class FormioCustomDataGrid extends CoreDataGrid {
// //   /** Global override of the core datagrid. Call once at app startup (before any <Form/> mounts). */
// //   static register(key = 'datagrid') {
// //     (Components as any).addComponent(key, FormioCustomDataGrid);
// //   }

// //   static schema(...extend: any[]) {
// //     return CoreDataGrid.schema(...extend);
// //   }

// //   static get builderInfo() {
// //     return {
// //       ...CoreDataGrid.builderInfo,
// //       title: 'Data Grid',
// //       schema: FormioCustomDataGrid.schema(),
// //     };
// //   }

// //   /** All rendering stays core; we only decorate after the DOM is attached. */
// //   attach(element: any) {
// //     const el = super.attach(element);
// //     this.decorate(); // first pass right after initial attach
// //     return el;
// //   }

// //   /** After any redraw, re-apply decorations because Form.io re-renders parts of the DOM. */
// //   redraw() {
// //     return super.redraw().then((el: any) => {
// //       this.decorate();
// //       return el;
// //     });
// //   }

// //   // ---- Helpers -------------------------------------------------------------

// //   private decorate() {
// //     try {
// //       this.decorateRemoveButtons();
// //       this.decorateAddButtons();
// //       this.removeDefaultTfoot(); // optional: hide/delete default <tfoot> with Bootstrap add button
// //     } catch (e) {
// //       // eslint-disable-next-line no-console
// //       console.warn('[FormioCustomDataGrid] decorate failed:', e);
// //     }
// //   }

// //   private decorateAddButtons() {
// //     const addRefs = this.refs?.[`${this.datagridKey}-addRow`] || [];
// //     const addLabel = this.t(this.component.addAnother || 'Rij toevoegen');

// //     addRefs.forEach((btn: HTMLButtonElement) => {
// //       // your classes
// //       btn.className = 'nlds-button nlds-button-primary nlds-icon-left';
// //       // your content (icon + label). Use your own SVG/icon system if needed.
// //       btn.innerHTML = `
// //         <svg class="icon icon-plus" width="16" height="16" aria-hidden="true" focusable="false">
// //           <use href="#icon-plus"></use>
// //         </svg>
// //         ${escape(addLabel)}
// //       `;
// //       // optional ARIA
// //       btn.setAttribute('aria-label', addLabel);
// //     });
// //   }

// //   private decorateRemoveButtons() {
// //     const removeRefs = this.refs?.[`${this.datagridKey}-removeRow`] || [];
// //     const removeLabel = this.t(this.component.removeRow || 'Verwijderen');

// //     removeRefs.forEach((btn: HTMLButtonElement) => {
// //       btn.className = 'nlds-button nlds-button-danger nlds-icon-left';
// //       btn.innerHTML = `
// //         <svg class="icon icon-trash" width="16" height="16" aria-hidden="true" focusable="false">
// //           <use href="#icon-trash"></use>
// //         </svg>
// //         ${escape(removeLabel)}
// //       `;
// //       btn.setAttribute('aria-label', removeLabel);
// //       // If you want just an icon (no text), comment the ${escape(removeLabel)} part.
// //     });
// //   }

// //   private removeDefaultTfoot() {
// //     // The core Bootstrap template renders a <tfoot> with the default add button.
// //     // If you don’t want it, hide or remove it here.
// //     // We’ll just remove it to avoid duplicate add buttons.
// //     const tbodies = this.refs?.[`${this.datagridKey}-tbody`] ? [this.refs[`${this.datagridKey}-tbody`]] : [];
// //     tbodies.forEach((tbody: HTMLElement | null) => {
// //       if (!tbody) return;
// //       const table = tbody.closest('table');
// //       const tfoot = table?.querySelector('tfoot');
// //       if (tfoot && tfoot.parentElement) {
// //         tfoot.parentElement.removeChild(tfoot);
// //       }
// //     });
// //   }
// // }

// // ===================================================================

// // /* eslint-disable @typescript-eslint/no-explicit-any */
// // // FormioDataGrid.ts
// // // Keep core DataGrid; restyle Add/Remove buttons after attach/redraw.

// // import { Components } from "@formio/js";
// // import { escape } from "lodash-es";

// // const CoreDataGrid: any = (Components as any).components.datagrid;

// // export default class FormioCustomDataGrid extends CoreDataGrid {
// //   /** Call once at app startup (before any <Form/> mounts). */
// //   static register(key = "datagrid") {
// //     (Components as any).addComponent(key, FormioCustomDataGrid);
// //   }

// //   static schema(...extend: any[]) {
// //     return CoreDataGrid.schema(...extend);
// //   }

// //   static get builderInfo() {
// //     return {
// //       ...CoreDataGrid.builderInfo,
// //       title: "Data Grid",
// //       schema: FormioCustomDataGrid.schema(),
// //     };
// //   }

// //   /** Leave core rendering intact; decorate after DOM is attached. */
// //   attach(element: any) {
// //     const el = super.attach(element);
// //     this.decorate();
// //     return el;
// //   }

// //   /** After any redraw, re-apply decorations because Form.io re-renders parts of the DOM. */
// //   redraw() {
// //     return super.redraw().then((el: any) => {
// //       this.decorate();
// //       return el;
// //     });
// //   }

// //   // ---- Decorations ---------------------------------------------------------

// //   private decorate() {
// //     try {
// //       this.decorateAddButtons();
// //       this.decorateRemoveButtons();
// //       // IMPORTANT: do NOT remove <tfoot>. That's where the Add button lives.
// //     } catch (e) {
// //       // eslint-disable-next-line no-console
// //       console.warn("[FormioCustomDataGrid] decorate failed:", e);
// //     }
// //   }

// //   private decorateAddButtons() {
// //     // Core exposes all add buttons under this ref key (top/bottom/both).
// //     const addRefs: HTMLButtonElement[] = (this.refs?.[
// //       `${this.datagridKey}-addRow`
// //     ] || []) as any[];
// //     if (!addRefs.length) return;

// //     const addLabel = this.t(this.component.addAnother || "Rij toevoegen");

// //     addRefs.forEach((btn) => {
// //       // Replace classes & content with your design system
// //       btn.className = "denhaag-button denhaag-button--primary";
// //       btn.setAttribute("aria-label", addLabel);
// //       btn.innerHTML = `
// //         <svg class="icon icon-plus" width="16" height="16" aria-hidden="true" focusable="false">
// //           <use href="#icon-plus"></use>
// //         </svg>
// //         ${escape(addLabel)}
// //       `;
// //     });
// //   }

// //   private decorateRemoveButtons() {
// //     const removeRefs: HTMLButtonElement[] = (this.refs?.[
// //       `${this.datagridKey}-removeRow`
// //     ] || []) as any[];
// //     if (!removeRefs.length) return;

// //     const removeLabel = this.t(this.component.removeRow || "Verwijderen");

// //     removeRefs.forEach((btn) => {
// //       btn.className = "denhaag-button denhaag-button--danger";
// //       btn.setAttribute("aria-label", removeLabel);
// //       btn.innerHTML = `
// //         <svg class="icon icon-trash" width="16" height="16" aria-hidden="true" focusable="false">
// //           <use href="#icon-trash"></use>
// //         </svg>
// //         ${escape(removeLabel)}
// //       `;
// //     });
// //   }
// // }

// /* eslint-disable @typescript-eslint/no-explicit-any */
// // FormioCustomDataGrid.ts - div-based datagrid with custom buttons.
// // Works with @formio/js (latest formiojs runtime).

// import { Components } from "@formio/js";
// import Component from '@formio/js/components/_classes/component/Component';
// import { escape } from "lodash-es";

// const CoreDataGrid: any = (Components as any).components.datagrid;

// export default class FormioCustomDataGrid extends CoreDataGrid {
//   static register(key = "datagrid") {
//     (Components as any).addComponent(key, FormioCustomDataGrid);
//   }

//   static schema(...extend: any[]) {
//     return CoreDataGrid.schema(...extend);
//   }

//   static get builderInfo() {
//     return {
//       ...CoreDataGrid.builderInfo,
//       title: "Data Grid",
//       schema: FormioCustomDataGrid.schema(),
//     };
//   }

//   // ---------- CUSTOM RENDER (no table) --------------------------------------
//   render() {
//     // Ensure rows exist (mirrors core’s first render path)
//     if (!this.rows || !this.rows.length) {
//       this.createRows(true);
//     }

//     const columns = this.getColumns();
//     const addLabel = this.t(this.component.addAnother || "Rij toevoegen");
//     const removeLabel = this.t(this.component.removeRow || "Verwijderen");

//     const rowsHtml = this.rows
//       .map(
//         () => `
//       <div class="dg-row" ref="${this.datagridKey}-row">
//         ${columns
//           .map(
//             () =>
//               `<div class="dg-cell"><div ref="${this.datagridKey}"></div></div>`,
//           )
//           .join("")}
//         <div class="dg-actions">
//           <button ref="${this.datagridKey}-removeRow" type="button"
//             class="denhaag-button denhaag-button--danger"
//             aria-label="${escape(removeLabel)}">
//             ${escape(removeLabel)}
//           </button>
//         </div>
//       </div>
//     `,
//       )
//       .join("");

//     const inner = `
//       <div class="denhaag-datagrid">
//         <div class="dg-body" ref="${this.datagridKey}-tbody" data-key="${escape(this.datagridKey)}">
//           ${rowsHtml}
//         </div>
//         <div class="dg-footer">
//           <button ref="${this.datagridKey}-addRow" type="button"
//             class="denhaag-button denhaag-button--primary"
//             aria-label="${escape(addLabel)}">
//             ${escape(addLabel)}
//           </button>
//         </div>
//       </div>
//     `;

//     // ✅ Wrap with BaseComponent’s standard wrapper (label, errors, etc.)
//     return Component.prototype.render.call(this, inner);
//   }

//   // ---------- CUSTOM ATTACH --------------------------------------------------
//   attach(element: any) {
//     // ✅ Let BaseComponent do its generic setup (labels, message container, tooltip, etc.)
//     const el = Component.prototype.attach.call(this, element);

//     // Collect our custom refs
//     this.loadRefs(el, {
//       [`${this.datagridKey}-row`]: "multiple",
//       [`${this.datagridKey}-tbody`]: "single",
//       [`${this.datagridKey}-addRow`]: "multiple",
//       [`${this.datagridKey}-removeRow`]: "multiple",
//       [this.datagridKey]: "multiple",
//     });

//     // Wire add
//     (this.refs[`${this.datagridKey}-addRow`] || []).forEach(
//       (btn: HTMLElement) => {
//         this.addEventListener(btn, "click", this.addRow.bind(this));
//       },
//     );

//     // Wire remove (row index == button index in DOM order)
//     (this.refs[`${this.datagridKey}-removeRow`] || []).forEach(
//       (btn: HTMLElement, index: number) => {
//         this.addEventListener(btn, "click", this.removeRow.bind(this, index));
//       },
//     );

//     // Mount child components into each cell
//     const columns = this.getColumns();
//     const rowLen = columns.length;

//     this.rows.forEach((row: any, rowIndex: number) => {
//       columns.forEach((col: any, colIndex: number) => {
//         const cellHost =
//           this.refs[this.datagridKey][rowIndex * rowLen + colIndex];
//         const child = this.rows[rowIndex][col.key];
//         // Attach that single child into the cell
//         this.attachComponents(cellHost, [child], this.getComponentsContainer());
//       });
//     });

//     // Optional: add any final decoration pass
//     this.decorateButtons?.();

//     return el;
//   }

//   // Ensure we remount after any redraw (Form.io re-creates the DOM)
//   redraw() {
//     return super.redraw().then((el: any) => {
//       // BaseComponent.attach will be called again via our override,
//       // so children get re-mounted. If your environment doesn’t, you can:
//       // this.attach(this.element);
//       this.decorateButtons?.();
//       return el;
//     });
//   }

//   // ---------- Optional helpers (styling passes) -----------------------------
//   private decorateButtons() {
//     // You already print your own button classes/content in render(),
//     // but if you want to enforce classes again after redraw:
//     const addRefs = this.refs?.[`${this.datagridKey}-addRow`] || [];
//     const removeRefs = this.refs?.[`${this.datagridKey}-removeRow`] || [];

//     addRefs.forEach((btn: HTMLButtonElement) => {
//       btn.classList.add("denhaag-button", "denhaag-button--primary");
//     });
//     removeRefs.forEach((btn: HTMLButtonElement) => {
//       btn.classList.add("denhaag-button", "denhaag-button--danger");
//     });
//   }
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
// CustomDivDataGrid.ts
// Works with @formio/js. Renders a div-based grid and manually attaches row children.

import { Components } from "@formio/js";
import { escape } from "lodash-es";

const CoreDataGrid: any = (Components as any).components.datagrid;

export default class CustomDivDataGrid extends CoreDataGrid {
  static register(key = "datagrid") {
    (Components as any).addComponent(key, CustomDivDataGrid);
  }

  static schema(...extend: any[]) {
    return CoreDataGrid.schema(...extend);
  }

  static get builderInfo() {
    return {
      ...CoreDataGrid.builderInfo,
      title: "Data Grid",
      schema: CustomDivDataGrid.schema(),
    };
  }

  /** Render a div-based layout with the refs the core APIs expect. */
  render() {
    const columns = this.getColumns();
    const key = this.datagridKey;
    const hasHeader = this.hasHeader();
    const hasRemove = this.hasRemoveButtons();
    const hasTopSubmit = this.hasTopSubmit();
    const hasBottomSubmit = this.hasBottomSubmit();

    const addLabel = escape(
      this.t(this.component.addAnother || "Rij toevoegen"),
    );
    const removeLabel = escape(
      this.t(this.component.removeRow || "Verwijderen"),
    );

    const headerHtml = hasHeader
      ? `
        <div class="dg-header">
          ${columns.map((c: any) => `<div class="dg-colheader">${escape(c.label || c.title || "")}</div>`).join("")}
          ${hasRemove ? `<div class="dg-colheader dg-colheader--actions"></div>` : ""}
        </div>
      `
      : "";

    // We don’t try to render child components here; we only put placeholders with the right refs.
    const rowsHtml = this.rows
      .map(
        () => `
      <div class="dg-row" ref="${key}-row">
        ${columns.map(() => `<div class="dg-cell"><div ref="${key}"></div></div>`).join("")}
        ${
          hasRemove
            ? `
          <div class="dg-cell dg-actions">
            <button ref="${key}-removeRow" type="button" class="denhaag-button denhaag-button--danger" aria-label="${removeLabel}">
              ${removeLabel}
            </button>
          </div>`
            : ""
        }
      </div>
    `,
      )
      .join("");

    const topAdd =
      this.hasAddButton() && hasTopSubmit
        ? `<div class="dg-controls dg-controls--top">
           <button ref="${key}-addRow" type="button" class="denhaag-button denhaag-button--primary" aria-label="${addLabel}">
             ${addLabel}
           </button>
         </div>`
        : "";

    const bottomAdd =
      this.hasAddButton() && hasBottomSubmit
        ? `<div class="dg-controls dg-controls--bottom">
           <button ref="${key}-addRow" type="button" class="denhaag-button denhaag-button--primary" aria-label="${addLabel}">
             ${addLabel}
           </button>
         </div>`
        : "";

    const html = `
      <div class="denhaag-datagrid">
        ${topAdd}
        ${headerHtml}
        <div class="dg-body" ref="${key}-tbody" data-key="${key}">
          ${rowsHtml}
        </div>
        ${bottomAdd}
      </div>
    `;

    // Important: let BaseComponent wrap our html (label, errors, etc.)
    const BaseProto = Object.getPrototypeOf(Object.getPrototypeOf(this));
    return BaseProto.render.call(this, html);
  }

  /** After the DOM exists, mount the row components into our cell placeholders. */
  attach(element: any) {
    const el = super.attach(element);
    this.attachRowChildren();
    return el;
  }

  /** Re-run after any redraw (add/remove row, conditionals, etc.). */
  redraw() {
    return super.redraw().then((el: any) => {
      this.attachRowChildren();
      return el;
    });
  }

  /** Mount each row’s child components into the <div ref="${datagridKey}"> cells. */
  private attachRowChildren() {
    const key = this.datagridKey;
    const columns = this.getColumns();

    // For each visible row
    const rowEls: HTMLElement[] = (this.refs?.[`${key}-row`] || []) as any;
    rowEls.forEach((rowEl, rowIndex) => {
      // Find all cell targets for this row
      const cellTargets = Array.from(
        rowEl.querySelectorAll(`[ref="${key}"]`),
      ) as HTMLElement[];

      // Ensure we have a component instance per column in this row.
      // this.getComponents(rowIndex) returns component instances for that row in order.
      const rowComps = this.getComponents(rowIndex);

      // If core hasn’t created them yet (very early render), create & add them.
      if (!rowComps || rowComps.length < columns.length) {
        // Create row components from component JSON
        const newRowComps = columns.map((_col: any, colIndex: number) => {
          const compJson = this.component.components[colIndex];
          const child = this.createComponent(compJson, {});
          return child;
        });

        // Attach each component to its cell
        newRowComps.forEach((child: any, colIndex: any) => {
          const cell = cellTargets[colIndex];
          if (cell) {
            this.attachComponents(cell, [child]);
          }
        });

        // Persist them onto the internal row so subsequent redraws reuse instances
        if (!this.rows[rowIndex])
          this.rows[rowIndex] = { components: [] } as any;
        (this.rows[rowIndex] as any).components = newRowComps;
      } else {
        // We already have instances for this row → just (re)attach them to our cells.
        rowComps.forEach((child: any, colIndex: number) => {
          const cell = cellTargets[colIndex];
          if (cell && !cell.contains(child.getElement())) {
            this.attachComponents(cell, [child]);
          }
        });
      }
    });
  }
}
