import {IEntity} from "../entity";
import {ILink} from "../link";

/**
 * Password.
 * 
 * @aspect password
 */
export interface Password extends IEntity, ILink {
    hash: string;
}
