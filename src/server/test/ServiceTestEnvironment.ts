import * as urljoin from "url-join";
import { MoneyRestService } from "../implementation/Service";
import { ServiceConfig } from "../interface";


export class ServiceTestEnvironment {

	public constructor() {
		this.servicePort = 1337;

		return;
	}


	public async create(): Promise<void> {
		this._serviceUrlStr = urljoin(
			`http://localhost:${this.servicePort}`,
			"XElement",
			"Money",
			"API",
			"REST",
			"v0"
		);

		await this.startService();

		return;
	}


	public async dispose(): Promise<void> {
		await this.service.stop();
		return;
	}


	private service: MoneyRestService;


	private servicePort: number;


	public get serviceUrlStr(): string { return this._serviceUrlStr; }


	private async startService(): Promise<void> {
		const serviceConfig: ServiceConfig = { port: this.servicePort };
		this.service = new MoneyRestService(serviceConfig);
		await this.service.start();
		return;
	}


	private _serviceUrlStr: string; // tslint:disable-line

}
