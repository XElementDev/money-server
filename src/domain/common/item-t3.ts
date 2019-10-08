import {
	Logo,
	LogoUrlInvalidError,
	Name,
	NameNotUniqueError,
	NameTooShortError
	} from "../../domain/common/index";
import { NoParamConstructor } from "./no-param-constructor";


export abstract class Item<
	TLogo extends Logo<TLogoUrlInvalidError>,
	TName extends Name<TNameTooShortError>,
	TLogoUrlInvalidError extends LogoUrlInvalidError,
	TNameNotUniqueError extends NameNotUniqueError,
	TNameTooShortError extends NameTooShortError
> {

	protected constructor(
		input: {
			logo?: TLogo,
			name: TName
		},
		existingNames: Array<TName>,
		TNameNotUniqueErrorCtor: NoParamConstructor<TNameNotUniqueError>
	) {
		this.name = input.name.value;
		if (existingNames.map((rn) => rn.value).includes(input.name.value)) {
			throw new TNameNotUniqueErrorCtor();
		}
		if (input.logo !== undefined) { this.logo = input.logo.value; }
		return;
	}


	public readonly logo?: string;


	public readonly name: string;

}
