import * as del from "del";
import * as gulp from "gulp";
import { GulpModel } from "./GulpModel";


export const cleanTaskName: string = "clean";

const cleanTaskFunction: () => Promise<void> = async () => {
	const cleanFileGlobs: Array<string> = [
		GulpModel.absoluteOutDir,
		GulpModel.createSrcGlobSync("generated", "routes.ts"),
		GulpModel.createSrcGlobSync("generated", "swagger.yaml")
	];
	await del(cleanFileGlobs);
	return;
};

gulp.task(cleanTaskName, cleanTaskFunction);
