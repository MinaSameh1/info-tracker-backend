import { Router } from 'express'
import { wrapExpressFunction } from '../../helpers/express.helper'
import {
  Log,
  ObjectIdParam,
  checkUserPermissions,
  roleGuard,
  validateResource
} from '../../middleware'
import { Roles } from '../../models/roles.entity'
import { UserPermissions } from '../../models/user.model'
import { UserInputBodySchema } from '../../schemas/User.schema'
import { UserController } from './user.controller'

const UserRouter = Router()

UserRouter.use(roleGuard(Roles.ADMIN))

UserRouter.get(
  '/',
  checkUserPermissions(UserPermissions.Read),
  wrapExpressFunction(UserController.List)
)

UserRouter.get(
  '/:id',
  checkUserPermissions(UserPermissions.Read),
  ObjectIdParam('id'),
  wrapExpressFunction(UserController.One)
)

UserRouter.post(
  '/',
  Log,
  checkUserPermissions(UserPermissions.Create),
  validateResource(UserInputBodySchema),
  wrapExpressFunction(UserController.Create)
)

UserRouter.put(
  '/:id',
  Log,
  checkUserPermissions(UserPermissions.Update),
  ObjectIdParam('id'),
  validateResource(UserInputBodySchema),
  wrapExpressFunction(UserController.Update)
)

UserRouter.delete(
  '/:id',
  Log,
  checkUserPermissions(UserPermissions.Delete),
  ObjectIdParam('id'),
  wrapExpressFunction(UserController.Delete)
)

export default UserRouter
