import { DataSource } from "typeorm";
import 'dotenv/config';

export const connectionSource = new DataSource({
  type: "postgres",
  host: "postgres",
  port: +process.env.POSTGRES_PORT || 5432,
  username: process.env.POSTGRES_USER || "dab10",
  password: process.env.POSTGRES_PASSWORD || "111111",
  database: process.env.POSTGRES_DB || "db",
  entities: ["dist/**/*.entity.js"],
  synchronize: true,
  migrations: ["dist/**/migrations/*.js"],
})
