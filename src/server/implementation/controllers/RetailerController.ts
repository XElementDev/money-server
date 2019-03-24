import {
	Body,
	Controller,
	Post,
	Response,
	Route,
	SuccessResponse
	} from "tsoa";
import { Retailer } from "../../interface";


@Route("retailers")
export class RetailerController extends Controller {

	public constructor() {
		super();
		return;
	}


	@Post()
	@SuccessResponse(201, "Created")
	@Response(400, "Bad Request")
	public create(@Body() requestBody: Retailer): Promise<void> {
		this.setStatus(201);
		return Promise.resolve();
	}

}
