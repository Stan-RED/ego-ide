import ts from "typescript";

export class TsHelper {
    static isNamed(node: ts.Node): node is ts.NamedDeclaration {
        return (node as ts.NamedDeclaration).name !== undefined;
    }

    /** True if this is visible outside this file, false otherwise */
    static isNodeExported(node: ts.Node): boolean {
        return (
            (ts.getCombinedModifierFlags(node as ts.Declaration) & ts.ModifierFlags.Export) !== 0
            || (!!node.parent && node.parent.kind === ts.SyntaxKind.SourceFile)
        );
    };
}
