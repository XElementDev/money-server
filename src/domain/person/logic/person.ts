import {
	PersonAvatar,
	PersonNameNotUniqueError,
	PersonPrename,
	PersonSurname
	} from "../../../domain/person";


export class Person {

	public constructor(
		input: {
			avatar?: PersonAvatar,
			prename: PersonPrename,
			surname: PersonSurname
		},
		existingNames: Array<[PersonPrename, PersonSurname]>
	) {
		if (input.avatar !== undefined) { this.avatar = input.avatar.value; }
		this.prename = input.prename.value;
		this.surname = input.surname.value;

		const inputName = `${this.prename} ${this.surname}`;
		const names = existingNames.map(([pre, sur]) => `${pre.value} ${sur.value}`);
		if (names.includes(inputName)) { throw new PersonNameNotUniqueError(); }

		return;
	}


	public readonly avatar: string | undefined;


	public readonly prename: string;


	public readonly surname: string;

}
