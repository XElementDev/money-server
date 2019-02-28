import * as cpp from "child-process-promise";
import * as del from "del";
import * as gulp from "gulp";
import * as changed from "gulp-changed";
import * as count from "gulp-count";
import * as sourcemaps from "gulp-sourcemaps";
import {
	default as gulpTslint,
	PluginOptions,
	ReportOptions
	} from "gulp-tslint";
import * as gulpTs from "gulp-typescript";
import * as path from "path";
import * as through2 from "through2";
import * as tslint from "tslint";
import * as ts from "typescript";
import * as File from "vinyl";
import { SrcOptions } from "vinyl-fs";


const srcFolderName = "src";
const allFolders = "**";


const tsoaTaskName: string = "_tsoa";

const tsoaTaskFunction: () => Promise<void> = async () => {
	const tsoaFileGlobs: Array<string> = [
		path.join(srcFolderName, allFolders, "tsoa.json")
	];
	const srcOptions: SrcOptions = {
		read: false
	};
	const folderPathPromise = new Promise<string>((resolve, __) => {
		gulp.src(tsoaFileGlobs, srcOptions)
			.pipe(through2.obj(async (file: File, __, cb: through2.TransformCallback) => {
				resolve(path.dirname(file.path));
				cb(null, file);
			}))
		;
	});
	const tsoaCmdPath = path.join(__dirname, ".", "node_modules", ".bin", "tsoa");
	const folderPath = await folderPathPromise;
	await cpp.exec(`${tsoaCmdPath} swagger`, { cwd: folderPath });
	await cpp.exec(`${tsoaCmdPath} routes`, { cwd: folderPath });
	return;
};

gulp.task(tsoaTaskName, tsoaTaskFunction);


const tslintTaskName: string = "_tslint";

const tslintTaskFunction: () => NodeJS.ReadWriteStream = () => {
	const typescriptFileGlobs: Array<string> = [
		path.join(srcFolderName, allFolders, "*.ts")
	];
	const program = tslint.Linter.createProgram(path.join(__dirname, ".", "tsconfig.json"));
	const pluginOptions: PluginOptions = {
		configuration: path.join(__dirname, ".", "tslint.json"),
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


const typescriptTaskName: string = "_ts";

const tsSettings: gulpTs.Settings = {
	typescript: ts
};
const tsProject = gulpTs.createProject(
	path.join(".", "tsconfig.json"),
	tsSettings
);
const tsAbsoluteOutDir = tsProject.options.outDir as string;

const typescriptTaskFunction: () => NodeJS.ReadWriteStream = () => {
	const writeOptions: sourcemaps.WriteOptions = {
		sourceRoot: "." // see https://github.com/Microsoft/vscode/issues/14988
	};
	const src$ = tsProject.src()
		.pipe(changed(tsAbsoluteOutDir, { extension: ".js" }))
		.pipe(count("Going to compile <%= counter %> TypeScript file(s)."))
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
		tslintTaskName,
		typescriptTaskName
	)
);


const cleanTaskName: string = "clean";

const cleanTaskFunction: () => Promise<void> = async () => {
	const cleanFileGlobs: Array<string> = [
		tsAbsoluteOutDir,
		path.join(srcFolderName, allFolders, "generated", "routes.ts"),
		path.join(srcFolderName, allFolders, "generated", "swagger.yaml")
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
