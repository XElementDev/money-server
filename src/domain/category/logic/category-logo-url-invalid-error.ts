import { LogoUrlInvalidError } from "../../../domain/common";


export class CategoryLogoUrlInvalidError extends LogoUrlInvalidError {

	public constructor() {
		super("Category");
		return;
	}

}
