import { LogoUrlInvalidError } from "../../../domain/common/index";


export class RetailerLogoUrlInvalidError extends LogoUrlInvalidError {

	public constructor() {
		super("Retailer");
		return;
	}

}
