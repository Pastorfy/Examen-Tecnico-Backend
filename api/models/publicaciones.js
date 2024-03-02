import MSSQLServer from "../util/mssqlserver.js";
const instancia = new MSSQLServer();

export class PublicacionModel {
    static async getAll ({query='',pageNumber=1,pageSize=2147483647,orderByColumn='Titulo',orderDirection='asc'}) 
    {        
        const publicaciones =await instancia.executeSpWithParams(`EXEC [dbo].[spBuscarPublicaciones]
                                @IDPublicacion  = null, 
                                @pageNumber	    = ${pageNumber}, 
                                @pageSize	    = ${pageSize}, 
                                @query          = '"${query}*"', 
                                @orderByColumn	= '${orderByColumn}', 
                                @orderDirection = '${orderDirection}'`);            
        return publicaciones;
    }
    static async getById ({ id }) {    
        const publicaciones =await instancia.executeSpWithParams(`EXEC [dbo].[spBuscarPublicaciones]
                                    @IDPublicacion  = ${id}, 
                                    @pageNumber	    = 1, 
	                                @pageSize	    = 2147483647, 
                                    @query          = '""', 
	                                @orderByColumn	= 'Titulo', 
	                                @orderDirection = 'asc'
                                `);            
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
            if(id){
                const publicaciones =await instancia.executeSpWithParams(`DELETE FROM [dbo].[tblPublicaciones] WHERE IDPublicacion=${id}`);        
                return true
            }else{
                return false
            }                        
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
            
            return publicaciones               
        }catch(e){            
            console.log(e);
            throw new Error('Error al crear la publicación');
        }         
    }
}