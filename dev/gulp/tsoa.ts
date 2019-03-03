import * as cpp from "child-process-promise";
import * as gulp from "gulp";
import * as count from "gulp-count";
import * as path from "path";
import * as through2 from "through2";
import * as File from "vinyl";
import { SrcOptions } from "vinyl-fs";
import { allFolders } from "./common";
import { srcFolderName } from "./ts";


export const tsoaTaskName: string = "_tsoa";

const tsoaTaskFunction: () => Promise<void> = async () => {
	const tsoaFileGlobs: Array<string> = [
		path.join(srcFolderName, allFolders, "tsoa.json")
	];
	const srcOptions: SrcOptions = {
		read: false
	};
	const folderPathPromise = new Promise<string>((resolve, __) => {
		gulp.src(tsoaFileGlobs, srcOptions)
			.pipe(through2.obj(async (file: File, __, cb: through2.TransformCallback) => {
				resolve(path.dirname(file.path));
				cb(null, file);
			}))
		;
	});
	const tsoaCmdPath = path.join(__dirname, ".", "node_modules", ".bin", "tsoa");
	const folderPath = await folderPathPromise;
	await cpp.exec(`${tsoaCmdPath} swagger`, { cwd: folderPath });
	await cpp.exec(`${tsoaCmdPath} routes`, { cwd: folderPath });
	return;
};

gulp.task(tsoaTaskName, tsoaTaskFunction);
