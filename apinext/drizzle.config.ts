import { defineConfig } from "drizzle-kit";
import { DB_CA, DB_DATABASE, DB_PASSWORD, DB_URL, DB_USER } from "./src/utils/constants";

export default defineConfig({
	schema: 'src/schema.ts',
	dialect: "postgresql",
	dbCredentials: {
	   url: DB_URL,
		 user: DB_USER,
		 host: "localhost",
		 password: DB_PASSWORD,
		 database: DB_DATABASE,
		  ssl: {
 		   ca: DB_CA,
		  },
	},
	verbose: true,
	strict: true,
});
