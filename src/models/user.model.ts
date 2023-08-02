import { Schema, HydratedDocument, model, Model, Types } from 'mongoose'
import { AppPermissionsValues, IAppPermissionsValues } from './'
import { UserInput } from '../schemas/User.schema'
import { Roles } from './roles.entity'
import { ValueOf } from '../types/helper.types'

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
      default: true
    },
    notes: {
      type: String,
      required: false
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      // required: true,
      ref: 'user'
    }
  },
  { timestamps: true }
)

const UserModel = model<UserDocument, Model<UserDocument>>('user', UserSchema)

export { UserModel }
