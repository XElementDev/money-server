import { Name } from "../../../domain/common";
import { PersonPrenameTooShortError } from "../../../domain/person";


export class PersonPrename extends Name {

	public constructor(value: string) {
		super(value, PersonPrenameTooShortError);
		return;
	}

}
