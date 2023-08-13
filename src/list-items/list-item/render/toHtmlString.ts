import type { Schema } from '../index.ts'

// /**
//  * Create HTML string from List Item
//  * @param {Schema} li List Item to render
//  * @returns {string} String of HTML representing the List Item
//  */
export const renderToHtmlString = (li: Schema, opts?: { wrap?: boolean }) =>
  `${opts?.wrap ? '<ul>' : ''}<li title="${li.title}">${li.title}</li>${
    opts?.wrap ? '</ul>' : ''
  }`
