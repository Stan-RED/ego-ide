import { IEntity } from "./entity";
import { ILink } from "./link";
import { IName } from "./name";

/**
 * Scope.
 *
 * @aspect scope
 */
export interface IScope extends IEntity, IName, ILink {
}

// TODO: use @ts-ignore and rule for I Interface prefix.
