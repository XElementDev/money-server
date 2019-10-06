export class CategoryNameNotUniqueError extends Error {

	public constructor() {
		super("Category name is not unique.");
		return;
	}

}
