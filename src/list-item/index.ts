import Ajv from 'https://esm.sh/ajv@8.6.1'
import schema from './schema.json' assert { type: 'json' }

const ajv = new Ajv()

export interface Schema {
  id: string
  title: string
}

/**
 * Validate an object
 * @param {object} Object to validate
 * @return {Boolean} Whether or not the object passes validation
 */
export const isValid = ajv.compile(schema)

// /**
//  * Create CSV string from List Item
//  * @param {Schema} li List Item to render
//  * @returns {string} String of CSV representing the List Item
//  */
// export const renderToCsvString = (li: Schema) => `${li.id},${li.title}\n`

// /**
//  * Create HTML string from List Item
//  * @param {Schema} li List Item to render
//  * @returns {string} String of HTML representing the List Item
//  */
// export const renderToHtmlString = (li: Schema) => `<li title="${li.title}">${li.title}</li>`

// /**
//  * Create string from List Item
//  * @param {Schema} li List Item to render
//  * @returns {string} String representing the List Item
//  */
//  export const renderToString = (li: Schema) => `* ${li.title}`

//  /**
//  * Create HTML element from List Item
//  * @param {Document} document Browser document
//  * @param {Schema} li List Item to render
//  * @returns {HTMLElement} `<li />` representing the List Item
//  */
//  export const renderToHtml = (document: Document, li: Schema) => {
//   const elm = document.createElement('LI')
//   elm.setAttribute('title', li.title)
//   elm.innerText = li.title

//   return elm
//  }
