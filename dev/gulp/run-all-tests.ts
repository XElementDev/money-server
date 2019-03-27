import * as gulp from "gulp";
import * as count from "gulp-count";
import * as gulpMocha from "gulp-mocha";
import * as path from "path";
import { SrcOptions } from "vinyl-fs";
import { GulpModel } from "./GulpModel";


export const runAllTestsTaskName: string = "_runAllTests";

const runAllTestsTaskFunction: () => NodeJS.ReadWriteStream = () => {
	const srcOptions: SrcOptions = { read: false };
	const mochaSetupOptions: MochaSetupOptions = {
		reporter: "spec"
	};
	const globs: Array<string> = [
		path.join(GulpModel.absoluteOutDir, GulpModel.ALL_FOLDERS, "*.spec.js")
	];
	const src$ = gulp.src(globs, srcOptions)
		.pipe(count("Going to run tests from <%= counter %> file(s)."))
		.pipe(gulpMocha(mochaSetupOptions))
	;
	return src$;
};

gulp.task(runAllTestsTaskName, runAllTestsTaskFunction);
