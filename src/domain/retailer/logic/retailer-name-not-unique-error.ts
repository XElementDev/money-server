import { NameNotUniqueError } from "../../../domain/common";


export class RetailerNameNotUniqueError extends NameNotUniqueError {

	public constructor() {
		super("Retailer");
		return;
	}

}
