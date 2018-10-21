import { Node, TypeChecker } from "typescript";
import { TsDocTag, TsHelper } from ".";

export class TsContext<T extends Node> {
    readonly node: T;
    readonly checker: TypeChecker;

    private _docs: ReadonlyArray<TsDocTag> | undefined;
    get docs(): ReadonlyArray<TsDocTag> {
        if (this._docs !== undefined) {
            return this._docs;
        }

        this._docs = TsDocTag.fromContext(this);
        return this._docs;
    }

    hasDoc(name: string): boolean {
        return this.docs.some(tag => tag.name === name);
    }

    constructor(node: T, checker: TypeChecker) {
        this.node = node;
        this.checker = checker;
        
        if (TsHelper.isNamed(this.node)) {

        }
    }
}
