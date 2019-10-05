import * as validUrl from "valid-url";
import { CategoryLogoUrlInvalidError } from "../index";


export class CategoryLogo {

	public constructor(
		public readonly value: string
	) {
		if (!validUrl.isWebUri(this.value)) {
			throw new CategoryLogoUrlInvalidError();
		}
		return;
	}

}
