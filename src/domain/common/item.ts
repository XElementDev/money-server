import {
	Logo,
	Name,
	NameNotUniqueError
	} from "../../domain/common";
import { NoParamConstructor } from "./no-param-constructor";


export abstract class Item {

	protected constructor(
		input: {
			logo?: Logo,
			name: Name
		},
		existingNames: Array<Name>,
		TNameNotUniqueErrorCtor: NoParamConstructor<NameNotUniqueError>
	) {
		this.name = input.name.value;
		if (existingNames.map((rn) => rn.value).includes(input.name.value)) {
			throw new TNameNotUniqueErrorCtor();
		}
		if (input.logo !== undefined) { this.logo = input.logo.value; }
		return;
	}


	public readonly logo: string | undefined;


	public readonly name: string;

}
