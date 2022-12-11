import Ajv from 'ajv'
import {v4 as uuid} from 'uuid'
import schema from './schema.json'

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

/**
 * Create List Item
 * @param {string} title Main List Item content
 * @returns {Schema} List Item object
 */
export const create = (title: string = ''): Schema => ({id: uuid(), title})

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