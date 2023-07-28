import { Request, Response } from 'express'
import { PersonService } from './person.service'

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

    if (totalItems === 0) return res.status(204).end()

    return res.status(200).json({ result, totalItems })
  }
})
