import * as rpn from "request-promise-native";
import * as urljoin from "url-join";
import { MoneyRestService } from "../implementation/Service";
import { ServiceConfig } from "../interface";


export class ServiceTestEnvironment {

	public constructor() {
		this.detailedRpnOptions = {
			resolveWithFullResponse: true,
			simple: false
		};
		this.simpleRpnOptions = { json: true };
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


	public readonly detailedRpnOptions: rpn.RequestPromiseOptions;


	public async dispose(): Promise<void> {
		await this.service.stop();
		return;
	}


	private get service(): MoneyRestService {
		if (this._service === undefined) {
			throw new Error("`ServiceTestEnvironment` misused");
		}
		return this._service;
	}

	private _service: MoneyRestService | undefined; // tslint:disable-line


	private servicePort: number;


	public get serviceUrlStr(): string {
		if (this._serviceUrlStr === undefined) {
			throw new Error("`ServiceTestEnvironment` misused");
		}
		return this._serviceUrlStr;
	}

	private _serviceUrlStr: string | undefined; // tslint:disable-line


	public readonly simpleRpnOptions: rpn.RequestPromiseOptions;


	private async startService(): Promise<void> {
		const serviceConfig: ServiceConfig = { port: this.servicePort };
		this._service = new MoneyRestService(serviceConfig);
		await this.service.start();
		return;
	}

}
