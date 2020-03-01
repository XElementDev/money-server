import { Name } from "../../../domain/common";
import { PersonSurnameTooShortError } from "../../../domain/person";


export class PersonSurname extends Name {

	public constructor(value: string) {
		super(value, PersonSurnameTooShortError);
		return;
	}

}
