import * as cpp from "child-process-promise";
import * as gulp from "gulp";
import * as sourcemaps from "gulp-sourcemaps";
import * as ts from "gulp-typescript";
import * as path from "path";
import * as through2 from "through2";
import * as File from "vinyl";


const srcFolderName = "src";
const allFolders = "**";


const tsoaTaskName: string = "_tsoa";

const tsoaFileGlobs: Array<string> = [
	path.join(srcFolderName, allFolders, "tsoa.json")
];

const tsoaTaskFunction: () => Promise<void> = async () => {
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

const typescriptFileGlobs: Array<string> = [ 
	path.join(srcFolderName, allFolders, "*.ts")
];

const typescriptTaskFunction: () => NodeJS.ReadWriteStream = () => {
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
