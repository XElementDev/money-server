import * as gulp from "gulp";
import * as count from "gulp-count";
import {
	default as gulpTslint,
	PluginOptions,
	ReportOptions
	} from "gulp-tslint";
import * as path from "path";
import * as tslint from "tslint";
import { GulpModel } from "./GulpModel";


export const tslintTaskName: string = "_tslint";

const tslintTaskFunction: () => NodeJS.ReadWriteStream = () => {
	const typescriptFileGlobs: Array<string> = [
		GulpModel.createGlobSync("*.ts")
	];
	const tsconfigFilePath = path.join(__dirname, "..", "ts", "tslint-files", "tsconfig.json");
	const program = tslint.Linter.createProgram(tsconfigFilePath);
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
