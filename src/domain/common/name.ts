import { NameTooShortError } from "../../domain/common/index";
import { NoParamConstructor } from "./no-param-constructor";


export abstract class Name {

	protected constructor(
		public readonly value: string,
		TNameTooShortErrorCtor: NoParamConstructor<NameTooShortError>
	) {
		this.value = value.trim();
		if (this.value.length < 2) { throw new TNameTooShortErrorCtor(); }
		return;
	}

}
