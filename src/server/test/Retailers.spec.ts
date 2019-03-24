import { expect } from "chai";
import * as rpn from "request-promise-native";
import * as urljoin from "url-join";
import { MediaTypeName } from "../../framework/internet/interface";
import { Retailer } from "../interface";
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

		let detailedPostOptions: rpn.RequestPromiseOptions;

		beforeEach(function() {
			detailedPostOptions = {
				resolveWithFullResponse: true,
				simple: false
			};
		});

		it("accepts input in JSON format.", async function() {
			await serviceEnv.create();
			detailedPostOptions.json = {};

			const response: rpn.FullResponse = await rpn.post(
				getRetailersUrlStr(),
				detailedPostOptions
			);

			expect(response.statusCode).not.to.equal(415);
		});

		it("does not accept anything else than JSON.", async function() {
			await serviceEnv.create();
			detailedPostOptions.body = "this is some invalid input";
			const contentType: MediaTypeName = "text/plain";
			detailedPostOptions.headers = { "Content-Type": contentType };

			const response: rpn.FullResponse = await rpn.post(
				getRetailersUrlStr(),
				detailedPostOptions
			);

			expect(response.statusCode).to.equal(400);
		});

		it("does not accept semantically wrong JSON.", async function() {
			await serviceEnv.create();
			const semanticallyWrongInput = {
				keyA: "value-for-key-A"
			};
			detailedPostOptions.json = semanticallyWrongInput;

			const response: rpn.FullResponse = await rpn.post(
				getRetailersUrlStr(),
				detailedPostOptions
			);

			expect(response.statusCode).to.equal(400);
		});

		it("accepts semantically correct minimal JSON input.", async function() {
			await serviceEnv.create();
			const minimalJson: Retailer = { name: "bakery John Doe" };
			detailedPostOptions.json = minimalJson;

			const response: rpn.FullResponse = await rpn.post(
				getRetailersUrlStr(),
				detailedPostOptions
			);

			expect(response.statusCode).to.equal(201);
		});

		it("accepts semantically correct full JSON input.", async function() {
			await serviceEnv.create();
			const fullJson: Retailer = {
				logoUrlStr: "https://i.pinimg.com/originals/e8/d7/a8/e8d7a8e2533426f1b9f64e8d636c482f.jpg",
				name: "canteen Jane Doe"
			};
			detailedPostOptions.json = fullJson;

			const response: rpn.FullResponse = await rpn.post(
				getRetailersUrlStr(),
				detailedPostOptions
			);

			expect(response.statusCode).to.equal(201);
		});

	});

});
