/* tslint:disable */
import { Controller, ValidateParam, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
import { PersonController } from './../controllers/PersonController';

const models: TsoaRoute.Models = {
	"IdentifiablePerson": {
		"properties": {
			"id": { "dataType": "string", "required": true },
			"avatarUrlStr": { "dataType": "string" },
			"prename": { "dataType": "string", "required": true },
			"surname": { "dataType": "string", "required": true },
		},
	},
};

export function RegisterRoutes(app: any) {
	app.get('/v0/persons',
		function(request: any, response: any, next: any) {
			const args = {
			};

			let validatedArgs: any[] = [];
			try {
				validatedArgs = getValidatedArgs(args, request);
			} catch (err) {
				return next(err);
			}

			const controller = new PersonController();


			const promise = controller.getPersonsSync.apply(controller, validatedArgs);
			promiseHandler(controller, promise, response, next);
		});
	app.get('/v0/persons/:id',
		function(request: any, response: any, next: any) {
			const args = {
				id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
			};

			let validatedArgs: any[] = [];
			try {
				validatedArgs = getValidatedArgs(args, request);
			} catch (err) {
				return next(err);
			}

			const controller = new PersonController();


			const promise = controller.getPersonSync.apply(controller, validatedArgs);
			promiseHandler(controller, promise, response, next);
		});


	function promiseHandler(controllerObj: any, promise: any, response: any, next: any) {
		return Promise.resolve(promise)
			.then((data: any) => {
				let statusCode;
				if (controllerObj instanceof Controller) {
					const controller = controllerObj as Controller
					const headers = controller.getHeaders();
					Object.keys(headers).forEach((name: string) => {
						response.set(name, headers[name]);
					});

					statusCode = controller.getStatus();
				}

				if (data) {
					response.status(statusCode || 200).json(data);
				} else {
					response.status(statusCode || 204).end();
				}
			})
			.catch((error: any) => next(error));
	}

	function getValidatedArgs(args: any, request: any): any[] {
		const fieldErrors: FieldErrors = {};
		const values = Object.keys(args).map((key) => {
			const name = args[key].name;
			switch (args[key].in) {
				case 'request':
					return request;
				case 'query':
					return ValidateParam(args[key], request.query[name], models, name, fieldErrors);
				case 'path':
					return ValidateParam(args[key], request.params[name], models, name, fieldErrors);
				case 'header':
					return ValidateParam(args[key], request.header(name), models, name, fieldErrors);
				case 'body':
					return ValidateParam(args[key], request.body, models, name, fieldErrors, name + '.');
				case 'body-prop':
					return ValidateParam(args[key], request.body[name], models, name, fieldErrors, 'body.');
			}
		});
		if (Object.keys(fieldErrors).length > 0) {
			throw new ValidateError(fieldErrors, '');
		}
		return values;
	}
}
