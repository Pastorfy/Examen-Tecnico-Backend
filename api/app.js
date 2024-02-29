import express, { json } from 'express' 
import {createPublicacionRouter} from './routes/publicaciones.js'
import { PublicacionModel } from './models/publicaciones.js'
import { corsMiddleware } from './middlewares/cors.js'


  const app = express()
  app.use(json())  
  app.use(corsMiddleware())
  app.disable('x-powered-by')
  app.use('/api/publicaciones', createPublicacionRouter({ model:PublicacionModel }))
  const PORT = process.env.PORT ?? 1234
  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
