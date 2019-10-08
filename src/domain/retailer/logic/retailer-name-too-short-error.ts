import { NameTooShortError } from "../../../domain/common/index";


export class RetailerNameTooShortError extends NameTooShortError {

	public constructor() {
		super("Retailer");
		return;
	}

}
