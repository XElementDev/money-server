import { expect } from "chai";
import {
	Person,
	PersonAvatar,
	PersonAvatarUrlInvalidError,
	PersonName,
	PersonNameNotUniqueError,
	PersonNameTooShortError
	} from "../../../domain/person";


describe("Person", function() {

	describe("name", function() {

		it("needs to be a string.", function() {
			const expectedPersonName = "John";

			const personName = new PersonName(expectedPersonName);
			const actualPersonName = personName.value;

			expect(actualPersonName).to.equal(expectedPersonName);
		});

		it("mustn't be empty.", function() {
			expect(() => {
				new PersonName("");
			}).to.throw(PersonNameTooShortError);
		});

		it("mustn't be 1 character.", function() {
			expect(() => {
				new PersonName("A");
			}).to.throw(PersonNameTooShortError);
		});

		it("needs to have, at minimum, 2 characters.", function() {
			const expectedPersonName = "Bo";

			const personName = new PersonName(expectedPersonName);
			const actualPersonName = personName.value;

			expect(actualPersonName).to.equal(expectedPersonName);
		});

		it("mustn't be whitespace only.", function() {
			expect(() => {
				new PersonName("  ");
			}).to.throw(PersonNameTooShortError);
		});

		it("mustn't be 1 character strechted by whitespace.", function() {
			expect(() => {
				new PersonName("   B  ");
			}).to.throw(PersonNameTooShortError);
		});

		it("trims whitespace.", function() {
			const expectedPersonName = "Jane";
			const personNameWithWhitespaces = " " + expectedPersonName + "  ";

			const personName = new PersonName(personNameWithWhitespaces);
			const actualPersonName = personName.value;

			expect(actualPersonName).to.equal(expectedPersonName);
		});

	});

	it("needs a name.", function() {
		const expectedName = "Erika";

		const person = new Person({ name: new PersonName(expectedName) }, []);
		const actualName = person.name;

		expect(actualName).to.equal(expectedName);
	});

	it("doesn't allow a non-unique name.", function() {
		const expectedName = "Max";
		expect(() => {
			new Person(
				{ name: new PersonName(expectedName) },
				[ new PersonName(expectedName) ]
			);
		}).to.throw(PersonNameNotUniqueError);
	});

	it("needs a unique name.", function() {
		const expectedName = "John Doe";
		const personName = new PersonName(expectedName);

		const person = new Person({ name: personName }, []);
		const actualName = person.name;

		expect(actualName).to.equal(expectedName);
	});

	describe("avatar", function() {

		it("needs to be a string.", function() {
			const expectedPersonAvatarUrl = "https://taeglichneu.files.wordpress.com/2011/01/mustermann.jpg";

			const personAvatar = new PersonAvatar(expectedPersonAvatarUrl);
			const actualPersonAvatarUrl = personAvatar.value;

			expect(actualPersonAvatarUrl).to.equal(expectedPersonAvatarUrl);
		});

		it("mustn't be empty.", function() {
			expect(() => {
				new PersonAvatar("");
			}).to.throw(PersonAvatarUrlInvalidError);
		});

		it("mustn't be FTP.", function() {
			expect(() => {
				new PersonAvatar("ftp://ftp.example.com/person-avatar");
			}).to.throw(PersonAvatarUrlInvalidError);
		});

		it("needs to be a valid URL.", function() {
			const expectedPersonAvatarUrl = "https://bit.ly/1YLVjXx"; // https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png

			const personAvatar = new PersonAvatar(expectedPersonAvatarUrl);
			const actualPersonAvatarUrl = personAvatar.value;

			expect(actualPersonAvatarUrl).to.equal(expectedPersonAvatarUrl);
		});

	});

	it("may have an avatar.", function() {
		const expectedAvatarUrl = "https://taeglichneu.files.wordpress.com/2011/01/mustermann.jpg";

		const person = new Person(
			{
				avatar: new PersonAvatar(expectedAvatarUrl),
				name: new PersonName("Erika Mustermann")
			},
			[]
		);
		const actualAvatarUrl = person.avatar;

		expect(actualAvatarUrl).to.equal(expectedAvatarUrl);
	});

	it("doesn't need an avatar.", function() {
		const person = new Person({ name: new PersonName("Jane Doe") }, []);
		const actualAvatarUrl = person.avatar;
		expect(actualAvatarUrl).to.be.undefined;
	});

});
