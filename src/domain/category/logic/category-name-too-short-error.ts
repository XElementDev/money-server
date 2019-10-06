export class CategoryNameTooShortError extends Error {

	public constructor() {
		super("Category name is too short.");
		return;
	}

}
