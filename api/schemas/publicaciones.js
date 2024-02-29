import z from 'zod'
// import { Publicacion } from 'libs'
// const x = new Publicacion();

// this.IDPublicacion=null;
//         this.Titulo =null;
//         this.Autor=null;
//         this.FechaPublicacion=null;
//         this.Contenido=null;
const movieSchema = z.object({
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

//   year: z.number().int().min(1900).max(2024),
//   director: z.string(),
//   duration: z.number().int().positive(),
//   rate: z.number().min(0).max(10).default(5),
//   poster: z.string().url({
//     message: 'Poster must be a valid URL'
//   }),
//   genre: z.array(
//     z.enum(['Action', 'Adventure', 'Crime', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi']),
//     {
//       required_error: 'Movie genre is required.',
//       invalid_type_error: 'Movie genre must be an array of enum Genre'
//     }
//   )
})

export function validatePublicacion (input) {
  return movieSchema.safeParse(input)
}

export function validatePartialPublicacion (input) {
  return movieSchema.partial().safeParse(input)
}