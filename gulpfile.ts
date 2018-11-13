import * as cpp from "child-process-promise";
import * as del from "del";
import * as gulp from "gulp";
import * as sourcemaps from "gulp-sourcemaps";
import * as ts from "gulp-typescript";
import * as path from "path";
import * as through2 from "through2";
import * as File from "vinyl";


const srcFolderName = "src";
const allFolders = "**";


const tsoaTaskName: string = "_tsoa";

const tsoaTaskFunction: () => Promise<void> = async () => {
	const tsoaFileGlobs: Array<string> = [
		path.join(srcFolderName, allFolders, "tsoa.json")
	];
	const folderPathPromise = new Promise<string>((resolve, __) => {
		gulp.src(tsoaFileGlobs)
			.pipe(through2.obj(async (file: File, __, cb: through2.TransformCallback) => {
				resolve(path.dirname(file.path));
				cb(null, file);
			}))
		;
	});
	const folderPath = await folderPathPromise;
	await cpp.exec("tsoa swagger", { cwd: folderPath });
	await cpp.exec("tsoa routes", { cwd: folderPath });
	return;
};

gulp.task(tsoaTaskName, tsoaTaskFunction);


const typescriptTaskName: string = "_ts";

const tsProject = ts.createProject(path.join(".", "tsconfig.json"));
const tsAbsoluteOutDir = tsProject.options.outDir as string;

const typescriptTaskFunction: () => NodeJS.ReadWriteStream = () => {
	const typescriptFileGlobs: Array<string> = [ 
		path.join(srcFolderName, allFolders, "*.ts")
	];
	const writeOptions = {
		sourceRoot: "."	// see https://github.com/Microsoft/vscode/issues/14988
	};
	const src$ = gulp.src(typescriptFileGlobs)
		.pipe(sourcemaps.init())
		.pipe(tsProject())
		.pipe(sourcemaps.write(".", writeOptions))
		.pipe(gulp.dest(tsAbsoluteOutDir))
	;
	return src$;
};

gulp.task(typescriptTaskName, typescriptTaskFunction);


const buildTaskName: string = "build";

gulp.task(
	buildTaskName, 
	gulp.series(
		tsoaTaskName,
		typescriptTaskName
	)
);


const cleanTaskName: string = "clean";

const cleanTaskFunction: () => Promise<void> = async () => {
	const cleanFileGlobs: Array<string> = [
		tsAbsoluteOutDir
	];
	await del(cleanFileGlobs);
	return;
};

gulp.task(cleanTaskName, cleanTaskFunction);


const rebuildTaskName: string = "rebuild";

gulp.task(
	rebuildTaskName,
	gulp.series(
		cleanTaskName,
		buildTaskName
	)
);
