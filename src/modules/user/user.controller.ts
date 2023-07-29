import type { Request, Response } from 'express'
import { HttpStatus } from '../../assets/httpCodes'
import { UserInput } from '../../schemas/User.schema'
import { UserService } from './user.service'

export const UserController = Object.freeze({
  List: async (req: Request, res: Response) => {
    const [result, totalItems] = await UserService.getAllUsers({
      query: req.query,
      limit: req.limit,
      skip: req.skip
    })

    if (totalItems === 0) return res.status(HttpStatus.NO_CONTENT).end()

    res.status(HttpStatus.OK).json({ result, totalItems })
  },

  One: async (req: Request, res: Response) => {
    const result = await UserService.getOneUser(req.params.id)

    if (!result)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'User not found' })

    res.status(HttpStatus.OK).json({ result })
  },

  Create: async (req: Request, res: Response) => {
    const result = await UserService.createUser(req.body)

    res.status(HttpStatus.CREATED).json({ result })
  },

  Update: async (
    req: Request<
      {
        id: string
      },
      unknown,
      UserInput
    >,
    res: Response
  ) => {
    const result = await UserService.updateUser(req.params.id, req.body)

    if (!result)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'User not found' })

    res.status(HttpStatus.OK).json({ result })
  },

  Delete: async (req: Request, res: Response) => {
    const result = await UserService.deleteUser(req.params.id)

    if (!result)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'User not found' })

    res.status(HttpStatus.OK).json({ result })
  }
})
