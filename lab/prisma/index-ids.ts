import {AspectCreateInput, Person, PersonCreateInput, Relation, TopicCreateInput} from "./generated/prisma-client";

const { prisma } = require('./generated/prisma-client');

// A `main` function so that we can use async/await
async function main() {
    const aspectPerson = await addPersonAspect({
        uid: "aspect-person",
        name: "Person"
    });

    const personAlice = await addPerson({
        uid: "person-alice",
        lastName: "Doe",
        firstName: "Alice",
    });

    const topicApartment = await addTopic({
        uid: "topic-apartment",
        name: "Apartment"
    });







    const entityFeedAddress = await prisma.createEntity({
        uid: "feed-address"
    });

    const textAddress = await prisma.createText({
        uid: entityFeedAddress.uid,
        content: "Look for an apartment at the addr: ..."
    });

    const feedAddress = await prisma.createFeed({
        uid: entityFeedAddress.uid
    });

    const relationAddress = await prisma.createRelation({
        uid: entityFeedAddress.uid,
        source: personAlice.uid,
        target: topicApartment.uid,
    });





    const entityFilePhoto = await prisma.createEntity({
        uid: "feed-photo"
    });

    const filePhoto = await prisma.createFile({
        uid: entityFilePhoto.uid,
        name: "Apartment photo"
    });

    const feedPhoto = await prisma.createFeed({
        uid: entityFilePhoto.uid
    });

    const relationPhoto: Relation = await prisma.createRelation({
        uid: entityFilePhoto.uid,
        source: personAlice.uid,
        target: topicApartment.uid,
    });
}

export const addPersonAspect = async (aspect: AspectCreateInput) => {
    const entityAspect = await prisma.createEntity({
        uid: aspect.uid
    });

    return await prisma.createAspect(aspect);
};

export const addPerson = async (person: PersonCreateInput) => {
    const entityPerson = await prisma.createEntity({
        uid: person.uid
    });

    return await prisma.createPerson(person);
};

export const addTopic = async (topic: TopicCreateInput) => {
    const entityTopicApartment = await prisma.createEntity({
        uid: topic.uid
    });

    return await prisma.createTopic(topic);
};

main().catch(e => console.error(e))
