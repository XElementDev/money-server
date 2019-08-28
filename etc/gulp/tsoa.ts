import * as cpp from "child-process-promise";
import * as gulp from "gulp";
import * as ListStream from "list-stream";
import * as path from "path";
import * as File from "vinyl";
import { SrcOptions } from "vinyl-fs";
import { GulpModel } from "./GulpModel";


export const tsoaTaskName: string = "_tsoa";

async function exec(command: string, cppOptions: unknown): Promise<void> {
	const execResult = await cpp.exec(command, cppOptions);
	process.stdout.write(execResult.stdout);
	if (execResult.stderr !== "") {
		throw new Error(execResult.stderr);
	}
	return;
}

const tsoaTaskFunction: () => Promise<void> = async () => {
	const tsoaFileGlobs: Array<string> = [
		GulpModel.createSrcGlobSync("tsoa.json")
	];
	const srcOptions: SrcOptions = {
		read: false,
		since: gulp.lastRun(tsoaTaskName)
	};
	const folderPathsPromise = new Promise<Array<string>>((resolve, reject) => {
		gulp.src(tsoaFileGlobs, srcOptions)
			.pipe(ListStream.obj((err: any, fileInfos: Array<File>) => {
				if (err) { reject(err); }
				else { resolve(fileInfos.map((fi) => path.dirname(fi.path))); }
			}))
		;
	});
	const folderPaths = await folderPathsPromise;
	console.log(`Going to run \`tsoa\` on ${folderPaths.length} folder(s).`);
	const tsoaCmdPath = path.join(GulpModel.absoluteCommandFolderPath, "tsoa");
	for (const folderPath of folderPaths) {
		await exec(`${tsoaCmdPath} swagger`, { cwd: folderPath });
		await exec(`${tsoaCmdPath} routes`, { cwd: folderPath });
	}
	return;
};

gulp.task(tsoaTaskName, tsoaTaskFunction);
