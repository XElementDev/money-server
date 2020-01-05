import { expect } from "chai";
import {
	Category,
	CategoryDescription,
	CategoryDescriptionEmptyError,
	CategoryLogo,
	CategoryLogoUrlInvalidError,
	CategoryName,
	CategoryNameNotUniqueError,
	CategoryNameTooShortError
	} from "../../../domain/category";


describe("Category", function() {

	describe("name", function() {

		it("needs to be a string.", function() {
			const expectedCategoryName = "food";

			const categoryName = new CategoryName(expectedCategoryName);
			const actualCategoryName = categoryName.value;

			expect(actualCategoryName).to.be.a("string");
			expect(actualCategoryName).to.equal(expectedCategoryName);
		});

		it("mustn't be empty.", function() {
			let error: Error | undefined;
			try {
				new CategoryName("");
			} catch (err) {
				error = err as Error;
			}
			expect(error).not.to.be.undefined;
			expect(error).to.be.instanceOf(CategoryNameTooShortError);
			expect(error!.name).to.equal("CategoryNameTooShortError");
		});

		it("mustn't be 1 character.", function() {
			let error: Error | undefined;
			try {
				new CategoryName("A");
			} catch (err) {
				error = err as Error;
			}
			expect(error).not.to.be.undefined;
			expect(error).to.be.instanceOf(CategoryNameTooShortError);
			expect(error!.name).to.equal("CategoryNameTooShortError");
		});

		it("needs to have, at minimum, 2 characters.", function() {
			const expectedCategoryName = "ad"; // advertisement

			const categoryName = new CategoryName(expectedCategoryName);
			const actualCategoryName = categoryName.value;

			expect(actualCategoryName).to.equal(expectedCategoryName);
		});

		it("mustn't be whitespace only.", function() {
			let error: Error | undefined;
			try {
				new CategoryName("  ");
			} catch (err) {
				error = err;
			}
			expect(error).not.to.be.undefined;
			expect(error).to.be.instanceOf(CategoryNameTooShortError);
			expect(error!.name).to.equal("CategoryNameTooShortError");
		});

		it("mustn't be 1 character strechted by whitespace.", function() {
			let error: Error | undefined;
			try {
				new CategoryName("   B  ");
			} catch (err) {
				error = err;
			}
			expect(error).not.to.be.undefined;
			expect(error).to.be.instanceOf(CategoryNameTooShortError);
			expect(error!.name).to.equal("CategoryNameTooShortError");
		});

		it("trims whitespace.", function() {
			const expectedCategoryName = "education";
			const categoryNameWithWhitespaces = " " + expectedCategoryName + "  ";

			const categoryName = new CategoryName(categoryNameWithWhitespaces);
			const actualCategoryName = categoryName.value;

			expect(actualCategoryName).to.equal(expectedCategoryName);
		});

	});

	it("needs a name.", function() {
		const expectedName = "work";

		const category = new Category({ name: new CategoryName(expectedName) }, []);
		const actualName = category.name;

		expect(actualName).to.equal(expectedName);
	});

	it("doesn't allow a non-unique name.", function() {
		const expectedName = "sports";
		let error: Error | undefined;

		try {
			new Category(
				{ name: new CategoryName(expectedName) },
				[ new CategoryName(expectedName) ]
			);
		} catch (err) {
			error = err;
		}

		expect(error).not.to.be.undefined;
		expect(error).to.be.instanceOf(CategoryNameNotUniqueError);
		expect(error!.name).to.equal("CategoryNameNotUniqueError");
	});

	it("needs a unique name.", function() {
		const expectedName = "gift";
		const categoryName = new CategoryName(expectedName);

		const category = new Category({ name: categoryName }, []);
		const actualName = category.name;

		expect(actualName).to.equal(expectedName);
	});

	describe("logo", function() {

		it("needs to be a string.", function() {
			const expectedCategoryLogoUrlStr = "https://bit.ly/2HOJsZm"; // https://i.pinimg.com/originals/e8/d7/a8/e8d7a8e2533426f1b9f64e8d636c482f.jpg

			const categoryLogo = new CategoryLogo(expectedCategoryLogoUrlStr);
			const actualCategoryLogoUrl = categoryLogo.value;

			expect(actualCategoryLogoUrl).to.be.a("string");
			expect(actualCategoryLogoUrl).to.equal(expectedCategoryLogoUrlStr);
		});

		it("mustn't be empty.", function() {
			let error: Error | undefined;
			try {
				new CategoryLogo("");
			} catch (err) {
				error = err;
			}
			expect(error).not.to.be.undefined;
			expect(error).to.be.instanceOf(CategoryLogoUrlInvalidError);
			expect(error!.name).to.equal("CategoryLogoUrlInvalidError");
		});

		it("mustn't be FTP.", function() {
			let error: Error | undefined;
			try {
				new CategoryLogo("ftp://ftp.example.com/category-logo");
			} catch (err) {
				error = err;
			}
			expect(error).not.to.be.undefined;
			expect(error).to.be.instanceOf(CategoryLogoUrlInvalidError);
			expect(error!.name).to.equal("CategoryLogoUrlInvalidError");
		});

		it("needs to be a valid URL.", function() {
			const expectedCategoryLogoUrlStr = "https://bit.ly/2nhkoT9"; // https://images.vexels.com/media/users/3/135898/isolated/preview/b427c272b21c80f9bddea2d6d9dbe733-executive-team-peoples-by-vexels.png

			const categoryLogo = new CategoryLogo(expectedCategoryLogoUrlStr);
			const actualCategoryLogoUrl = categoryLogo.value;

			expect(actualCategoryLogoUrl).to.equal(expectedCategoryLogoUrlStr);
		});

	});

	it("may have a logo.", function() {
		const expectedLogoUrlStr = "https://bit.ly/2HOJsZm"; // https://i.pinimg.com/originals/e8/d7/a8/e8d7a8e2533426f1b9f64e8d636c482f.jpg

		const category = new Category(
			{
				logo: new CategoryLogo(expectedLogoUrlStr),
				name: new CategoryName("food")
			},
			[]
		);
		const actualLogoUrlStr = category.logo;

		expect(actualLogoUrlStr).to.equal(expectedLogoUrlStr);
	});

	it("doesn't need a logo.", function() {
		const category = new Category({ name: new CategoryName("groceries") }, []);
		const actualLogoUrl = category.logo;
		expect(actualLogoUrl).to.be.undefined;
	});

	describe("description", function() {

		it("needs to be a string.", function() {
			const expectedCategoryDescription = "Ice cream, crisps, etc.";

			const categoryDecsription = new CategoryDescription(expectedCategoryDescription);
			const actualCategoryDescription = categoryDecsription.value;

			expect(actualCategoryDescription).to.be.a("string");
			expect(actualCategoryDescription).to.equal(expectedCategoryDescription);
		});

		it("mustn't be empty.", function() {
			let error: Error | undefined;
			try {
				new CategoryDescription("");
			} catch (err) {
				error = err;
			}
			expect(error).not.to.be.undefined;
			expect(error).to.be.instanceOf(CategoryDescriptionEmptyError);
			expect(error!.name).to.equal("CategoryDescriptionEmptyError");
		});

		it("mustn't be whitespace only.", function() {
			let error: Error | undefined;
			try {
				new CategoryDescription(" ");
			} catch (err) {
				error = err;
			}
			expect(error).not.to.be.undefined;
			expect(error).to.be.instanceOf(CategoryDescriptionEmptyError);
			expect(error!.name).to.equal("CategoryDescriptionEmptyError");
		});

		it("trims leading and trailing whitespace.", function() {
			const expectedCategoryDescription = "jeans, socks, etc.";
			const categoryDescriptionWithWhitespace = "  " + expectedCategoryDescription + " ";

			const categoryDecsription = new CategoryDescription(categoryDescriptionWithWhitespace);
			const actualCategoryDescription = categoryDecsription.value;

			expect(actualCategoryDescription).to.equal(expectedCategoryDescription);
		});

	});

	it("may have a description.", function() {
		const expectedDescription = "CDs, DVDs, BRs, etc.";

		const category = new Category(
			{
				description: new CategoryDescription(expectedDescription),
				name: new CategoryName("multimedia")
			},
			[]
		);
		const actualDescription = category.description;

		expect(actualDescription).to.equal(expectedDescription);
	});

	it("doesn't need a description.", function() {
		const category = new Category({ name: new CategoryName("clothes") }, []);
		const actualDescription = category.description;
		expect(actualDescription).to.be.undefined;
	});

});
