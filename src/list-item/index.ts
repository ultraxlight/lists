import Ajv from "ajv"
import schema from './schema.json'

const ajv = new Ajv()

export interface Schema {
  id: string,
  title: string,
}

export const isValid = ajv.compile(schema)
