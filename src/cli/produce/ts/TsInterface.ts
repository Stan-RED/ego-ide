import ts from "typescript";
import { TsImplementation, TsProperty, TsContext } from ".";

export class TsInterface {
    readonly contract: ts.InterfaceDeclaration;
    readonly name: string;
    readonly summary: string;
    readonly implementations: TsImplementation[];
    readonly properties: ReadonlyArray<TsProperty>;

    constructor(public readonly context: TsContext<ts.InterfaceDeclaration>) {
        this.contract = context.node;

        this.name = this.contract.name.escapedText as string;
        this.properties = TsProperty.fromMembers(this.contract.members, context.checker);
        this.implementations = TsImplementation.fromInterface(this.contract);
        this.summary = this.getSummary();
    }

    private getSummary(): string {
        const tags = ts.getJSDocTags(this.contract);

        let parent;
        if (!(tags.length && (parent = tags[0].parent))) {
            return "";
        }

        if (ts.isJSDoc(parent)) {
            return parent.comment ? parent.comment.trim() : "";
        } else {
            throw "TODO: We don't know yet, how to handle JSDocLiteral";
        }
    }

    implements(name: string) {
        return this.implementations.some(contract => contract.name === name);
    }

    notImplements(name: string) {
        return !this.implements(name);
    }
}
