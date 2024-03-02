import { validatePartialPublicacion,validatePublicacion } from '../schemas/publicaciones.js'

export class PublicacionController {
  constructor ({ model }) {    
    this.publicacionModel = model    
  }

  getAll = async (req, res) => {    
    const { query,pageNumber,pageSize,orderByColumn,orderDirection } = req.query        
    const publicaciones = await this.publicacionModel.getAll({query,pageNumber,pageSize,orderByColumn,orderDirection});
    res.json(publicaciones)
  }
  
  getById = async (req, res) => {
    const { id } = req.params
    const publicacion = await this.publicacionModel.getById({ id })
    if (publicacion) return res.json(publicacion)
    res.status(404).json({ message: 'Publicación no encontrada.' })
  }
  create = async (req, res) => {
    const result = validatePublicacion(req.body)
    if (!result.success) {    
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const nuevaPublicacion = await this.publicacionModel.create({ input: result.data })
    res.status(201).json(nuevaPublicacion)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.publicacionModel.delete({ id })
    if (result === false) {
      return res.status(404).json({ message: 'Publicación no encontrada.' })
    }
    return res.json({ message: 'La publicación fue eliminada.' })
  }

  update = async (req, res) => {
    const result = validatePartialPublicacion(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const actualizarPublicacion = await this.publicacionModel.update({ id, input: result.data })
    if(actualizarPublicacion.length==0){
      res.status(404).json({ message: 'Publicación no encontrada.' })
    }else{
      return res.json(actualizarPublicacion)
    }
    
    
  }
}