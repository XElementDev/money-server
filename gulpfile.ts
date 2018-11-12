import * as gulp from "gulp";
import * as sourcemaps from "gulp-sourcemaps";
import * as ts from "gulp-typescript";
import * as path from "path";


const srcFolderName = "src";
const allFolders = "**";


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
		typescriptTaskName
	)
);
