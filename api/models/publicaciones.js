import MSSQLServer from "../util/mssqlserver.js";
const instancia = new MSSQLServer();

export class PublicacionModel {
    static async getAll () 
    {
        const publicaciones =await instancia.executeSpWithParams('SELECT * FROM [dbo].[tblPublicaciones]');
        return publicaciones;
    }
    static async getById ({ id }) {    
        const publicaciones =await instancia.executeSpWithParams(`SELECT * FROM [dbo].[tblPublicaciones] WHERE IDPublicacion=${id}`)         
        if (publicaciones.length === 0) return null
        return publicaciones[0]    
    }
    static async create ({ input }) {
        const { Titulo, Autor, Contenido }=input;
        try{
            const publicaciones =await instancia.executeSpWithParams(`EXEC [dbo].[spIUPublicacion]    
                                    @IDPublicacion =null, 
                                    @Titulo ='${Titulo}',
                                    @Autor='${Autor}',
                                    @Contenido='${Contenido}'`);    
            return publicaciones[0]    
        }catch(e){            
            throw new Error('Error al crear la publicación');
        } 
    }
    static async delete ({ id }) {
        try{
            const publicaciones =await instancia.executeSpWithParams(`DELETE FROM [dbo].[tblPublicaciones] WHERE IDPublicacion=${id}`);        
            return true
        }catch(e){            
            return false
        }         
    }

    static async update ({ id, input }) {
        const { Titulo, Autor, Contenido }=input;
        try {
            const publicaciones =await instancia.executeSpWithParams(`EXEC [dbo].[spIUPublicacion]    
                                    @IDPublicacion =${id}, 
                                    @Titulo ='${Titulo}',
                                    @Autor='${Autor}',
                                    @Contenido='${Contenido}'`);    
            return publicaciones[0]    
        }catch(e){            
            throw new Error('Error al crear la publicación');
        }         
    }
}