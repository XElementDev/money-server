import { Name } from "../../../domain/common";
import { RetailerNameTooShortError } from "../../../domain/retailer";


export class RetailerName extends Name {

	public constructor(value: string) {
		super(value, RetailerNameTooShortError);
		return;
	}

}
