import * as express from "express";
import * as http from "http";
import * as urljoin from "url-join";
import * as CompanyInfo from "../../common/publishing/CompanyInfo";
import * as ProductInfo from "../../common/publishing/ProductInfo";
import { PersonController } from "./controllers/PersonController"; // import-only
import { RegisterRoutes as registerRoutesSync } from "./generated/routes";


//#region not unit-tested
export class MoneyRestService {

	public constructor() {
		this.app = express();
		this.router = express.Router();

		this.configureRoutesSync();

		return;
	}


	private app: express.Express;


	private configureRoutesSync(): void {
		registerRoutesSync(this.router);

		const path = "/" + urljoin(
			CompanyInfo.internalNameSync(),
			ProductInfo.internalNameSync(),
			"API",
			"REST"
		); // TODO: Don't hard code this.
		this.app.use(path, this.router);

		return;
	}


	private static async createServer(app: express.Express, port: number): Promise<http.Server> {
		const promise = new Promise<http.Server>((resolve, reject) => {
			const server = app.listen(port, () => { resolve(server); });
		});
		return promise;
	}


	private router: express.Router;


	public async start(): Promise<void> {
		const port = 8080; // TODO: Don't hard code this.
		await MoneyRestService.createServer(this.app, port);
		return;
	}

}
//#endregion
