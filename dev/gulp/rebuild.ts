import * as gulp from "gulp";
import * as Undertaker from "undertaker";
import { buildTaskName } from "./build";
import { cleanTaskName } from "./clean";


const rebuildTaskName: string = "rebuild";

const rebuildTaskFunction: Undertaker.TaskFunction = gulp.series(
	cleanTaskName,
	buildTaskName
);

gulp.task(rebuildTaskName, rebuildTaskFunction);
