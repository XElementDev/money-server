import * as validUrl from "valid-url";
import { PersonAvatarUrlInvalidError } from "../../../domain/person";


export class PersonAvatar {

	public constructor(
		public readonly value: string
	) {
		if (!validUrl.isWebUri(this.value)) { throw new PersonAvatarUrlInvalidError(); }
		return;
	}

}
