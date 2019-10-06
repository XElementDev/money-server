export class RetailerNameNotUniqueError extends Error {

	public constructor() {
		super("Retailer name is not unique.");
		return;
	}

}
