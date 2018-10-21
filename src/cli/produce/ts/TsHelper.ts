import { Node, NamedDeclaration } from "typescript";

export class TsHelper {
    static isNamed(node: Node): node is NamedDeclaration {
        return (node as NamedDeclaration).name !== undefined;
    }
}
