import { NameTooShortError } from "../../../domain/common";


export class PersonPrenameTooShortError extends NameTooShortError {

	public constructor() {
		super("Person");
		this.name = `PersonPrenameTooShortError`;
		return;
	}

}
