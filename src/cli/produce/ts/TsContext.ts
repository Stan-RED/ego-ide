import ts from "typescript";
import { TsDocTag, TsHelper } from ".";

export class TsContext<T extends ts.Node> {
    readonly node: T;
    readonly checker: ts.TypeChecker;

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

    getDoc(name: string): Array<TsDocTag> {
        return this.docs.filter(tag => tag.name === name);
    }

    getUniqueDoc(name: string): TsDocTag | undefined {
        const tags = this.getDoc(name);

        if (tags.length > 1) {
            throw new Error(`JSDocTag ${name} is not unique.`);
        }

        return tags.length ? tags[0] : undefined;
    }

    constructor(node: T, checker: ts.TypeChecker) {
        this.node = node;
        this.checker = checker;
        
        if (TsHelper.isNamed(this.node)) {

        }
    }
}
