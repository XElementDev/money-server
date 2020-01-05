/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CategoryController } from './../controllers/CategoryController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PersonController } from './../controllers/PersonController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { RetailerController } from './../controllers/RetailerController';
import * as express from 'express';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
	"Identifiable": {
		"properties": {
			"id": { "dataType": "string", "required": true },
		},
		"additionalProperties": false,
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	"JsonCategory": {
		"properties": {
			"description": { "dataType": "string" },
			"logoUrlStr": { "dataType": "string" },
			"name": { "dataType": "string", "required": true },
		},
		"additionalProperties": false,
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	"IdentifiableCategory": {
		"properties": {
			"description": { "dataType": "string" },
			"logoUrlStr": { "dataType": "string" },
			"name": { "dataType": "string", "required": true },
			"id": { "dataType": "string", "required": true },
		},
		"additionalProperties": false,
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	"IdentifiablePerson": {
		"properties": {
			"id": { "dataType": "string", "required": true },
			"avatarUrlStr": { "dataType": "string" },
			"prename": { "dataType": "string", "required": true },
			"surname": { "dataType": "string", "required": true },
		},
		"additionalProperties": false,
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	"Retailer": {
		"properties": {
			"logoUrlStr": { "dataType": "string" },
			"name": { "dataType": "string", "required": true },
		},
		"additionalProperties": false,
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	"IdentifiableRetailer": {
		"properties": {
			"id": { "dataType": "string", "required": true },
			"logoUrlStr": { "dataType": "string" },
			"name": { "dataType": "string", "required": true },
		},
		"additionalProperties": false,
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: express.Express) {
	// ###########################################################################################################
	//  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
	//      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
	// ###########################################################################################################
	app.post('/v0/categories',
		function(request: any, response: any, next: any) {
			const args = {
				requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "JsonCategory" },
			};

			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = getValidatedArgs(args, request);
			} catch (err) {
				return next(err);
			}

			const controller = new CategoryController();


			const promise = controller.createCategory.apply(controller, validatedArgs as any);
			promiseHandler(controller, promise, response, next);
		});
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	app.get('/v0/categories',
		function(request: any, response: any, next: any) {
			const args = {
			};

			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = getValidatedArgs(args, request);
			} catch (err) {
				return next(err);
			}

			const controller = new CategoryController();


			const promise = controller.readCategories.apply(controller, validatedArgs as any);
			promiseHandler(controller, promise, response, next);
		});
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	app.get('/v0/categories/:id',
		function(request: any, response: any, next: any) {
			const args = {
				id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
			};

			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = getValidatedArgs(args, request);
			} catch (err) {
				return next(err);
			}

			const controller = new CategoryController();


			const promise = controller.readCategory.apply(controller, validatedArgs as any);
			promiseHandler(controller, promise, response, next);
		});
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	app.get('/v0/persons',
		function(request: any, response: any, next: any) {
			const args = {
			};

			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = getValidatedArgs(args, request);
			} catch (err) {
				return next(err);
			}

			const controller = new PersonController();


			const promise = controller.getPersonsSync.apply(controller, validatedArgs as any);
			promiseHandler(controller, promise, response, next);
		});
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	app.get('/v0/persons/:id',
		function(request: any, response: any, next: any) {
			const args = {
				id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
			};

			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = getValidatedArgs(args, request);
			} catch (err) {
				return next(err);
			}

			const controller = new PersonController();


			const promise = controller.getPersonSync.apply(controller, validatedArgs as any);
			promiseHandler(controller, promise, response, next);
		});
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	app.post('/v0/retailers',
		function(request: any, response: any, next: any) {
			const args = {
				requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "Retailer" },
			};

			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = getValidatedArgs(args, request);
			} catch (err) {
				return next(err);
			}

			const controller = new RetailerController();


			const promise = controller.createRetailer.apply(controller, validatedArgs as any);
			promiseHandler(controller, promise, response, next);
		});
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	app.get('/v0/retailers/:id',
		function(request: any, response: any, next: any) {
			const args = {
				id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
			};

			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = getValidatedArgs(args, request);
			} catch (err) {
				return next(err);
			}

			const controller = new RetailerController();


			const promise = controller.readRetailer.apply(controller, validatedArgs as any);
			promiseHandler(controller, promise, response, next);
		});
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	app.get('/v0/retailers',
		function(request: any, response: any, next: any) {
			const args = {
			};

			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = getValidatedArgs(args, request);
			} catch (err) {
				return next(err);
			}

			const controller = new RetailerController();


			const promise = controller.readRetailers.apply(controller, validatedArgs as any);
			promiseHandler(controller, promise, response, next);
		});
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

	function isController(object: any): object is Controller {
		return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
	}

	function promiseHandler(controllerObj: any, promise: any, response: any, next: any) {
		return Promise.resolve(promise)
			.then((data: any) => {
				let statusCode;
				if (isController(controllerObj)) {
					const headers = controllerObj.getHeaders();
					Object.keys(headers).forEach((name: string) => {
						response.set(name, headers[name]);
					});

					statusCode = controllerObj.getStatus();
				}

				// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

				if (data || data === false) { // === false allows boolean result
					response.status(statusCode || 200).json(data);
				} else {
					response.status(statusCode || 204).end();
				}
			})
			.catch((error: any) => next(error));
	}

	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

	function getValidatedArgs(args: any, request: any): any[] {
		const fieldErrors: FieldErrors = {};
		const values = Object.keys(args).map((key) => {
			const name = args[key].name;
			switch (args[key].in) {
				case 'request':
					return request;
				case 'query':
					return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "silently-remove-extras", "specVersion": 3 });
				case 'path':
					return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "silently-remove-extras", "specVersion": 3 });
				case 'header':
					return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "silently-remove-extras", "specVersion": 3 });
				case 'body':
					return validationService.ValidateParam(args[key], request.body, name, fieldErrors, name + '.', { "noImplicitAdditionalProperties": "silently-remove-extras", "specVersion": 3 });
				case 'body-prop':
					return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', { "noImplicitAdditionalProperties": "silently-remove-extras", "specVersion": 3 });
			}
		});

		if (Object.keys(fieldErrors).length > 0) {
			throw new ValidateError(fieldErrors, '');
		}
		return values;
	}

	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
