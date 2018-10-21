import { TsSchema } from "./produce/ts";

// WORK:
const schema = TsSchema.fromDirectory("../mesh");
console.info("CLI:", Object.keys(schema.interfaces));
console.info("CLI:", Object.keys(schema.aspects));
