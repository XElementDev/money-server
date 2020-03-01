import { expect } from "chai";
import {
	Person,
	PersonAvatar,
	PersonAvatarUrlInvalidError,
	PersonNameNotUniqueError,
	PersonPrename,
	PersonPrenameTooShortError,
	PersonSurname,
	PersonSurnameTooShortError
	} from "../../../domain/person";


describe("Person", function() {

	describe("prename", function() {

		it("needs to be a string.", function() {
			const expectedPersonPrename = "John";

			const personPrename = new PersonPrename(expectedPersonPrename);
			const actualPersonPrename = personPrename.value;

			expect(actualPersonPrename).to.be.a("string");
			expect(actualPersonPrename).to.equal(expectedPersonPrename);
		});

		it("mustn't be empty.", function() {
			let error: Error | undefined;
			try {
				new PersonPrename("");
			} catch (err) {
				error = err as Error;
			}
			expect(error).not.to.be.undefined;
			expect(error).to.be.instanceOf(PersonPrenameTooShortError);
			expect(error!.name).to.equal("PersonPrenameTooShortError");
		});

		it("mustn't be 1 character.", function() {
			let error: Error | undefined;
			try {
				new PersonPrename("P");
			} catch (err) {
				error = err as Error;
			}
			expect(error).not.to.be.undefined;
			expect(error).to.be.instanceOf(PersonPrenameTooShortError);
			expect(error!.name).to.equal("PersonPrenameTooShortError");
		});

		it("needs to have, at minimum, 2 characters.", function() {
			const expectedPersonPrename = "Bo";

			const personPrename = new PersonPrename(expectedPersonPrename);
			const actualPersonPrename = personPrename.value;

			expect(actualPersonPrename).to.equal(expectedPersonPrename);
		});

		it("mustn't be whitespace only.", function() {
			let error: Error | undefined;
			try {
				new PersonPrename("  ");
			} catch (err) {
				error = err as Error;
			}
			expect(error).not.to.be.undefined;
			expect(error).to.be.instanceOf(PersonPrenameTooShortError);
			expect(error!.name).to.equal("PersonPrenameTooShortError");
		});

		it("mustn't be 1 character strechted by whitespace.", function() {
			let error: Error | undefined;
			try {
				new PersonPrename("   P  ");
			} catch (err) {
				error = err as Error;
			}
			expect(error).not.to.be.undefined;
			expect(error).to.be.instanceOf(PersonPrenameTooShortError);
			expect(error!.name).to.equal("PersonPrenameTooShortError");
		});

		it("trims whitespace.", function() {
			const expectedPersonPrename = "Jane";
			const personPrenameWithWhitespaces = " " + expectedPersonPrename + "  ";

			const personPrename = new PersonPrename(personPrenameWithWhitespaces);
			const actualPersonPrename = personPrename.value;

			expect(actualPersonPrename).to.equal(expectedPersonPrename);
		});

	});

	it("needs a prename.", function() {
		const expectedPrename = "Erika";

		const person = new Person(
			{
				prename: new PersonPrename(expectedPrename),
				surname: new PersonSurname("irrelevant")
			},
			[]
		);
		const actualPrename = person.prename;

		expect(actualPrename).to.equal(expectedPrename);
	});

	describe("surname", function() {

		it("needs to be a string.", function() {
			const expectedPersonSurname = "Doe";

			const personSurname = new PersonSurname(expectedPersonSurname);
			const actualPersonSurname = personSurname.value;

			expect(actualPersonSurname).to.be.a("string");
			expect(actualPersonSurname).to.equal(expectedPersonSurname);
		});

		it("mustn't be empty.", function() {
			let error: Error | undefined;
			try {
				new PersonSurname("");
			} catch (err) {
				error = err as Error;
			}
			expect(error).not.to.be.undefined;
			expect(error).to.be.instanceOf(PersonSurnameTooShortError);
			expect(error!.name).to.equal("PersonSurnameTooShortError");
		});

		it("mustn't be 1 character.", function() {
			let error: Error | undefined;
			try {
				new PersonSurname("S");
			} catch (err) {
				error = err as Error;
			}
			expect(error).not.to.be.undefined;
			expect(error).to.be.instanceOf(PersonSurnameTooShortError);
			expect(error!.name).to.equal("PersonSurnameTooShortError");
		});

		it("needs to have, at minimum, 2 characters.", function() {
			const expectedPersonSurname = "Su";

			const personSurname = new PersonSurname(expectedPersonSurname);
			const actualPersonSurname = personSurname.value;

			expect(actualPersonSurname).to.equal(expectedPersonSurname);
		});

		it("mustn't be whitespace only.", function() {
			let error: Error | undefined;
			try {
				new PersonSurname("  ");
			} catch (err) {
				error = err as Error;
			}
			expect(error).not.to.be.undefined;
			expect(error).to.be.instanceOf(PersonSurnameTooShortError);
			expect(error!.name).to.equal("PersonSurnameTooShortError");
		});

		it("mustn't be 1 character strechted by whitespace.", function() {
			let error: Error | undefined;
			try {
				new PersonSurname("   S  ");
			} catch (err) {
				error = err as Error;
			}
			expect(error).not.to.be.undefined;
			expect(error).to.be.instanceOf(PersonSurnameTooShortError);
			expect(error!.name).to.equal("PersonSurnameTooShortError");
		});

		it("trims whitespace.", function() {
			const expectedPersonSurname = "Doe";
			const personSurnameWithWhitespaces = " " + expectedPersonSurname + "  ";

			const personSurname = new PersonSurname(personSurnameWithWhitespaces);
			const actualPersonSurname = personSurname.value;

			expect(actualPersonSurname).to.equal(expectedPersonSurname);
		});

	});

	it("needs a surname.", function() {
		const expectedSurname = "Mustermann";

		const person = new Person(
			{
				prename: new PersonPrename("irrelevant"),
				surname: new PersonSurname(expectedSurname)
			},
			[]
		);
		const actualSurname = person.surname;

		expect(actualSurname).to.equal(expectedSurname);
	});

	it("doesn't allow a non-unique name.", function() {
		const prename = new PersonPrename("Max");
		const surname = new PersonSurname("Mustermann");
		let error: Error | undefined;
		try {
			new Person({ prename, surname }, [ [prename, surname] ]);
		} catch (err) {
			error = err as Error;
		}
		expect(error).not.to.be.undefined;
		expect(error).to.be.instanceOf(PersonNameNotUniqueError);
		expect(error!.name).to.equal("PersonNameNotUniqueError");
	});

	it("needs a unique name.", function() {
		const expectedPrename = "John";
		const expectedSurname = "Doe";
		const prename = new PersonPrename(expectedPrename);
		const surname = new PersonSurname(expectedSurname);

		const person = new Person({ prename, surname }, []);
		const actualPrename = person.prename;
		const actualSurname = person.surname;

		expect(actualPrename).to.equal(expectedPrename);
		expect(actualSurname).to.equal(expectedSurname);
	});

	describe("avatar", function() {

		it("needs to be a string.", function() {
			const expectedPersonAvatarUrl = "https://taeglichneu.files.wordpress.com/2011/01/mustermann.jpg";

			const personAvatar = new PersonAvatar(expectedPersonAvatarUrl);
			const actualPersonAvatarUrl = personAvatar.value;

			expect(actualPersonAvatarUrl).to.be.a("string");
			expect(actualPersonAvatarUrl).to.equal(expectedPersonAvatarUrl);
		});

		it("mustn't be empty.", function() {
			let error: Error | undefined;
			try {
				new PersonAvatar("");
			} catch (err) {
				error = err as Error;
			}
			expect(error).not.to.be.undefined;
			expect(error).to.be.instanceOf(PersonAvatarUrlInvalidError);
			expect(error!.name).to.equal("PersonAvatarUrlInvalidError");
		});

		it("mustn't be FTP.", function() {
			let error: Error | undefined;
			try {
				new PersonAvatar("ftp://ftp.example.com/person-avatar");
			} catch (err) {
				error = err as Error;
			}
			expect(error).not.to.be.undefined;
			expect(error).to.be.instanceOf(PersonAvatarUrlInvalidError);
			expect(error!.name).to.equal("PersonAvatarUrlInvalidError");
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
				prename: new PersonSurname("Erika"),
				surname: new PersonSurname("Mustermann")
			},
			[]
		);
		const actualAvatarUrl = person.avatar;

		expect(actualAvatarUrl).to.equal(expectedAvatarUrl);
	});

	it("doesn't need an avatar.", function() {
		const person = new Person({ prename: new PersonPrename("Jane"), surname: new PersonSurname("Doe") }, []);
		const actualAvatarUrl = person.avatar;
		expect(actualAvatarUrl).to.be.undefined;
	});

});
