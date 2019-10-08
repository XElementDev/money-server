import * as validUrl from "valid-url";
import { LogoUrlInvalidError } from "../../domain/common/index";
import { NoParamConstructor } from "./no-param-constructor";


export abstract class Logo {

	protected constructor(
		public readonly value: string,
		TLogoUrlInvalidErrorCtor: NoParamConstructor<LogoUrlInvalidError>
	) {
		if (!validUrl.isWebUri(this.value)) {
			throw new TLogoUrlInvalidErrorCtor();
		}
		return;
	}

}
