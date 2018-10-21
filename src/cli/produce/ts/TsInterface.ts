import { InterfaceDeclaration, getJSDocTags, isJSDoc } from "typescript";
import { TsDocTag, TsContext, TsProperty, TsImplementation } from '.';

export class TsInterface {
    contract: InterfaceDeclaration;
    name: string;
    summary: string;
    implementations: TsImplementation[];
    properties: ReadonlyArray<TsProperty>;
    docs: ReadonlyArray<TsDocTag>;

    constructor(public readonly context: TsContext<InterfaceDeclaration>) {
        this.contract = context.node;

        this.name = this.contract.name.escapedText as string;
        this.properties = TsProperty.fromMembers(this.contract.members, context.checker);
        this.implementations = TsImplementation.fromInterface(this.contract);

        this.docs = TsDocTag.fromContext(context);
        this.summary = this.getSummary();
    }

    private getSummary(): string {
        const tags = getJSDocTags(this.contract);

        let parent;
        if (!(tags.length && (parent = tags[0].parent))) {
            return "";
        }

        if (isJSDoc(parent)) {
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
