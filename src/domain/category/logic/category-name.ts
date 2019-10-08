import { CategoryNameTooShortError } from "../../../domain/category/index";
import { Name } from "../../../domain/common/index";


export class CategoryName extends Name {

	public constructor(value: string) {
		super(value, CategoryNameTooShortError);
		return;
	}

}
