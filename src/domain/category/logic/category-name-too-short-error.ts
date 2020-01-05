import { NameTooShortError } from "../../../domain/common";


export class CategoryNameTooShortError extends NameTooShortError {

	public constructor() {
		super("Category");
		this.name = "CategoryNameTooShortError";
		return;
	}

}
