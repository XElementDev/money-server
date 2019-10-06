import {
	RetailerLogo,
	RetailerName,
	RetailerNameNotUniqueError
	} from "../index";


export class Retailer {

	public constructor(
		input: {
			logo?: RetailerLogo,
			name: RetailerName
		},
		existingNames: Array<RetailerName>
	) {
		this.name = input.name.value;
		if (existingNames.map((rn) => rn.value).includes(input.name.value)) {
			throw new RetailerNameNotUniqueError();
		}
		if (input.logo !== undefined) { this.logo = input.logo.value; }
		return;
	}


	public readonly logo?: string;


	public readonly name: string;

}
