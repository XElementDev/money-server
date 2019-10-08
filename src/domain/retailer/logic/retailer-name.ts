import { Name } from "../../../domain/common/index";
import { RetailerNameTooShortError } from "../../../domain/retailer/index";


export class RetailerName extends Name<RetailerNameTooShortError> {

	public constructor(value: string) {
		super(value, RetailerNameTooShortError);
		return;
	}

}
