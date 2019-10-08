import * as validUrl from "valid-url";
import { LogoUrlInvalidError } from "../../domain/common/index";
import { NoParamConstructor } from "./no-param-constructor";


export abstract class Logo<TError extends LogoUrlInvalidError> {

	protected constructor(
		public readonly value: string,
		TErrorCtor: NoParamConstructor<TError>
	) {
		if (!validUrl.isWebUri(this.value)) {
			throw new TErrorCtor();
		}
		return;
	}

}
