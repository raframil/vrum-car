import { createConnection } from "typeorm";
import config from "../../ormconfig";

createConnection(config).then(() => {
  console.log(`✔️ Successfully connected with PostgreSQL database`);
});
