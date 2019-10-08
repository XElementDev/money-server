import {
	CategoryDescription,
	CategoryLogo,
	CategoryName,
	CategoryNameNotUniqueError
	} from "../../../domain/category/index";
import { Item } from "../../../domain/common/index";


export class Category extends Item {

	public constructor(
		input: {
			description?: CategoryDescription
			logo?: CategoryLogo,
			name: CategoryName
		},
		existingNames: Array<CategoryName>
	) {
		super(input, existingNames, CategoryNameNotUniqueError);
		if (input.description !== undefined) { this.description = input.description.value; }
		return;
	}


	public readonly description?: string;

}
