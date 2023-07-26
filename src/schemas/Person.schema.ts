import { z } from 'zod'

export const PersonSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string'
  }),
  nid: z.string({
    required_error: 'NID is required',
    invalid_type_error: 'NID must be a string'
  }),
  status: z.string({
    required_error: 'Status is required',
    invalid_type_error: 'Status must be a string'
  }),
  notes: z.string({
    required_error: 'Notes is required',
    invalid_type_error: 'Notes must be a string'
  }),
  DateOfTalab: z
    .string({
      required_error: 'DateOfTalab is required',
      invalid_type_error: 'DateOfTalab must be a string'
    })
    .datetime({
      message: 'DateOfTalab must be a valid date'
    })
})

export const PersonListSchema = z.array(PersonSchema)

export type Person = z.infer<typeof PersonSchema>
