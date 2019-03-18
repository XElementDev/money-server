export class ProductInfo {

	private constructor() {
		return;
	}


	/**
	 * The internal product name.
	 * This name should actually never change.
	 */
	public static get internalName(): string {
		return "Money";
	}


	/**
	 * The official product name, under which the product is sold.
	 * Note: This name may change easily from time to time.
	 */
	public static get officialName(): string {
		return "Haushaltsbuch";
	}

}
