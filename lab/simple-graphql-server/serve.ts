import { GraphQLSchema, GraphQLObjectType, GraphQLString } from "graphql";

import express = require("express");
import graphqlHTTP = require("express-graphql");
const app = express();

export const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: {
            test: {
                type: GraphQLString,
                resolve: () => {
                    return "test name";
                }
            }
        }
    })
}
);

app.use('/graphql',
    graphqlHTTP({
        schema,
        graphiql: true,
        formatError: error => ({
            message: error.message,
            locations: error.locations,
            stack: error.stack ? error.stack.split('\n') : [],
            path: error.path
        })
    }),

);
app.listen(4000, "192.168.1.177");
console.log("Listening");
