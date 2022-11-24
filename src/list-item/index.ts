import Ajv from 'ajv'
import schema from './schema.json'

const ajv = new Ajv()

export interface Schema {
  id: string
  title: string
}

/**
 * Validate an object
 * @param {object} - Object to validate
 * @return {Boolean} - Whether or not the object passes validation
 */
export const isValid = ajv.compile(schema)
