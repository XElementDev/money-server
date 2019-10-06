export class RetailerNameTooShortError extends Error {

	public constructor() {
		super("Retailer name is too short.");
		return;
	}

}
