import { CategoryLogoUrlInvalidError } from "../../../domain/category";
import { Logo } from "../../../domain/common";


export class CategoryLogo extends Logo {

	public constructor(value: string) {
		super(value, CategoryLogoUrlInvalidError);
		return;
	}

}
