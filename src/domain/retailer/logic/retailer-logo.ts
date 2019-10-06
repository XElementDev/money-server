import * as validUrl from "valid-url";
import { RetailerLogoUrlInvalidError } from "../index";


export class RetailerLogo {

	public constructor(
		public readonly value: string
	) {
		if (!validUrl.isWebUri(this.value)) {
			throw new RetailerLogoUrlInvalidError();
		}
		return;
	}
}
