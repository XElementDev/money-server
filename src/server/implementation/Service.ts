import bodyParser from "body-parser";
import express from "express";
import * as http from "http";
import urljoin from "url-join";
import {
	CompanyInfo,
	ProductInfo
	} from "../../common/publishing";
import { ServiceConfig } from "../interface";
import { CategoryController } from "./controllers/CategoryController";
import "./controllers/PersonController";
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
		CategoryController.categories = [];
		RetailerController.retailers = [];

		this.app.use(bodyParser.json());

		const path = "/" + urljoin(
			CompanyInfo.internalName,
			ProductInfo.internalName,
			"API",
			"REST"
		);
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
