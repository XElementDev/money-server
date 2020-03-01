import { NameTooShortError } from "../../../domain/common";


export class PersonSurnameTooShortError extends NameTooShortError {

	public constructor() {
		super("Person");
		this.name = `PersonSurnameTooShortError`;
		return;
	}

}
