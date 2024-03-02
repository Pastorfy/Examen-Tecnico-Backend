create database ExamenTecnicoBackedJS;
use ExamenTecnicoBackedJS;
CREATE table tblPublicaciones ( 
    IDPublicacion int  IDENTITY(1,1) NOT NULL,
    Titulo  varchar(max),
    Autor  varchar(120),
    FechaPublicacion DATETIME DEFAULT GETDATE(),
    Contenido varchar(max),
    CONSTRAINT [Pk_tblPublicaciones_IDPublicacion] PRIMARY KEY CLUSTERED ([IDPublicacion] ASC)
);


CREATE UNIQUE INDEX ui_tblPublicacion_IDPublicacion ON tblPublicaciones(IDPublicacion);
CREATE FULLTEXT CATALOG ft AS DEFAULT;
CREATE FULLTEXT INDEX ON tblPublicaciones(Autor,Contenido,Titulo)
   KEY INDEX ui_tblPublicacion_IDPublicacion
   WITH STOPLIST = SYSTEM;


 