import Ajv from 'https://esm.sh/ajv@8.6.1'
import Storage from 'https://denopkg.com/ultraxlight/storage@main/src/local-storage.ts'
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

export default Storage