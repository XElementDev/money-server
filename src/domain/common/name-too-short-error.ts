export abstract class NameTooShortError extends Error {

	protected constructor(domainEntity: string) {
		super(`${domainEntity} name is too short.`);
		return;
	}

}