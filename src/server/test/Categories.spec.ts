import { expect } from "chai";
import * as rpn from "request-promise-native";
import * as urljoin from "url-join";
import { MediaTypeName } from "../../framework/internet/interface";
import {
	Identifiable,
	IdentifiableCategory,
	JsonCategory
	} from "../interface";
import { ServiceTestEnvironment } from "./ServiceTestEnvironment";


describe("/categories", function() {

	let serviceEnv: ServiceTestEnvironment;

	function getCategoriesUrlStr(): string {
		return urljoin(serviceEnv.serviceUrlStr, "categories");
	}

	beforeEach(function() {
		serviceEnv = new ServiceTestEnvironment();
	});

	afterEach(async function() {
		await serviceEnv.dispose();
	});

	describe("POST /", function() {

		it("accepts input in JSON format.", async function() {
			await serviceEnv.create();
			serviceEnv.detailedRpnOptions.json = {};

			const response: rpn.FullResponse = await rpn.post(
				getCategoriesUrlStr(),
				serviceEnv.detailedRpnOptions
			);

			expect(response.statusCode).not.to.equal(415);
		}); // TODO: Why there is "[object Object]" in the log? See lukeautry/tsoa issue #95.

		it("does not accept anything else than JSON.", async function() {
			await serviceEnv.create();
			serviceEnv.detailedRpnOptions.body = "this is some invalid input";
			const contentType: MediaTypeName = "text/plain";
			serviceEnv.detailedRpnOptions.headers = { "Content-Type": contentType };

			const response: rpn.FullResponse = await rpn.post(
				getCategoriesUrlStr(),
				serviceEnv.detailedRpnOptions
			);

			expect(response.statusCode).to.equal(400);
		}); // TODO: Why there is "[object Object]" in the log? See lukeautry/tsoa issue #95.

		it("does not accept semantically wrong JSON.", async function() {
			await serviceEnv.create();
			const semanticallyWrongInput = {
				keyA: "value-for-key-A"
			};
			serviceEnv.detailedRpnOptions.json = semanticallyWrongInput;

			const response: rpn.FullResponse = await rpn.post(
				getCategoriesUrlStr(),
				serviceEnv.detailedRpnOptions
			);

			expect(response.statusCode).to.equal(400);
		}); // TODO: Why there is "[object Object]" in the log? See lukeautry/tsoa issue #95.

		it("accepts semantically correct minimal JSON input.", async function() {
			await serviceEnv.create();
			const minimalJson: JsonCategory = { name: "household" };
			serviceEnv.detailedRpnOptions.json = minimalJson;

			const response: rpn.FullResponse = await rpn.post(
				getCategoriesUrlStr(),
				serviceEnv.detailedRpnOptions
			);

			expect(response.statusCode).to.equal(201);
		});

		it("accepts semantically correct full JSON input.", async function() {
			await serviceEnv.create();
			const fullJson: JsonCategory = {
				logoUrlStr: "https://bit.ly/2HOJsZm", // https://i.pinimg.com/originals/e8/d7/a8/e8d7a8e2533426f1b9f64e8d636c482f.jpg
				name: "food"
			};
			serviceEnv.detailedRpnOptions.json = fullJson;

			const response: rpn.FullResponse = await rpn.post(
				getCategoriesUrlStr(),
				serviceEnv.detailedRpnOptions
			);

			expect(response.statusCode).to.equal(201);
		});

		it("accepts semantically correct full JSON input with extra properties.", async function() {
			await serviceEnv.create();
			const fullJson: JsonCategory = {
				logoUrlStr: "http://example.com/category-logo",
				name: "category-name"
			};
			const fullJsonWithExtras = {
				...fullJson,
				extraKeyA: "extra-value-A",
				extraKeyB: "extra-value-B"
			};
			serviceEnv.detailedRpnOptions.json = fullJsonWithExtras;

			const response: rpn.FullResponse = await rpn.post(
				getCategoriesUrlStr(),
				serviceEnv.detailedRpnOptions
			);

			expect(response.statusCode).to.equal(201);
		});

		it("returns 400 on category name domain errors. (1)", async function() {
			await serviceEnv.create();
			const category: JsonCategory = { name: "" };
			serviceEnv.detailedRpnOptions.json = category;

			const response: rpn.FullResponse = await rpn.post(
				getCategoriesUrlStr(),
				serviceEnv.detailedRpnOptions
			);

			expect(response.statusCode).to.equal(400);
			expect(response.body).to.contain("CategoryNameTooShortError");
		});

		it("returns 400 on category name domain errors. (2)", async function() {
			await serviceEnv.create();
			const category: JsonCategory = { name: "tax" };
			serviceEnv.simpleRpnOptions.json = category;
			serviceEnv.detailedRpnOptions.json = category;

			await rpn.post(getCategoriesUrlStr(), serviceEnv.simpleRpnOptions);
			const response2: rpn.FullResponse = await rpn.post(
				getCategoriesUrlStr(),
				serviceEnv.detailedRpnOptions
			);

			expect(response2.statusCode).to.equal(400);
			expect(response2.body).to.contain("CategoryNameNotUniqueError");
		});

		it("returns 400 on category logo domain errors.", async function() {
			await serviceEnv.create();
			const category: JsonCategory = {
				logoUrlStr: "invalid URL",
				name: "electricity"
			};
			serviceEnv.detailedRpnOptions.json = category;

			const response: rpn.FullResponse = await rpn.post(
				getCategoriesUrlStr(),
				serviceEnv.detailedRpnOptions
			);

			expect(response.statusCode).to.equal(400);
			expect(response.body).to.contain("CategoryLogoUrlInvalidError");
		});

		it("returns 400 on category description domain errors.", async function() {
			await serviceEnv.create();
			const category: JsonCategory = {
				description: "",
				name: "heating"
			};
			serviceEnv.detailedRpnOptions.json = category;

			const response: rpn.FullResponse = await rpn.post(
				getCategoriesUrlStr(),
				serviceEnv.detailedRpnOptions
			);

			expect(response.statusCode).to.equal(400);
			expect(response.body).to.contain("CategoryDescriptionEmptyError");
		});

		it("returns an ID.", async function() {
			await serviceEnv.create();
			const category: JsonCategory = {
				logoUrlStr: "https://bit.ly/2nhkoT9", // https://images.vexels.com/media/users/3/135898/isolated/preview/b427c272b21c80f9bddea2d6d9dbe733-executive-team-peoples-by-vexels.png
				name: "work"
			};
			serviceEnv.simpleRpnOptions.json = category;

			const identifiable: Identifiable = await rpn.post(
				getCategoriesUrlStr(),
				serviceEnv.simpleRpnOptions
			);

			expect(identifiable).to.be.instanceOf(Object);
			expect(identifiable.id).to.be.a("string");
		});

		it("creates locally unique IDs.", async function() {
			await serviceEnv.create();
			const categoryA: JsonCategory = { name: "category A" };
			const categoryB: JsonCategory = { name: "category B" };

			serviceEnv.simpleRpnOptions.json = categoryA;
			const identifiable1: Identifiable = await rpn.post(
				getCategoriesUrlStr(),
				serviceEnv.simpleRpnOptions
			);
			serviceEnv.simpleRpnOptions.json = categoryB;
			const identifiable2: Identifiable = await rpn.post(
				getCategoriesUrlStr(),
				serviceEnv.simpleRpnOptions
			);

			expect(identifiable1.id).to.be.a("string");
			expect(identifiable2.id).to.be.a("string");
			expect(identifiable1.id, "IDs must not match.").not.to.be.equal(identifiable2.id);
		});

	});

	describe("GET /", function() {

		it("returns JSON.", async function() {
			await serviceEnv.create();
			const expectedContentType: MediaTypeName = "application/json";

			const fullResponse: rpn.FullResponse = await rpn.get(
				getCategoriesUrlStr(),
				serviceEnv.detailedRpnOptions
			);

			expect(fullResponse.statusCode).to.be.equal(200);
			const actualContentType = fullResponse.headers["content-type"];
			expect(actualContentType).to.contain(expectedContentType);
		});

		it("returns an empty list initially.", async function() {
			await serviceEnv.create();

			const ids: Array<Identifiable> = await rpn.get(
				getCategoriesUrlStr(),
				serviceEnv.simpleRpnOptions
			);

			expect(ids).to.be.instanceOf(Array);
			expect(ids).to.have.length(0);
		});

		it("returns a +1 list after 1 previous POST.", async function() {
			await serviceEnv.create();
			const category: JsonCategory = {
				logoUrlStr: "https://bit.ly/2mzOgtm", // https://png.pngtree.com/element_pic/17/02/19/4e10739872e26990dfa2dc99a7f106d3.jpg
				name: "sports"
			};

			await rpn.post(getCategoriesUrlStr(), { json: category });
			const ids: Array<Identifiable> = await rpn.get(
				getCategoriesUrlStr(),
				{ json: true }
			);

			expect(ids).to.be.instanceOf(Array);
			expect(ids).to.have.length(1);
		});

		it("returns a +2 list after 2 previous POSTs.", async function() {
			await serviceEnv.create();
			const categoryA: JsonCategory = { name: "education A" };
			const categoryB: JsonCategory = { name: "education B" };

			await rpn.post(getCategoriesUrlStr(), { json: categoryA });
			await rpn.post(getCategoriesUrlStr(), { json: categoryB });
			const ids: Array<Identifiable> = await rpn.get(
				getCategoriesUrlStr(),
				{ json: true }
			);

			expect(ids).to.be.instanceOf(Array);
			expect(ids).to.have.length(2);
		});

		it("returns nothing but a list of IDs.", async function() {
			await serviceEnv.create();
			const identifiable: Identifiable = { id: "some-id" };
			const category: JsonCategory = {
				description: "some-description",
				logoUrlStr: "http://example.com/some-logo-url",
				name: "some-name"
			};
			const expectedKeys = Object.keys(identifiable);
			const notExpectedKeys = Object.keys(category);

			await rpn.post(getCategoriesUrlStr(), { json: category });
			const ids: Array<Identifiable> = await rpn.get(
				getCategoriesUrlStr(),
				{ json: true }
			);

			expect(ids[0]).to.have.keys(expectedKeys);
			expect(ids[0]).not.to.have.any.keys(notExpectedKeys);
		});

	});

	describe("GET /:id", function() {

		it("returns JSON, for an existing entry.", async function() {
			await serviceEnv.create();
			const category: JsonCategory = { name: "furniture" };
			const identifiable: Identifiable = await rpn.post(getCategoriesUrlStr(), { json: category });
			const expectedContentType: MediaTypeName = "application/json";

			const fullResponse: rpn.FullResponse = await rpn.get(
				urljoin(getCategoriesUrlStr(), identifiable.id),
				serviceEnv.detailedRpnOptions
			);

			expect(fullResponse.statusCode).to.be.equal(200);
			const actualContentType = fullResponse.headers["content-type"];
			expect(actualContentType).to.contain(expectedContentType);
		});

		it("returns 404, for a non-existing entry.", async function() {
			await serviceEnv.create();

			const fullResponse: rpn.FullResponse = await rpn.get(
				urljoin(getCategoriesUrlStr(), "some-definitely-non-existing-category-id"),
				serviceEnv.detailedRpnOptions
			);

			expect(fullResponse.statusCode).to.be.equal(404);
		});

		it("returns a previously POSTed Retailer.", async function() {
			await serviceEnv.create();
			const category: JsonCategory = { name: "health" };
			const identifiable: Identifiable = await rpn.post(getCategoriesUrlStr(), { json: category });
			const expectedCategory: IdentifiableCategory = { ...identifiable, ...category };

			const actualCategory = await rpn.get(
				urljoin(getCategoriesUrlStr(), identifiable.id),
				serviceEnv.simpleRpnOptions
			);

			expect(actualCategory).to.be.instanceOf(Object);
			expect(actualCategory).to.deep.equal(expectedCategory);
		});

		it("returns a previously POSTed Retailer in full details.", async function() {
			await serviceEnv.create();
			const category: JsonCategory = {
				description: "some-category-description",
				logoUrlStr: "http://example.com/some-category-logo-url",
				name: "some-category-name"
			};
			const identifiable: Identifiable = await rpn.post(getCategoriesUrlStr(), { json: category });
			const expectedCategory: IdentifiableCategory = { ...identifiable, ...category };

			const actualCategory = await rpn.get(
				urljoin(getCategoriesUrlStr(), identifiable.id),
				serviceEnv.simpleRpnOptions
			);

			expect(actualCategory).to.be.instanceOf(Object);
			expect(actualCategory).to.deep.equal(expectedCategory);
		});

	});

});
