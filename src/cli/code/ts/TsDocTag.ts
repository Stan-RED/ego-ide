import { Node, JSDocTagInfo, Symbol } from 'typescript';
import { TsHelper, TsContext } from '.';
import * as ts from "typescript";

/**

    This class is responsible for communication between our models and
    @see JsDocTag from Typescript Compiler API.

 */
export class TsDocTag {
    readonly name: string;
    readonly value?: string;

    constructor(tag: JSDocTagInfo) {
        this.name = tag.name;
        this.value = tag.text;
    }

    static fromArray(tags: ReadonlyArray<JSDocTagInfo>) {
        return tags.map(tag => new TsDocTag(tag));
    }

    static fromSymbol(symbol: Symbol | undefined) {
        return TsDocTag.fromArray(symbol == null ? [] : symbol.getJsDocTags());
    }

    static fromContext<T extends Node>(context: TsContext<T>) {
        let node: Node = context.node;

        if (TsHelper.isNamed(node)) {
            if (node.name && ts.isIdentifier(node.name)) {
                node = node.name;
            }
        }

        if (node) {
            var symbol = context.checker.getSymbolAtLocation(node);
            return TsDocTag.fromSymbol(symbol);
        }

        return [];
    }
}
