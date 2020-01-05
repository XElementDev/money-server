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
	CategoryDescription,
	CategoryLogo,
	CategoryName
	} from "../../../domain/category";
import {
	Identifiable,
	IdentifiableCategory,
	JsonCategory
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
	public createCategory(@Body() requestBody: JsonCategory): Promise<Identifiable> {
		try {
			this.validateCategory(requestBody);
		} catch (err) {
			throw err;
		}
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


	private validateCategory(json: JsonCategory): void {
		try {
			let description: CategoryDescription | undefined;
			if (json.description !== undefined) {
				description = new CategoryDescription(json.description);
			}
			let logo: CategoryLogo | undefined;
			if (json.logoUrlStr !== undefined) {
				logo = new CategoryLogo(json.logoUrlStr);
			}
			new Category( // tslint:disable-line:no-unused-expression
				{
					description,
					logo,
					name: new CategoryName(json.name)
				},
				CategoryController.categories.map((c) => new CategoryName(c.name))
			);
		} catch (err) {
			throw err;
		}
		return;
	}

}
