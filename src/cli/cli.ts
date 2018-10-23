import { TsSchema, PgCodeWriter } from "./code";
import { using } from "../core";

// WORK:
const schema = TsSchema.fromDirectory("../mesh");
//console.info("CLI:", Object.keys(schema.interfaces));
//console.info("CLI:", Object.keys(schema.aspects));
using(new PgCodeWriter("./test.sql"), writer => {
    writer.startArtifact("test.sql");
    writer.write("Hey\n");
});
