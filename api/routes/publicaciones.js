import { Router } from "express";
import { PublicacionController } from "../controllers/publicaciones.js";


export  const createPublicacionRouter= ({model})=>{
    const publicacionRouter = new Router();
    
    
    const publicacionController = new PublicacionController({ model })
    
    publicacionRouter.get('/', publicacionController.getAll)
    publicacionRouter.post('/', publicacionController.create)
  
    publicacionRouter.get('/:id', publicacionController.getById)
    publicacionRouter.delete('/:id', publicacionController.delete)
    publicacionRouter.patch('/:id', publicacionController.update)
  
    return publicacionRouter
}
