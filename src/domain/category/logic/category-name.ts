import { CategoryNameTooShortError } from "../../../domain/category/index";
import { Name } from "../../../domain/common/index";


export class CategoryName extends Name<CategoryNameTooShortError> {

	public constructor(value: string) {
		super(value, CategoryNameTooShortError);
		return;
	}

}
