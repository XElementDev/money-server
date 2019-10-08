import { LogoUrlInvalidError } from "../../../domain/common";


export class RetailerLogoUrlInvalidError extends LogoUrlInvalidError {

	public constructor() {
		super("Retailer");
		return;
	}

}
