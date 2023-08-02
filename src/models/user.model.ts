import { Schema, HydratedDocument, model, Model, Types } from 'mongoose'
import {
  AppPermissionsValues,
  IAppPermissionsValues
} from './permissions.entity.js'
import { CrudPermissions } from '../helpers/permissionsCreator.js'
import { UserInput } from '../schemas/User.schema.js'
import { Roles } from './roles.entity.js'
import { ValueOf } from '../types/helper.types.js'

export const UserPermissions = new CrudPermissions('user')

export interface User extends UserInput {
  createdBy: Types.ObjectId
  roles: ValueOf<typeof Roles>[]
  permissions: [IAppPermissionsValues]
}

export type UserDocument = HydratedDocument<
  User & { createdAt: Date; updatedAt: Date }
>

const UserSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true
    },
    username: {
      type: String,
      unique: true,
      index: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    roles: {
      type: [String],
      enum: Object.values(Roles),
      required: true
    },
    permissions: {
      type: [String],
      enum: AppPermissionsValues,
      required: true
    },
    active: {
      type: Boolean,
      required: true
    },
    notes: {
      type: String,
      required: false
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user'
    }
  },
  { timestamps: true }
)

export const UserModel = model<UserDocument, Model<UserDocument>>(
  'user',
  UserSchema
)
