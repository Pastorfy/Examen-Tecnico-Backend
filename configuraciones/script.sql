create database ExamenTecnicoBackedJS

CREATE table ExamenTecnicoBackedJS.tblPublicaciones ( 
    IDPublicacion int  IDENTITY(1,1) NOT NULL,
    Titulo  varchar(max),
    Autor  varchar(120),
    FechaPublicacion DATETIME DEFAULT GETDATE(),
    Contenido varchar(100),
    CONSTRAINT [Pk_tblPublicaciones_IDPublicacion] PRIMARY KEY CLUSTERED ([IDPublicacion] ASC)
);

-- select * from tblPublicaciones


-- --this.IDPublicacion=null;
-- --this.Titulo =null;
-- --this.Autor=null;
-- --this.FechaPublicacion=null;
-- --this.Contenido=null;