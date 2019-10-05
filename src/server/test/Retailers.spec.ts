import { expect } from "chai";
import * as rpn from "request-promise-native";
import * as urljoin from "url-join";
import { MediaTypeName } from "../../framework/internet/interface";
import {
	Identifiable,
	IdentifiableRetailer,
	Retailer
	} from "../interface";
import { ServiceTestEnvironment } from "./ServiceTestEnvironment";


describe("/retailers", function() {

	let serviceEnv: ServiceTestEnvironment;

	function getRetailersUrlStr(): string {
		return urljoin(serviceEnv.serviceUrlStr, "retailers");
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
				getRetailersUrlStr(),
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
				getRetailersUrlStr(),
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
				getRetailersUrlStr(),
				serviceEnv.detailedRpnOptions
			);

			expect(response.statusCode).to.equal(400);
		}); // TODO: Why there is "[object Object]" in the log? See lukeautry/tsoa issue #95.

		it("accepts semantically correct minimal JSON input.", async function() {
			await serviceEnv.create();
			const minimalJson: Retailer = { name: "bakery John Doe" };
			serviceEnv.detailedRpnOptions.json = minimalJson;

			const response: rpn.FullResponse = await rpn.post(
				getRetailersUrlStr(),
				serviceEnv.detailedRpnOptions
			);

			expect(response.statusCode).to.equal(201);
		});

		it("accepts semantically correct full JSON input.", async function() {
			await serviceEnv.create();
			const fullJson: Retailer = {
				logoUrlStr: "https://bit.ly/2HOJsZm", // https://i.pinimg.com/originals/e8/d7/a8/e8d7a8e2533426f1b9f64e8d636c482f.jpg
				name: "canteen Jane Doe"
			};
			serviceEnv.detailedRpnOptions.json = fullJson;

			const response: rpn.FullResponse = await rpn.post(
				getRetailersUrlStr(),
				serviceEnv.detailedRpnOptions
			);

			expect(response.statusCode).to.equal(201);
		});

		it("accepts semantically correct full JSON input with extra properties.", async function() {
			await serviceEnv.create();
			const fullJson: Retailer = {
				logoUrlStr: "retailer-logo",
				name: "retailer-name"
			};
			const fullJsonWithExtras = {
				...fullJson,
				extraKeyA: "extra-value-A",
				extraKeyB: "extra-value-B"
			};
			serviceEnv.detailedRpnOptions.json = fullJsonWithExtras;

			const response: rpn.FullResponse = await rpn.post(
				getRetailersUrlStr(),
				serviceEnv.detailedRpnOptions
			);

			expect(response.statusCode).to.equal(201);
		});

		it("returns an ID.", async function() {
			await serviceEnv.create();
			const retailer: Retailer = {
				logoUrlStr: "https://bit.ly/2Fzqbty", // https://images.vexels.com/media/users/3/129047/isolated/lists/d83b329197a96fdbea6ae842d8dd5e85-windmill-bakery-logo-svg.png
				name: "bakery"
			};
			serviceEnv.simpleRpnOptions.json = retailer;

			const identifiable: Identifiable = await rpn.post(
				getRetailersUrlStr(),
				serviceEnv.simpleRpnOptions
			);

			expect(identifiable).to.be.instanceOf(Object);
			expect(identifiable.id).to.be.a("string");
		});

		it("creates locally unique IDs.", async function() {
			await serviceEnv.create();
			const retailer: Retailer = {
				logoUrlStr: "https://bit.ly/2HGi8gu", // https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/MM_S3_RGB_POS.pdf/page1-220px-MM_S3_RGB_POS.pdf.jpg
				name: "meat market"
			};
			serviceEnv.simpleRpnOptions.json = retailer;

			const identifiable1: Identifiable = await rpn.post(
				getRetailersUrlStr(),
				serviceEnv.simpleRpnOptions
			);
			const identifiable2: Identifiable = await rpn.post(
				getRetailersUrlStr(),
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
				getRetailersUrlStr(),
				serviceEnv.detailedRpnOptions
			);

			expect(fullResponse.statusCode).to.be.equal(200);
			const actualContentType = fullResponse.headers["content-type"];
			expect(actualContentType).to.contain(expectedContentType);
		});

		it("returns an empty list initially.", async function() {
			await serviceEnv.create();

			const ids: Array<Identifiable> = await rpn.get(
				getRetailersUrlStr(),
				serviceEnv.simpleRpnOptions
			);

			expect(ids).to.be.instanceOf(Array);
			expect(ids).to.have.length(0);
		});

		it("returns a +1 list after 1 previous POST.", async function() {
			await serviceEnv.create();
			const retailer: Retailer = { name: "supermarket A" };

			await rpn.post(getRetailersUrlStr(), { json: retailer });
			const ids: Array<Identifiable> = await rpn.get(
				getRetailersUrlStr(),
				{ json: true }
			);

			expect(ids).to.be.instanceOf(Array);
			expect(ids).to.have.length(1);
		});

		it("returns a +2 list after 2 previous POSTs.", async function() {
			await serviceEnv.create();
			const retailer: Retailer = { name: "supermarket B" };

			await rpn.post(getRetailersUrlStr(), { json: retailer });
			await rpn.post(getRetailersUrlStr(), { json: retailer });
			const ids: Array<Identifiable> = await rpn.get(
				getRetailersUrlStr(),
				{ json: true }
			);

			expect(ids).to.be.instanceOf(Array);
			expect(ids).to.have.length(2);
		});

		it("returns nothing but a list of IDs.", async function() {
			await serviceEnv.create();
			const identifiable: Identifiable = { id: "some-id" };
			const retailer: Retailer = {
				logoUrlStr: "some-logo-url",
				name: "some-name"
			};
			const expectedKeys = Object.keys(identifiable);
			const notExpectedKeys = Object.keys(retailer);

			await rpn.post(getRetailersUrlStr(), { json: retailer });
			const ids: Array<Identifiable> = await rpn.get(
				getRetailersUrlStr(),
				{ json: true }
			);

			expect(ids[0]).to.have.keys(expectedKeys);
			expect(ids[0]).not.to.have.any.keys(notExpectedKeys);
		});

	});

	describe("GET /:id", function() {

		it("returns JSON, for an existing entry.", async function() {
			await serviceEnv.create();
			const retailer: Retailer = { name: "canteen A" };
			const identifiable: Identifiable = await rpn.post(getRetailersUrlStr(), { json: retailer });
			const expectedContentType: MediaTypeName = "application/json";

			const fullResponse: rpn.FullResponse = await rpn.get(
				urljoin(getRetailersUrlStr(), identifiable.id),
				serviceEnv.detailedRpnOptions
			);

			expect(fullResponse.statusCode).to.be.equal(200);
			const actualContentType = fullResponse.headers["content-type"];
			expect(actualContentType).to.contain(expectedContentType);
		});

		it("returns 404, for a non-existing entry.", async function() {
			await serviceEnv.create();

			const fullResponse: rpn.FullResponse = await rpn.get(
				urljoin(getRetailersUrlStr(), "some-definitely-non-existing-id"),
				serviceEnv.detailedRpnOptions
			);

			expect(fullResponse.statusCode).to.be.equal(404);
		});

		it("returns a previously POSTed Retailer.", async function() {
			await serviceEnv.create();
			const retailer: Retailer = { name: "bakery B" };
			const identifiable: Identifiable = await rpn.post(getRetailersUrlStr(), { json: retailer });
			const expectedRetailer: IdentifiableRetailer = { ...identifiable, ...retailer };

			const actualRetailer = await rpn.get(
				urljoin(getRetailersUrlStr(), identifiable.id),
				serviceEnv.simpleRpnOptions
			);

			expect(actualRetailer).to.be.instanceOf(Object);
			expect(actualRetailer).to.deep.equal(expectedRetailer);
		});

		it("returns a previously POSTed Retailer in full details.", async function() {
			await serviceEnv.create();
			const retailer: Retailer = {
				logoUrlStr: "some-retailer-logo-url",
				name: "some-retailer-name"
			};
			const identifiable: Identifiable = await rpn.post(getRetailersUrlStr(), { json: retailer });
			const expectedRetailer: IdentifiableRetailer = { ...identifiable, ...retailer };

			const actualRetailer = await rpn.get(
				urljoin(getRetailersUrlStr(), identifiable.id),
				serviceEnv.simpleRpnOptions
			);

			expect(actualRetailer).to.be.instanceOf(Object);
			expect(actualRetailer).to.deep.equal(expectedRetailer);
		});

	});

});
