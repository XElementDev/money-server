import { NameTooShortError } from "../../../domain/common/index";


export class CategoryNameTooShortError extends NameTooShortError {

	public constructor() {
		super("Category");
		return;
	}

}
