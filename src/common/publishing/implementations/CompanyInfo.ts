export class CompanyInfo {

	private constructor() {
		return;
	}


	/**
	 * The internal company name.
	 * This name should actually never change.
	 */
	public static get internalName(): string {
		return "XElement";
	}


	/**
	 * The official company name.
	 * Note: This name may change from time to time.
	 */
	public static get officialName(): string {
		return "XElement Development";
	}

}
