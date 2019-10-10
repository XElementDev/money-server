import { NameTooShortError } from "../../../domain/common";


export class PersonNameTooShortError extends NameTooShortError {

	public constructor() {
		super("Person");
		return;
	}

}
