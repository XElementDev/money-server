import { RetailerNameTooShortError } from "../index";


export class RetailerName {

	public constructor(
		public readonly value: string
	) {
		this.value = value.trim();
		if (this.value.length < 2) { throw new RetailerNameTooShortError(); }
		return;
	}

}
