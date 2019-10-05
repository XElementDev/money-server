import {
	CategoryDescription,
	CategoryLogo,
	CategoryName,
	CategoryNameNotUniqueError
	} from "../index";


export class Category {

	public constructor(
		name: CategoryName,
		existingNames: Array<CategoryName>,
		logo?: CategoryLogo,
		description?: CategoryDescription
	) {
		this.name = name.value;
		if (existingNames.map((cn) => cn.value).includes(name.value)) {
			throw new CategoryNameNotUniqueError();
		}
		if (logo !== undefined) { this.logoUrlStr = logo.value; }
		if (description !== undefined) { this.description = description.value; }
		return;
	}


	public readonly description?: string;


	public readonly logoUrlStr?: string;


	public readonly name: string;

}
