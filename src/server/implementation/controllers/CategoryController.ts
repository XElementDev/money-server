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
	Category,
	Identifiable,
	IdentifiableCategory
	} from "../../interface";


@Route("categories")
export class CategoryController extends Controller {

	public constructor() {
		super();
		return;
	}


	public static categories: Array<IdentifiableCategory> = [];


	@Post()
	@SuccessResponse(201, "Created")
	@Response(400, "Bad Request")
	public createCategory(@Body() requestBody: Category): Promise<Identifiable> {
		this.setStatus(201);
		const identifiable: Identifiable = { id: CategoryController.categories.length.toString() };
		const identifiableCategory: IdentifiableCategory = {
			...identifiable,
			...requestBody
		};
		CategoryController.categories.push(identifiableCategory);
		return Promise.resolve(identifiable);
	}


	@Get()
	@SuccessResponse(200, "OK")
	public readCategories(): Promise<Array<Identifiable>> {
		const identifiableCategories = CategoryController.categories;
		const identifiables: Array<Identifiable> = identifiableCategories.map((ic) => ({ id: ic.id }));
		return Promise.resolve(identifiables);
	}


	@Get("{id}")
	@SuccessResponse(200, "OK")
	@Response(404, "Not Found")
	public readCategory(id: string): Promise<IdentifiableCategory> {
		const matchingCategories = CategoryController.categories.filter((c) => c.id === id);
		if (matchingCategories.length > 0) {
			return Promise.resolve(matchingCategories[0]);
		} else {
			this.setStatus(404);
			return Promise.reject();
		}
	}

}
