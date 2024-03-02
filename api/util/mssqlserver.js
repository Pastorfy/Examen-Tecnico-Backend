import sql from 'mssql';

import dotenv from 'dotenv';
dotenv.config();   
export default class MSSQLServer {
  constructor() {
    const {
      DB_USER,
      DB_PASSWORD,
      DB_NAME,
      DB_SERVER,      
    } = process.env;

    const configProd = {
      user: encodeURIComponent(DB_USER),
      password: DB_PASSWORD,
      database: encodeURIComponent(DB_NAME),
      server: encodeURIComponent(DB_SERVER),
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
      options: {
        encrypt: true, 
        trustServerCertificate: true, 
      },
      parseJSON: true,
    };
 
    this.config =  configProd;
    this.dataTypes = {
      VarChar: sql.VarChar,
      VarCharMAX: sql.VarChar(sql.MAX),
      MAX: sql.MAX,
      NVarChar: sql.NVarChar,
      Int: sql.Int,
      Bit: sql.Bit,
      DateTime: sql.DateTime,
      VarBinary: sql.VarBinary,
      TVP: sql.TVP,
    };
  }
  async connect() {
    try {
      if (!MSSQLServer.connection) {
        MSSQLServer.connection = await sql.connect(this.config);
        return Promise.resolve(MSSQLServer.connection);
      }

      return Promise.resolve(MSSQLServer.connection);
    } catch (error) {
      return Promise.reject(error);
    }
  }  

  async executeSp(sp)
  {
      try {
          const db = await this.connect();
          const response = await db.request().execute(sp);          
          const data = response.recordsets[0];
          return Promise.resolve( data );
      } catch (error) {
          return Promise.reject(error);
      }
  }

  async executeSpWithParams(query)
  {
      try {
          const db = await this.connect();
          const response = await db.query(query);
          const data = response.recordsets[0];
          return Promise.resolve( data );
      } catch (error) {
          return Promise.reject(error);
      }
  }


}



 

