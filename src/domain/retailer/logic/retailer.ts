import { Item } from "../../../domain/common/index";
import {
	RetailerLogo,
	RetailerLogoUrlInvalidError,
	RetailerName,
	RetailerNameNotUniqueError,
	RetailerNameTooShortError
	} from "../../../domain/retailer/index";


export class Retailer extends Item<
	RetailerLogo,
	RetailerName,
	RetailerLogoUrlInvalidError,
	RetailerNameNotUniqueError,
	RetailerNameTooShortError
> {

	public constructor(
		input: {
			logo?: RetailerLogo,
			name: RetailerName
		},
		existingNames: Array<RetailerName>
	) {
		super(input, existingNames, RetailerNameNotUniqueError);
		return;
	}

}
