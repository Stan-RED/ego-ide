import { Node, JSDocTagInfo, Symbol } from 'typescript';
import { TsContext } from './TsContext';

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
        var symbol = context.checker.getSymbolAtLocation(context.node);
        return TsDocTag.fromSymbol(symbol);
    }
}
