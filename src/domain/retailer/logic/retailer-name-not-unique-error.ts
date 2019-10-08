import { NameNotUniqueError } from "../../../domain/common/index";


export class RetailerNameNotUniqueError extends NameNotUniqueError {

	public constructor() {
		super("Retailer");
		return;
	}

}
