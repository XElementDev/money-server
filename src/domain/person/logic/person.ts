import {
	PersonAvatar,
	PersonName,
	PersonNameNotUniqueError
	} from "../../../domain/person";


export class Person {

	public constructor(
		input: {
			avatar?: PersonAvatar,
			name: PersonName
		},
		existingNames: Array<PersonName>
	) {
		if (input.avatar !== undefined) { this.avatar = input.avatar.value; }
		this.name = input.name.value;
		if (existingNames.map((rn) => rn.value).includes(input.name.value)) {
			throw new PersonNameNotUniqueError();
		}
		return;
	}


	public readonly avatar: string | undefined;


	public readonly name: string;

}
