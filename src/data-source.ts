import { DataSource } from "typeorm";
import "dotenv/config";
import { createTables1686414777247 } from "../src/migrations/1686414777247-createTables";


const AppDataSource = new DataSource(
  process.env.NODE_ENV === "test" ?
    {
      type: "sqlite",
      database: ":memory:",
      synchronize: true,
      entities: ["src/entities/*.ts"]
    }
    :
    {
      type: "postgres",
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB,
      synchronize: false,
      logging: true,
      entities: process.env.NODE_ENV === "production" ? ["dist/src/entities/*.js"] : ["src/entities/*.ts"],
      migrations: process.env.NODE_ENV === "production" ? ["dist/src/migrations/*.js"] : [createTables1686414777247],
    }
);

export default AppDataSource;
