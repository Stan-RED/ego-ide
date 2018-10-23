import ts from "typescript";
import { TsAspect, TsInterface, TsImplementation, TsContext, TsHelper } from ".";
import { IDictionary, fileWalker } from '../../../core';

export class TsSchema {
    readonly aspects: IDictionary<TsAspect> = {};
    readonly interfaces: IDictionary<TsInterface> = {};

    private readonly checker: ts.TypeChecker;

    constructor(public readonly program: ts.Program) {
        this.checker = this.program.getTypeChecker();
    }

    static fromDirectory(root: string) {
        const files = fileWalker(root);
        const program = ts.createProgram(files, {
            target: ts.ScriptTarget.ES5,
            module: ts.ModuleKind.CommonJS
        });

        const schema = new TsSchema(program);

        return schema.build();
    }

    /**
     * Flattened unique and reversed implements tree for interface name.
     */
    public getFlattenedContracts(name: string): string[] {
        const fromInterface = this.aspects[name];
        const result: string[] = [];

        const fillImplements = (implementsArr: TsImplementation[]) => {
            implementsArr.forEach(x => {
                if (this.aspects[x.name] && this.aspects[x.name].implementations.length) {
                    fillImplements(this.aspects[x.name].implementations);
                }

                result.push(x.name);
            })
        };

        fillImplements.bind(this)(fromInterface.implementations);

        return result.filter((el, pos, arr) => arr.indexOf(el) === pos);
    }

    public build() {
        this.program
            .getSourceFiles()
            .filter(file => !file.isDeclarationFile)
            .forEach(file => file.forEachChild(this.visitNode.bind(this)))
        ;

        return this;
    }

    private visitNode(node: ts.Node) {
        // Only considers exported nodes.
        if (!TsHelper.isNodeExported(node)) {
            return;
        }

        if (ts.isInterfaceDeclaration(node) && node.name) {
            var context = new TsContext(node, this.checker);

            var contract = TsAspect.fromContext(context);
            this.interfaces[contract.name] = contract;

            if (contract instanceof TsAspect) {
                this.aspects[contract.alias] = contract;
            }
        } else if (ts.isModuleDeclaration(node)) {
            // This is a namespace, visits its children.
            ts.forEachChild(node, this.visitNode);
        }
    }
}
