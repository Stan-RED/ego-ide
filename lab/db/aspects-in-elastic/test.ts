import { EsClient } from "./es-client";

const client = new EsClient();
const log = (response: any) => console.info(JSON.stringify(response, null, 4));
const schema = {
    index: "entity",
    type: "entity",
    body: {
        properties: {
            link: {
                type: "nested"
            }
        }
    }
}
const data = {
    "user-origo": {
        admin: "user-origo"
    },

    "relation-auth": {
        admin: "user-origo",
        relation: {}
    },
    "relation-inbox": {
        admin: "user-origo",
        relation: {}
    },

    "user-stan": {
        admin: "user-stan",
        person: {
            firstname: "Stan",
            lastName: "Ya"
        }
    },
    "password-stan": {
        admin: "user-stan",
        link: {
            target: "user-stan",
            relation: "relation-auth"
        },
        password: {
            hash: "@ws3Ed4rF"
        }
    },
    "mail-1-for-stan": {
        link: {
            target: "user-stan",
            relation: "relation-inbox"
        },
        mail: {
            subject: "Hey Stan"
        }
    },
    "mail-2-for-stan": {
        link: {
            target: "user-stan",
            relation: "relation-inbox"
        },
        mail: {
            subject: "Mail verification"
        }
    },

    "user-yavulan": {
        admin: "user-yavulan"
    },
    "mail-1-for-yavulan": {
        link: {
            target: "user-yavulan",
            relation: "relation-inbox"
        },
        mail: {
            subject: "Mail verification"
        }
    },
};

client
    .dropIndex()
    .then(client.createIndex)
    .then(() => client.putMapping(schema))
    .then(() => client.seed(data))
    .then(() => client.searchByLink("user-stan"))
    .then(log)
    // .then(() => client.searchByAspect("link"))
    // .then(dump)
    // .then(() => client.searchByAspect("person"))
    // .then(dump)
    // .then(() => client.searchById("user-stan"))
    // .then(dump)
;
