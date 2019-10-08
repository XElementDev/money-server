export abstract class NameNotUniqueError extends Error {

	protected constructor(domainEntity: string) {
		super(`${domainEntity} name is not unique.`);
		return;
	}

}
