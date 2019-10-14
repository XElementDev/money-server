import { expect } from "chai";
import {
	Retailer,
	RetailerLogo,
	RetailerLogoUrlInvalidError,
	RetailerName,
	RetailerNameNotUniqueError,
	RetailerNameTooShortError
	} from "../../../domain/retailer";


describe("Retailer", function() {

	describe("name", function() {

		it("needs to be a string.", function() {
			const expectedRetailerName = "bakery";

			const retailerName = new RetailerName(expectedRetailerName);
			const actualRetailerName = retailerName.value;

			expect(actualRetailerName).to.equal(expectedRetailerName);
		});

		it("mustn't be empty.", function() {
			expect(() => {
				new RetailerName("");
			}).to.throw(RetailerNameTooShortError);
		});

		it("mustn't be 1 character.", function() {
			expect(() => {
				new RetailerName("A");
			}).to.throw(RetailerNameTooShortError);
		});

		it("needs to have, at minimum, 2 characters.", function() {
			const expectedRetailerName = "DB";

			const retailerName = new RetailerName(expectedRetailerName);
			const actualRetailerName = retailerName.value;

			expect(actualRetailerName).to.equal(expectedRetailerName);
		});

		it("mustn't be whitespace only.", function() {
			expect(() => {
				new RetailerName("  ");
			}).to.throw(RetailerNameTooShortError);
		});

		it("mustn't be 1 character strechted by whitespace.", function() {
			expect(() => {
				new RetailerName("   B  ");
			}).to.throw(RetailerNameTooShortError);
		});

		it("trims leading and trailing whitespace.", function() {
			const expectedRetailerName = "meat market";
			const retailerNameWithWhitespaces = " " + expectedRetailerName + "  ";

			const retailerName = new RetailerName(retailerNameWithWhitespaces);
			const actualRetailerName = retailerName.value;

			expect(actualRetailerName).to.equal(expectedRetailerName);
		});

	});

	it("needs a name.", function() {
		const expectedName = "canteen";

		const retailer = new Retailer({ name: new RetailerName(expectedName) }, []);
		const actualName = retailer.name;

		expect(actualName).to.equal(expectedName);
	});

	it("doesn't allow a non-unique name.", function() {
		const expectedName = "supermarket";
		expect(() => {
			new Retailer(
				{ name: new RetailerName(expectedName) },
				[ new RetailerName(expectedName) ]
			);
		}).to.throw(RetailerNameNotUniqueError);
	});

	it("needs a unique name.", function() {
		const expectedName = "fast food restaraunt";
		const retailerName = new RetailerName(expectedName);

		const retailer = new Retailer({ name: retailerName }, []);
		const actualName = retailer.name;

		expect(actualName).to.equal(expectedName);
	});

	describe("logo", function() {

		it("needs to be a string.", function() {
			const expectedRetailerLogoUrlStr = "https://bit.ly/2Fzqbty"; // https://images.vexels.com/media/users/3/129047/isolated/lists/d83b329197a96fdbea6ae842d8dd5e85-windmill-bakery-logo-svg.png

			const retailerLogo = new RetailerLogo(expectedRetailerLogoUrlStr);
			const actualRetailerLogoUrl = retailerLogo.value;

			expect(actualRetailerLogoUrl).to.equal(expectedRetailerLogoUrlStr);
		});

		it("mustn't be empty.", function() {
			expect(() => {
				new RetailerLogo("");
			}).to.throw(RetailerLogoUrlInvalidError);
		});

		it("mustn't be FTP.", function() {
			expect(() => {
				new RetailerLogo("ftp://ftp.example.com/retailer-logo");
			}).to.throw(RetailerLogoUrlInvalidError);
		});

		it("needs to be a valid URL.", function() {
			const expectedRetailerLogoUrlStr = "https://bit.ly/2HGi8gu"; // https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/MM_S3_RGB_POS.pdf/page1-220px-MM_S3_RGB_POS.pdf.jpg

			const retailerLogo = new RetailerLogo(expectedRetailerLogoUrlStr);
			const actualRetailerLogoUrl = retailerLogo.value;

			expect(actualRetailerLogoUrl).to.equal(expectedRetailerLogoUrlStr);
		});

	});

	it("may have a logo.", function() {
		const expectedLogoUrlStr = "https://bit.ly/2Fzqbty"; // https://images.vexels.com/media/users/3/129047/isolated/lists/d83b329197a96fdbea6ae842d8dd5e85-windmill-bakery-logo-svg.png

		const retailer = new Retailer(
			{ name: new RetailerName("bakery"), logo: new RetailerLogo(expectedLogoUrlStr) },
			[]
		);
		const actualLogoUrlStr = retailer.logo;

		expect(actualLogoUrlStr).to.equal(expectedLogoUrlStr);
	});

	it("doesn't need a logo", function() {
		const retailer = new Retailer({ name: new RetailerName("canteen") }, []);
		const actualLogoUrl = retailer.logo;
		expect(actualLogoUrl).to.be.undefined;
	});

});
