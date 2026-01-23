import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema"
import { ENV } from "../config/env";

if(!ENV.DATABASE_URL){
    throw new Error("DATABASE_URL is not set in enviroment variable");   
}

//intialize postgres connection pool

const pool = new Pool({connectionString: ENV.DATABASE_URL})

// log when connection is made
pool.on("connect", () => {
    console.log("database connect successfully")
})

// log when error
pool.on("error", (err) => {
    console.error("database connect error", err);
})

export const db = drizzle({client: pool, schema})