import { Logo } from "../../../domain/common/index";
import { RetailerLogoUrlInvalidError } from "../../../domain/retailer/index";


export class RetailerLogo extends Logo {

	public constructor(value: string) {
		super(value, RetailerLogoUrlInvalidError);
		return;
	}

}
