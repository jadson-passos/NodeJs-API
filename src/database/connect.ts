import { createConnection } from "typeorm";

createConnection().then(() => console.log("Blz, conectado DB"));

