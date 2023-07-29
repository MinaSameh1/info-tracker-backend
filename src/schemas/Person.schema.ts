import { z } from 'zod'

export const PersonInputSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string'
  }),
  nationalId: z
    .string({
      required_error: 'NID is required',
      invalid_type_error: 'NID must be a string'
    })
    .length(14),
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
    .transform(val => new Date(val))
})

export const PersonInputBodySchema = z.object({
  // Allow both single and array of persons
  body: PersonInputSchema.or(z.array(PersonInputSchema))
})

export const PersonUpdateInputSchema = PersonInputSchema.partial()

export type PersonUpdateInput = z.infer<typeof PersonUpdateInputSchema>

export type PersonInput = z.infer<typeof PersonInputSchema>
