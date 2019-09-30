import * as gulp from "gulp";
import * as gulpTs from "gulp-typescript";
import * as path from "path";
import * as ts from "typescript";
import { SrcOptions } from "vinyl-fs";
import { GulpModel } from "./GulpModel";


export const typescriptTaskName: string = "_ts";

const tsSettings: gulpTs.Settings = { typescript: ts };
const tsconfigFilePath: string = path.join(__dirname, "..", "ts", "src-files", "tsconfig.json");
const tsProject = gulpTs.createProject(
	tsconfigFilePath,
	tsSettings
);
GulpModel.absoluteOutDir = tsProject.options.outDir || "_default-dist_";
GulpModel.absoluteRootDir = tsProject.options.rootDir || "_default-src_";

const typescriptTaskFunction: () => NodeJS.ReadWriteStream = () => {
	const typescriptFileGlobs: Array<string> = [ GulpModel.createSrcGlobSync("*.ts") ];
	const srcOptions: SrcOptions = { since: gulp.lastRun(typescriptTaskName) };
	const src$ = gulp.src(typescriptFileGlobs, srcOptions)
		.pipe(GulpModel.count((c) => `Going to compile ${c} TypeScript file(s).`))
		.pipe(tsProject())
		.pipe(gulp.dest(GulpModel.absoluteOutDir))
	;
	return src$;
};

gulp.task(typescriptTaskName, typescriptTaskFunction);
