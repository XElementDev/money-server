import { NameNotUniqueError } from "../../../domain/common/index";


export class CategoryNameNotUniqueError extends NameNotUniqueError {

	public constructor() {
		super("Category");
		return;
	}

}
