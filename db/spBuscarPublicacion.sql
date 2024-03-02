SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/****************************************************************************************************   
** Autor   : Jose Vargas
** Email   : josemiguel030054@gmail.com
** FechaCreacion : 2024-02-28
** Paremetros  :                
  
****************************************************************************************************  
HISTORIAL DE CAMBIOS  
Fecha(yyyy-mm-dd) Autor   Comentario  
------------------- ------------------- ------------------------------------------------------------  
***************************************************************************************************/  
CREATE PROC [dbo].[spBuscarPublicaciones]
(
    @IDPublicacion int = 0	
	,@pageNumber	int = 1
	,@pageSize		int = 2147483647
	,@query			varchar(100) = '"*"'
	,@orderByColumn	varchar(50) = 'Titulo'
	,@orderDirection varchar(4) = 'asc'
) as
BEGIN 	
	declare  
	   @TotalPaginas int = 0
	   ,@TotalRegistros int = 0;
	 				
	set @query = case 
					when @query is null then '"*"' 
					when @query = '' then '"*"'
					when @query = '"*"' then '"*"'
				else @query  end

	declare @tempResponse as table (
        IDPublicacion int ,
        Titulo  varchar(100),
        Autor  varchar(100),
        FechaPublicacion DATETIME DEFAULT GETDATE(),
        Contenido varchar(max)
    );

    INSERT @tempResponse    
    select  
        IDPublicacion   ,
        Titulo  ,
        Autor  ,
        FechaPublicacion ,
        Contenido 
    from tblPublicaciones
     WHERE  
     (IDPublicacion=@IDPublicacion  or isnull(@IDPublicacion,0)=0) and 
     (Contains(*,@query) or @query = '"*"' )

    select @TotalPaginas =CEILING( cast(count(*) as decimal(20,2))/cast(@pageSize as decimal(20,2)))
	from @tempResponse

	select @TotalRegistros = cast(COUNT(IDPublicacion) as int) from @tempResponse		

	select *
		,TotalPaginas = case when @TotalPaginas = 0 then 1 else @TotalPaginas end
        ,@TotalRegistros  AS TotalRegistros
	from @tempResponse
	order by 
		case when @orderByColumn = 'Titulo'			and @orderDirection = 'asc'		then Titulo  end,			
        case when @orderByColumn = 'Titulo'			and @orderDirection = 'desc'		then Titulo end desc,			

        case when @orderByColumn = 'Autor'			and @orderDirection = 'asc'		then Autor end,			
        case when @orderByColumn = 'Autor'			and @orderDirection = 'desc'		then Autor end desc,			

        case when @orderByColumn = 'Contenido'			and @orderDirection = 'asc'		then Contenido end,			
        case when @orderByColumn = 'Contenido'			and @orderDirection = 'desc'		then Contenido end desc,			

        case when @orderByColumn = 'FechaPublicacion'	and @orderDirection = 'asc'	then FechaPublicacion end ,				
		case when @orderByColumn = 'FechaPublicacion'	and @orderDirection = 'desc'	then FechaPublicacion end desc				
	OFFSET @pageSize * (@pageNumber - 1) ROWS
    FETCH NEXT @pageSize ROWS ONLY OPTION (RECOMPILE);

END

GO
