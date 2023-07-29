import { Router } from 'express'
import { wrapExpressFunction } from '../../helpers/express.helper'
import {
  checkUserPermissions,
  ObjectIdParam,
  validateResource
} from '../../middleware'
import { PersonPermissions } from '../../models/person.model'
import { PersonInputBodySchema } from '../../schemas/Person.schema'
import { PersonController } from './person.controller'

const PersonRouter = Router()

PersonRouter.get(
  '/',
  checkUserPermissions(PersonPermissions.View),
  wrapExpressFunction(PersonController.List)
)

PersonRouter.get(
  '/:id',
  checkUserPermissions(PersonPermissions.View),
  ObjectIdParam(':id'),
  wrapExpressFunction(PersonController.One)
)

PersonRouter.post(
  '/',
  checkUserPermissions(PersonPermissions.Create),
  validateResource(PersonInputBodySchema),
  wrapExpressFunction(PersonController.Create)
)

PersonRouter.put(
  '/:id',
  checkUserPermissions(PersonPermissions.Update),
  ObjectIdParam(':id'),
  wrapExpressFunction(PersonController.Update)
)

PersonRouter.delete(
  '/:id',
  checkUserPermissions(PersonPermissions.Delete),
  ObjectIdParam(':id'),
  wrapExpressFunction(PersonController.Delete)
)

export default PersonRouter
