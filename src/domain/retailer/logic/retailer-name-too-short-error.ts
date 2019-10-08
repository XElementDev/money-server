import { NameTooShortError } from "../../../domain/common";


export class RetailerNameTooShortError extends NameTooShortError {

	public constructor() {
		super("Retailer");
		return;
	}

}
