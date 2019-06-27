// import { } from "./generated/prisma-client";

const { prisma } = require('./generated/prisma-client');

// A `main` function so that we can use async/await
async function main() {
    const person = await prisma.createPerson({
        entity: {
            create: {
                uid: "test-person",
                workspace: "some-workspace"
            }
        },
        name: "Alice Doe"
    })


}

main().catch(e => console.error(e))
