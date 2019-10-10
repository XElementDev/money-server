import { Name } from "../../../domain/common";
import { PersonNameTooShortError } from "../../../domain/person";


export class PersonName extends Name {

	public constructor(value: string) {
		super(value, PersonNameTooShortError);
		return;
	}

}
