import { LogoUrlInvalidError } from "../../../domain/common/index";


export class CategoryLogoUrlInvalidError extends LogoUrlInvalidError {

	public constructor() {
		super("Category");
		return;
	}

}
