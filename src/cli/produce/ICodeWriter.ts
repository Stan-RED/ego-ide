import { ITextWriter } from "../../core";

/**

    This interface is responsible for more sophisticated text generation
    routines specifically targeting code writing.

 */
export interface ICodeWriter extends ITextWriter {
    /**
     * Start artifact code.
     * 
     * @remarks
     * Code may contain many artifacts (usually each one is saved into a
     * separate file). This method informs writer about new artifact
     * started.
     * 
     * @param name - Name of the code artifact. 
     */
    startArtifact(name: string): void;

    endArtifact(): void;

    startScope(name: string): void;
    endScope(): void;
}
