import { CategoryLogoUrlInvalidError } from "../../../domain/category/index";
import { Logo } from "../../../domain/common/index";


export class CategoryLogo extends Logo<CategoryLogoUrlInvalidError> {

	public constructor(value: string) {
		super(value, CategoryLogoUrlInvalidError);
		return;
	}

}
