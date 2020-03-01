export abstract class LogoUrlInvalidError extends Error {

	protected constructor(domainEntity: string) {
		super(`${domainEntity} logo URL is invalid.`);
		this.name = `${domainEntity}LogoUrlInvalidError`;
		return;
	}

}
