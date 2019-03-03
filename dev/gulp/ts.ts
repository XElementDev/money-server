import * as gulp from "gulp";
import * as changed from "gulp-changed";
import * as count from "gulp-count";
import * as sourcemaps from "gulp-sourcemaps";
import * as gulpTs from "gulp-typescript";
import * as path from "path";
import * as ts from "typescript";


export const typescriptTaskName: string = "_ts";

const tsSettings: gulpTs.Settings = {
	typescript: ts
};
const tsProject = gulpTs.createProject(
	path.join(__dirname, "..", "..", "tsconfig.json"),
	tsSettings
);
export const tsAbsoluteOutDir = tsProject.options.outDir as string;
const tsAbsoluteRootDir = tsProject.options.rootDir as string;
export const srcFolderName = tsAbsoluteRootDir.split(path.sep).pop() || "_default-src_";

const typescriptTaskFunction: () => NodeJS.ReadWriteStream = () => {
	const writeOptions: sourcemaps.WriteOptions = {
		sourceRoot: "." // see https://github.com/Microsoft/vscode/issues/14988
	};
	const src$ = tsProject.src()
		.pipe(changed(tsAbsoluteOutDir, { extension: ".js" }))
		.pipe(count("Going to compile <%= counter %> TypeScript file(s)."))
		.pipe(sourcemaps.init())
		.pipe(tsProject())
		.pipe(sourcemaps.write(".", writeOptions))
		.pipe(gulp.dest(tsAbsoluteOutDir))
	;
	return src$;
};

gulp.task(typescriptTaskName, typescriptTaskFunction);
