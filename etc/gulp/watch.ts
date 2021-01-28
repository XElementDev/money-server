import gulp from "gulp";
import Undertaker from "undertaker";
import { GulpModel } from "./GulpModel";
import { testTaskFunction } from "./test";


const watchTaskName: string = "watch";

const watchTaskFunction: Undertaker.TaskFunction = () => {
	/*
	 * https://github.com/moby/moby/issues/15793
	 * https://serversforhackers.com/c/docker-for-gulp-build-tasks
	 */
	const opts: gulp.WatchOptions = { usePolling: true };
	gulp.watch(GulpModel.createSrcGlobSync("*"), opts, testTaskFunction);
}

gulp.task(watchTaskName, watchTaskFunction);
