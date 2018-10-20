import  { NodeArray, TypeElement, TypeChecker, PropertySignature, SyntaxKind, Identifier, TypeNode, TypeReferenceType, isTypeReferenceNode, TypeReferenceNode } from "typescript";
import { TsContext, TsDocTag, TsSchemaTag } from ".";

/**

    This class is responsible for communication between our models and
    @see PropertySignature from Typescript Compiler API.

 */
export class TsProperty {
    readonly property: PropertySignature;
    readonly name: string;
    readonly type: string;
    readonly required: boolean;
    readonly docs: ReadonlyArray<TsDocTag>;
    readonly auto: boolean;

    constructor(context: TsContext<PropertySignature>) {
        this.property = context.node;

        this.name = (this.property.name as Identifier).escapedText as string;

        const type = <TypeNode | TypeReferenceType>this.property.type;
        this.type = isTypeReferenceNode(type)
            ? ((type as TypeReferenceNode).typeName as Identifier).escapedText as string
            : TsProperty.Mappings[type.kind]
        ;
        
        this.required = !this.property.questionToken;

        var symbol = context.checker.getSymbolAtLocation(this.property.name);
        this.docs = TsDocTag.fromSymbol(symbol);
        this.auto = this.docs.some(tag => tag.name == TsSchemaTag.auto);
    }

    static Mappings: { [key: number]: string } = {
        [SyntaxKind.NumberKeyword]: "number",
        [SyntaxKind.BooleanKeyword]: "boolean",
        [SyntaxKind.StringKeyword]: "string",
        [SyntaxKind.VoidKeyword]: "void",
        [SyntaxKind.NullKeyword]: "null",
        [SyntaxKind.UndefinedKeyword]: "undefined",
        [SyntaxKind.AnyKeyword]: "any",
    };

    static fromMembers = (members: NodeArray<TypeElement>, checker: TypeChecker) => members
        .filter(member => member.kind == SyntaxKind.PropertySignature)
        .map(member => new TsProperty(new TsContext(member as PropertySignature, checker)))
    ;
}
