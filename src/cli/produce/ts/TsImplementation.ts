import { InterfaceDeclaration, ExpressionWithTypeArguments } from "typescript";

export class TsImplementation {
    readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    static fromType(type: ExpressionWithTypeArguments) {
        // https://github.com/Microsoft/TypeScript/issues/21517#issuecomment-365699236
        return 'escapedText' in type.expression
            ? new TsImplementation((type.expression as {escapedText: string}).escapedText)
            : null
        ;
    }

    static fromInterface(contract: InterfaceDeclaration) {
        const result: TsImplementation[] = [];

        if (contract.heritageClauses && contract.heritageClauses.length) {
            contract.heritageClauses.forEach(clause => {
                clause
                    .types
                    .map(type => TsImplementation.fromType(type))
                    .filter(implementation => implementation != null)
                    .forEach(type => result.push(<TsImplementation>type))
                ;
            })
        }

        return result;
    }
}