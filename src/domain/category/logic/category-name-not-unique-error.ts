import { NameNotUniqueError } from "../../../domain/common";


export class CategoryNameNotUniqueError extends NameNotUniqueError {

	public constructor() {
		super("Category");
		this.name = "CategoryNameNotUniqueError";
		return;
	}

}
