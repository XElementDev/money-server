export class PersonAvatarUrlInvalidError extends Error {

	public constructor() {
		super("Person avatar URL is invalid.");
		this.name = "PersonAvatarUrlInvalidError";
		return;
	}

}
