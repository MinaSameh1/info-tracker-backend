import { Router } from 'express'
import { PersonController } from './person.controller'
import { wrapExpressFunction } from '../../helpers/express.helper'

const PersonRouter = Router()

PersonRouter.get('/', wrapExpressFunction(PersonController.List))

export default PersonRouter
