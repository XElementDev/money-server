import { Item } from "../../../domain/common";
import {
	RetailerLogo,
	RetailerName,
	RetailerNameNotUniqueError
	} from "../../../domain/retailer";


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
