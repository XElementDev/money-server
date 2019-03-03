import * as del from "del";
import * as gulp from "gulp";
import * as path from "path";
import { allFolders } from "./common";
import {
	srcFolderName,
	tsAbsoluteOutDir
	} from "./ts";


export const cleanTaskName: string = "clean";

const cleanTaskFunction: () => Promise<void> = async () => {
	const cleanFileGlobs: Array<string> = [
		tsAbsoluteOutDir,
		path.join(srcFolderName, allFolders, "generated", "routes.ts"),
		path.join(srcFolderName, allFolders, "generated", "swagger.yaml")
	];
	await del(cleanFileGlobs);
	return;
};

gulp.task(cleanTaskName, cleanTaskFunction);
