import { Item } from "../../../domain/common/index";
import {
	RetailerLogo,
	RetailerName,
	RetailerNameNotUniqueError
	} from "../../../domain/retailer/index";


export class Retailer extends Item {

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
