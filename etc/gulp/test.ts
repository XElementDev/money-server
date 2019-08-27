import * as gulp from "gulp";
import * as Undertaker from "undertaker";
import { buildTaskName } from "./build";
import { runAllTestsTaskName } from "./run-all-tests";


const testTaskName: string = "test";

export const testTaskFunction: Undertaker.TaskFunction = gulp.series(
	buildTaskName,
	runAllTestsTaskName
);

gulp.task(testTaskName, testTaskFunction);
