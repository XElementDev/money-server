import * as gulp from "gulp";
import * as count from "gulp-count";
import {
	default as gulpTslint,
	PluginOptions,
	ReportOptions
	} from "gulp-tslint";
import * as path from "path";
import * as tslint from "tslint";
import { allFolders } from "./common";
import { srcFolderName } from "./ts";


export const tslintTaskName: string = "_tslint";

const tslintTaskFunction: () => NodeJS.ReadWriteStream = () => {
	const typescriptFileGlobs: Array<string> = [
		path.join(srcFolderName, allFolders, "*.ts")
	];
	const program = tslint.Linter.createProgram(path.join(__dirname, "..", "..", "tsconfig.json"));
	const pluginOptions: PluginOptions = {
		configuration: path.join(__dirname, "..", "..", "tslint.json"),
		formatter: "verbose",
		program: program,
		tslint: tslint
	};
	const reportOptions: ReportOptions = {
		summarizeFailureOutput: true
	};
	const src$ = gulp.src(typescriptFileGlobs)
		.pipe(count("Going to run `tslint` on <%= counter %> file(s)."))
		.pipe(gulpTslint(pluginOptions))
		.pipe(gulpTslint.report(reportOptions))
	;
	return src$;
};

gulp.task(tslintTaskName, tslintTaskFunction);
