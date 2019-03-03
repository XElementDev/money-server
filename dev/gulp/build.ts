import * as gulp from "gulp";
import * as Undertaker from "undertaker";
import { typescriptTaskName } from "./ts";
import { tslintTaskName } from "./tslint";
import { tsoaTaskName } from "./tsoa";


export const buildTaskName: string = "build";

const buildTaskFunction: Undertaker.TaskFunction = gulp.series(
	tsoaTaskName,
	tslintTaskName,
	typescriptTaskName
);

gulp.task(buildTaskName, buildTaskFunction);
