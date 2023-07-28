import { Schema, HydratedDocument, model, Model, Types } from 'mongoose'

import { PersonInput } from '../schemas/Person.schema.js'
import { CrudPermissions } from '../helpers/permissionsCreator.js'

export interface Person extends PersonInput {
  createdBy: Types.ObjectId
}

export type PersonDocument = HydratedDocument<Person>

export const PersonPermissions = new CrudPermissions('person')

const personSchema = new Schema<Person>(
  {
    name: {
      type: String,
      required: true
    },
    nationalId: {
      type: String,
      // Must be 14 numbers
      validate: {
        validator: (v: string) => /^\d{14}$/.test(v)
      },
      required: true,
      unique: true
    },
    status: {
      type: String
    },
    notes: {
      type: String,
      required: false
    },
    DateOfTalab: {
      type: Date,
      required: true
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user'
    }
  },
  {
    timestamps: true,
    collection: 'person'
  }
)

export const PersonModel = model<PersonDocument, Model<PersonDocument>>(
  'person',
  personSchema
)
