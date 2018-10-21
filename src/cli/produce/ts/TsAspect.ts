import { TsInterface, TsContext, TsSchemaTag } from ".";
import { InterfaceDeclaration } from "typescript";

/**

    Aspects are interfaces marked with "aspect" JSDoc directive.

 */
export class TsAspect extends TsInterface {
    constructor(
        public readonly context: TsContext<InterfaceDeclaration>,
        public alias: string
    ) {
        super(context);
    }

    static fromContext(context: TsContext<InterfaceDeclaration>): TsAspect | TsInterface {
        const tag = context.getUniqueDoc(TsSchemaTag.aspect);

        if (tag) {
            if (!tag.value) {
                // TODO: Calculate by convention?
                throw new Error("Aspect JSDoc requires a value");
            }

            return new TsAspect(context, tag.value);
        }

        return new TsInterface(context);
    }
}
