import gulp from "gulp";
import {
	default as gulpTslint,
	PluginOptions,
	ReportOptions
	} from "gulp-tslint";
import path from "path";
import * as tslint from "tslint";
import Undertaker from "undertaker";
import { SrcOptions } from "vinyl-fs";
import { GulpModel } from "./GulpModel";


function createTslintTaskSync(
	globs: string | Array<string>,
	tslintJsonFileType: "logic-files" | "test-files"
): NodeJS.ReadWriteStream {
	const srcOptions: SrcOptions = {
		since: undefined // always re-run linting on all files
	};
	const tsconfigFilePath = path.join(__dirname, "..", "ts", "tslint-files", "tsconfig.json");
	const program = tslint.Linter.createProgram(tsconfigFilePath);
	const pluginOptions: PluginOptions = {
		configuration: path.join(__dirname, "..", "tslint", tslintJsonFileType, "tslint.json"),
		formatter: "verbose",
		program: program,
		tslint: tslint
	};
	const reportOptions: ReportOptions = {
		summarizeFailureOutput: true
	};
	const src$ = gulp.src(globs, srcOptions)
		.pipe(GulpModel.count((c) => `Going to run \`tslint\` on ${c} file(s).`))
		.pipe(gulpTslint(pluginOptions))
		.pipe(gulpTslint.report(reportOptions))
	;
	return src$;
}


const tslintLogicFilesTaskName: string = "_tslint:logic-files";

const tslintLogicFilesTaskFunction: () => NodeJS.ReadWriteStream = () => {
	const logicFileGlobs: Array<string> = [
		GulpModel.createSrcGlobSync("*.ts"),
		`!${GulpModel.createSrcGlobSync("*.spec.ts")}`
	];
	return createTslintTaskSync(logicFileGlobs, "logic-files");
}

gulp.task(tslintLogicFilesTaskName, tslintLogicFilesTaskFunction);


const tslintTestFilesTaskName: string = "_tslint:test-files";

const tslintTestFilesTaskFunction: () => NodeJS.ReadWriteStream = () => {
	const testFileGlobs: Array<string> = [
		GulpModel.createSrcGlobSync("*.spec.ts")
	];
	return createTslintTaskSync(testFileGlobs, "test-files");
}

gulp.task(tslintTestFilesTaskName, tslintTestFilesTaskFunction);


export const tslintTaskName: string = "_tslint";

const tslintTaskFunction: Undertaker.TaskFunction = gulp.series(
	tslintLogicFilesTaskName,
	tslintTestFilesTaskName
);

gulp.task(tslintTaskName, tslintTaskFunction);
