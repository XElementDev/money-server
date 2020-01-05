export class CategoryDescriptionEmptyError extends Error {

	public constructor() {
		super("Category description mustn't be empty.");
		this.name = "CategoryDescriptionEmptyError";
		return;
	}

}
