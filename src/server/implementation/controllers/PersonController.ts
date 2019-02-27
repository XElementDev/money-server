import {
	Controller,
	Get,
	Route
	} from "tsoa";
import { IdentifiablePerson } from "../../interface";


//#region not unit-tested
@Route("persons")
export class PersonController extends Controller {

	public constructor() {
		super();
		return;
	}


	@Get()
	public getPersonsSync(): Array<IdentifiablePerson> {
		return this.persons;
	}


	@Get("{id}")
	public getPersonSync(id: string): IdentifiablePerson {
		const matchingPersons = this.persons.filter((person) => person.id === id);
		return matchingPersons[0];
	}


	private static initializeDummyValuesSync(): void {
		const personA: IdentifiablePerson = {
			id: "1",
			prename: "Max",
			surname: "Mustermann",
		};
		const personB: IdentifiablePerson = {
			avatarUrlStr: "https://taeglichneu.files.wordpress.com/2011/01/mustermann.jpg",
			id: "2",
			prename: "Erika",
			surname: "Mustermann",
		};
		const dummyPersons = [ personA, personB ];
		PersonController._persons = dummyPersons;
		return;
	}


	public static initializeSync(): void {
		PersonController.initializeDummyValuesSync();
		return;
	}


	private get persons(): Array<IdentifiablePerson> { return PersonController._persons; }


	private static _persons: Array<IdentifiablePerson>; // tslint:disable-line

}


PersonController.initializeSync();
//#endregion
