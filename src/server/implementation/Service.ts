import * as bodyParser from "body-parser";
import * as express from "express";
import * as http from "http";
import * as urljoin from "url-join";
import {
	CompanyInfo,
	ProductInfo
	} from "../../common/publishing";
import { ServiceConfig } from "../interface";
import { PersonController } from "./controllers/PersonController"; // tslint:disable-line:no-unused-variable
import { RetailerController } from "./controllers/RetailerController";
import { RegisterRoutes as registerRoutesSync } from "./generated/routes";


//#region not unit-tested
export class MoneyRestService {

	public constructor(
		config: Partial<ServiceConfig>
	) {
		this.app = express();
		this.subApp = express();
		this.config = {
			port: config.port || 8080
		};

		this.configureRoutesSync();

		return;
	}


	private app: express.Express;


	private config: ServiceConfig;


	private configureRoutesSync(): void {
		registerRoutesSync(this.subApp);
		RetailerController.retailers = [];

		this.app.use(bodyParser.json());

		const path = "/" + urljoin(
			CompanyInfo.internalName,
			ProductInfo.internalName,
			"API",
			"REST"
		); // TODO: Don't hard code this.
		this.app.use(path, this.subApp);

		return;
	}


	private server: http.Server;


	public async start(): Promise<void> {
		this.server = await new Promise<http.Server>((resolve, __) => {
			const server = this.app.listen(this.config.port, () => { resolve(server); });
		});
		return;
	}


	public async stop(): Promise<void> {
		await new Promise<void>((resolve, __) => {
			this.server.close(() => { resolve(); });
		});
		return;
	}


	private subApp: express.Express;

}
//#endregion
