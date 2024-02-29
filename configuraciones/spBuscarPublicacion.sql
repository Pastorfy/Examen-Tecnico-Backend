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
	,@PageNumber	int = 1
	,@PageSize		int = 2147483647
	,@query			varchar(100) = '""'
	,@orderByColumn	varchar(50) = 'Titulo'
	,@orderDirection varchar(4) = 'asc'
) as
BEGIN 	
	declare  
	   @TotalPaginas int = 0
	   ,@TotalRegistros int = 0;
	 				
	set @query = case 
					when @query is null then '""' 
					when @query = '' then '""'
					when @query = '""' then '""'
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
    IDPublicacion=@IDPublicacion 

    select @TotalPaginas =CEILING( cast(count(*) as decimal(20,2))/cast(@PageSize as decimal(20,2)))
	from @tempResponse

	select @TotalRegistros = cast(COUNT(IDPublicacion) as int) from @tempResponse		

	select *
		,TotalPaginas = case when @TotalPaginas = 0 then 1 else @TotalPaginas end
        ,@TotalRegistros 
	from @tempResponse
	order by 
		case when @orderByColumn = 'Titulo'			and @orderDirection = 'asc'		then Titulo end,			
        case when @orderByColumn = 'Autor'			and @orderDirection = 'asc'		then Autor end,			
		case when @orderByColumn = 'FechaPublicacion'	and @orderDirection = 'desc'	then FechaPublicacion end desc				
	OFFSET @PageSize * (@PageNumber - 1) ROWS
    FETCH NEXT @PageSize ROWS ONLY OPTION (RECOMPILE);

END

GO
