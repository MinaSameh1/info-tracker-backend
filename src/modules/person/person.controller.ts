import { Request, Response } from 'express'
import { PersonService } from './person.service'
import { HttpStatus } from '../../assets/httpCodes'
import { PersonInput } from '../../schemas/Person.schema'

export const PersonController = Object.freeze({
  /**
   * @function List
   * @description List all persons paginated and filtered
   * @param {Request} req Express Request
   * @param {Response} res Express Response
   */
  List: async (req: Request, res: Response) => {
    const [result, totalItems] = await PersonService.getAllPersons(
      req.query,
      req.limit,
      req.skip
    )

    if (totalItems === 0) return res.status(HttpStatus.NO_CONTENT).end()

    return res.status(HttpStatus.OK).json({ result, totalItems })
  },

  /**
   * @function One
   * @description gets one person by id
   * @param {Request} req Express Request
   * @param {Response} res Express Response
   */
  One: async (req: Request, res: Response) => {
    const result = await PersonService.getOnePerson(req.params.id)

    if (!result)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Person not found' })

    return res.status(HttpStatus.OK).json(result)
  },

  Create: async (
    req: Request<unknown, unknown, PersonInput>,
    res: Response
  ) => {
    const result = await PersonService.createPerson(req.body)

    return res.status(HttpStatus.CREATED).json(result)
  },

  Update: async (
    req: Request<{ id: string }, unknown, PersonInput>,
    res: Response
  ) => {
    const result = await PersonService.updatePerson(req.params.id, req.body)

    if (!result)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Person not found' })

    return res.status(HttpStatus.OK).json(result)
  },

  Delete: async (req: Request<{ id: string }>, res: Response) => {
    const result = await PersonService.deletePerson(req.params.id)

    if (!result)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Person not found' })

    return res.status(HttpStatus.OK).json(result)
  }
})
