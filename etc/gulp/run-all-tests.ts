import gulp from "gulp";
import gulpMocha from "gulp-mocha";
import path from "path";
import { SrcOptions } from "vinyl-fs";
import { GulpModel } from "./GulpModel";


export const runAllTestsTaskName: string = "_runAllTests";

const runAllTestsTaskFunction: () => NodeJS.ReadWriteStream = () => {
	const srcOptions: SrcOptions = {
		read: false,
		since: undefined // always re-run tests from all files
	};
	const mochaSetupOptions: Mocha.MochaOptions = {
		reporter: "spec"
	};
	const globs: Array<string> = [
		path.join(GulpModel.absoluteOutDir, GulpModel.ALL_FOLDERS, "*.spec.js")
	];
	const src$ = gulp.src(globs, srcOptions)
		.pipe(GulpModel.count((c) => `Going to run tests from ${c} file(s).`))
		.pipe(gulpMocha(mochaSetupOptions))
	;
	return src$;
};

gulp.task(runAllTestsTaskName, runAllTestsTaskFunction);
