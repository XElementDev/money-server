import {
	Body,
	Controller,
	Get,
	Post,
	Response,
	Route,
	SuccessResponse
	} from "tsoa";
import {
	Identifiable,
	IdentifiableRetailer,
	Retailer
	} from "../../interface";


@Route("retailers")
export class RetailerController extends Controller {

	public constructor() {
		super();
		return;
	}


	@Post()
	@SuccessResponse(201, "Created")
	@Response(400, "Bad Request")
	public createRetailer(@Body() requestBody: Retailer): Promise<Identifiable> {
		this.setStatus(201);
		const identifiable: Identifiable = { id: RetailerController.retailers.length.toString() };
		const identifiableRetailer: IdentifiableRetailer = {
			...identifiable,
			...requestBody
		};
		RetailerController.retailers.push(identifiableRetailer);
		return Promise.resolve(identifiable);
	}


	@Get("{id}")
	@SuccessResponse(200, "OK")
	@Response(404, "Not Found")
	public readRetailer(id: string): Promise<IdentifiableRetailer> {
		const matchingRetailers = RetailerController.retailers.filter((r) => r.id === id);
		if (matchingRetailers.length > 0) {
			return Promise.resolve(matchingRetailers[0]);
		} else {
			this.setStatus(404);
			return Promise.reject();
		}
	}


	@Get()
	@SuccessResponse(200, "OK")
	public readRetailers(): Promise<Array<Identifiable>> {
		const identifiableRetailers = RetailerController.retailers;
		const identifiables: Array<Identifiable> = identifiableRetailers.map((ir) => ({ id: ir.id }));
		return Promise.resolve(identifiables);
	}


	public static retailers: Array<IdentifiableRetailer> = [];

}
