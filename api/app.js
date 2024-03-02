import express, { json } from 'express' 
import {createPublicacionRouter} from './routes/publicaciones.js'
import { PublicacionModel } from './models/publicaciones.js'
import { corsMiddleware } from './middlewares/cors.js'
import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.PORT_API);
  const app = express()
  app.use(json())  
  app.use(corsMiddleware())
  app.disable('x-powered-by')
  app.use('/api/publicaciones', createPublicacionRouter({ model:PublicacionModel }))
  const PORT = process.env.PORT_API?? 1234
  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
