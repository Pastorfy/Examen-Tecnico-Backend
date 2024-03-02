import z from 'zod'
const publicacionSchema = z.object({
  Titulo: z.string({
    invalid_type_error: 'El titulo debe ser un string.',
    required_error: 'El titulo es requerido.'
  }),
  Contenido: z.string({
    invalid_type_error: 'El titulo debe ser un string.',
    required_error: 'El titulo es requerido.'
  }),
  Autor: z.string({
    invalid_type_error: 'El titulo debe ser un string.',
    required_error: 'El titulo es requerido.'
  })
})

export function validatePublicacion (input) {
  return publicacionSchema.safeParse(input)
}

export function validatePartialPublicacion (input) {
  return publicacionSchema.partial().safeParse(input)
}