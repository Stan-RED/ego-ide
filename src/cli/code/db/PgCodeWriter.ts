import fs from "fs";
import { ICodeWriter } from '../ICodeWriter';
import { IDisposable } from '../../../core';

export class PgCodeWriter implements ICodeWriter, IDisposable  {
    private readonly _artifacts: string[] = [];
    private readonly _stream: fs.WriteStream;

    constructor(public readonly fileName: string) {
        this._stream = fs.createWriteStream(
            fileName,
            { encoding: "utf8" }
        );
    }

    dispose() {
        while (this._artifacts.length) {
            this.endArtifact();
        }

        this._stream.end();
    }

    startArtifact(name: string): void {
        this.writeComment(`ARTIFACT START: ${name}\n`);

        this._artifacts.push(name);
    }
    
    endArtifact(): void {
        var name = this._artifacts.pop();

        this.writeComment(`ARTIFACT END: ${name}\n`);
    }

    startScope(name: string): void {
        
    }

    endScope(): void {
        
    }

    write(text: string): void {
        this._stream.write(text);
    }

    writeComment(comment: string) {
        this.write(`-- ${comment}`)
    }
}
