import { NameTooShortError } from "../../domain/common/index";
import { NoParamConstructor } from "./no-param-constructor";


export abstract class Name<TError extends NameTooShortError> {

	protected constructor(
		public readonly value: string,
		TErrorCtor: NoParamConstructor<TError>
	) {
		this.value = value.trim();
		if (this.value.length < 2) { throw new TErrorCtor(); }
		return;
	}

}
