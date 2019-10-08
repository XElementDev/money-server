import { CategoryDescriptionEmptyError } from "../../../domain/category";


export class CategoryDescription {

	public constructor(value: string) {
		this.value = value.trim();
		if (this.value.length === 0) { throw new CategoryDescriptionEmptyError(); }
		return;
	}


	public readonly value: string;

}
