import type { Schema } from '../validation.ts'

// /**
//  * Create HTML string from List Item
//  * @param {Schema} li List Item to render
//  * @returns {string} String of HTML representing the List Item
//  */
export const renderToHtmlString = (
  li: Schema,
  // XXX Should be {wrap: true, delete: {onclick: string, ...other attrs}, edit: { onclick: string, ...other attrs}}
  opts?: { wrap?: boolean; deleteCallback: string }
) => {
  // console.log(li, opts)
  const deleteUi = opts?.deleteCallback
    ? `<button type="button" onclick="${opts.deleteCallback}">X</button>`
    : ''
  const mainElm = `<li title="${li.title}">${li.title}${deleteUi}</li>`

  return (opts?.wrap ? '<ul>' : '') + mainElm + (opts?.wrap ? '</ul>' : '')
}
