import { NameNotUniqueError } from "../../../domain/common";


export class PersonNameNotUniqueError extends NameNotUniqueError {

	public constructor() {
		super("Person");
		return;
	}

}
