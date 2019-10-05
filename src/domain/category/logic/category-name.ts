import { CategoryNameTooShortError } from "../index";


export class CategoryName {

	public constructor(
		value: string
	) {
		this.value = value.trim();
		if (this.value.length < 2) { throw new CategoryNameTooShortError(); }
		return;
	}


	public readonly value: string;

}
