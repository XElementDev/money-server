import { CategoryNameTooShortError } from "../../../domain/category";
import { Name } from "../../../domain/common";


export class CategoryName extends Name {

	public constructor(value: string) {
		super(value, CategoryNameTooShortError);
		return;
	}

}
