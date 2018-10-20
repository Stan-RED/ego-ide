import { Node, TypeChecker } from "typescript";

export class TsContext<T extends Node> {
    readonly node: T;
    readonly checker: TypeChecker;

    constructor(node: T, checker: TypeChecker) {
        this.node = node;
        this.checker = checker;
    }
}
