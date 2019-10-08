import { Logo } from "../../../domain/common";
import { RetailerLogoUrlInvalidError } from "../../../domain/retailer";


export class RetailerLogo extends Logo {

	public constructor(value: string) {
		super(value, RetailerLogoUrlInvalidError);
		return;
	}

}
