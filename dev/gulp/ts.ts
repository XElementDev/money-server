import * as gulp from "gulp";
import * as changed from "gulp-changed";
import * as count from "gulp-count";
import * as sourcemaps from "gulp-sourcemaps";
import * as gulpTs from "gulp-typescript";
import * as path from "path";
import * as ts from "typescript";
import { SrcOptions } from "vinyl-fs";
import { GulpModel } from "./GulpModel";


export const typescriptTaskName: string = "_ts";

const tsSettings: gulpTs.Settings = {
	typescript: ts
};
const tsconfigFilePath: string = path.join(__dirname, "..", "ts", "src-files", "tsconfig.json");
const tsProject = gulpTs.createProject(
	tsconfigFilePath,
	tsSettings
);
GulpModel.absoluteOutDir = tsProject.options.outDir || "_default-dist_";
GulpModel.absoluteRootDir = tsProject.options.rootDir || "_default-src_";

const typescriptTaskFunction: () => NodeJS.ReadWriteStream = () => {
	const typescriptFileGlobs: Array<string> = [
		GulpModel.createSrcGlobSync("*.ts")
	];
	const writeOptions: sourcemaps.WriteOptions = {
		sourceRoot: GulpModel.absoluteRootDir
	};
	const src$ = gulp.src(typescriptFileGlobs)
		.pipe(changed(GulpModel.absoluteOutDir, { extension: ".js" }))
		.pipe(count("Going to compile <%= counter %> TypeScript file(s)."))
		.pipe(sourcemaps.init())
		.pipe(tsProject())
		.pipe(sourcemaps.write(".", writeOptions))
		.pipe(gulp.dest(GulpModel.absoluteOutDir))
	;
	return src$;
};

gulp.task(typescriptTaskName, typescriptTaskFunction);
