import * as colors from "ansi-colors";
import path from "path";
import through from "through2";


export class GulpModel {

	private constructor() {
		return;
	}


	public static readonly ALL_FOLDERS: string = "**";


	public static get absoluteCommandFolderPath(): string {
		return path.join(__dirname, "..", "..", "node_modules", ".bin");
	}


	public static get absoluteOutDir(): string {
		if (this._absoluteOutDir === undefined) {
			throw new Error("Error inside custom gulp pipeline: `absoluteOutDir` is undefined.");
		}
		else { return this._absoluteOutDir; }
	}

	public static set absoluteOutDir(value: string) { this._absoluteOutDir = value; }

	private static _absoluteOutDir: string | undefined;


	public static get absoluteRootDir(): string {
		if (this._absoluteRootDir === undefined) {
			throw new Error("Error inside custom gulp pipeline: `absoluteRootDir` is undefined.");
		}
		else { return this._absoluteRootDir; }
	}

	public static set absoluteRootDir(value: string) { this._absoluteRootDir = value; }

	private static _absoluteRootDir: string | undefined;


	public static createSrcGlobSync(...subPaths: Array<string>): string {
		return path.join(this.absoluteRootDir, GulpModel.ALL_FOLDERS, ...subPaths);
	}


	public static count(
		messageTemplate: (count: string) => string
	): NodeJS.ReadWriteStream {
		let counter: number = 0;
		return through.obj(
			(chunk: any, __, callback) => {
				++counter;
				callback(null, chunk);
			},
			(callback) => {
				const counterStr = colors.magenta(counter.toString());
				const message = messageTemplate(counterStr);
				console.log(message);
				callback();
			}
		);
	}

}
