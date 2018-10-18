import { ID, IEntity } from "./entity";

/**

    This aspect defines that entity is linked to another one.

    @statement {id} is linked with {target} as {relation}
    @aspect link

 */
export interface ILink extends IEntity {
    target: ID;
    relation: ID;
}
