import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Iusager} from "../model/iusager";
import {Iuser} from "../model/iuser";
import {AbstractControl, FormGroup, ValidationErrors, ɵElement} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class BackofficerServiceService {

  public itemsSubject = new BehaviorSubject<Iusager[]>([]);
  items$ = this.itemsSubject.asObservable();
  id!: number;
  url = "http://localhost:8090/api"
  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
  vto = "vto"
  vpt = "vpt"
  user = "user"
  usager = "usager"

  constructor(public http: HttpClient) {
  }

//**********************************USAGER*********************

  getUsager(): Observable<Iusager[]> {
    return this.http.get<Iusager[]>(this.url + '/' + this.usager, this.httpOptions);
  }

  //*********************USAGER GET DETAIL*********************
  detailgetUsager(id: number): Observable<Iusager> {
    return this.http.get<Iusager>(this.url + '/' + this.usager + '/' + id, this.httpOptions);

  }

  //*********************USAGER  SUPPRIMER*********************

  deleteUsager(id: number): Observable<Iusager> {
    console.info(id)
    return this.http.delete<Iusager>(this.url + '/' + this.usager + '/' + id, this.httpOptions);
  }

//*********************USAGER  UPDATE*********************
  updateUsager(usagerupdate: any, id: any): Observable<Iusager> {

    console.warn(usagerupdate.value)
    console.warn(id)
    console.log(this.url + '/' + this.usager + '/' + id)
    return this.http.put<Iusager>(this.url + '/' + this.usager + '/' + id, usagerupdate.value, this.httpOptions);

  }

  // ****************************************AJOUTER LES UASAGERS**********************************************


  postUsage: { url: string, body: string }[] = [];

  addusager(monFormulaire: FormGroup<{
    [K in keyof { geolongititude: (string | ((control: AbstractControl) => (ValidationErrors | null)))[]; type: (string | ((control: AbstractControl) => (ValidationErrors | null))); numeroContact: (string | ((control: AbstractControl) => (ValidationErrors | null)))[]; geolatitude: (string | ((control: AbstractControl) => (ValidationErrors | null)))[]; msisdn: (string | ((control: AbstractControl) => (ValidationErrors | null)))[]; login: (string | ((control: AbstractControl) => (ValidationErrors | null)))[]; prenom: (string | ((control: AbstractControl) => (ValidationErrors | null)))[]; nom: (string | ((control: AbstractControl) => (ValidationErrors | null)))[] }]:
    ɵElement<{ geolongititude: (string | ((control: AbstractControl) => (ValidationErrors | null)))[]; type: (string | ((control: AbstractControl) => (ValidationErrors | null)))[]; numeroContact: (string | ((control: AbstractControl) => (ValidationErrors | null)))[]; geolatitude: (string | ((control: AbstractControl) => (ValidationErrors | null)))[]; msisdn: (string | ((control: AbstractControl) => (ValidationErrors | null)))[]; login: (string | ((control: AbstractControl) => (ValidationErrors | null)))[]; prenom: (string | ((control: AbstractControl) => (ValidationErrors | null)))[]; nom: (string | ((control: AbstractControl) => (ValidationErrors | null)))[] }[K], null>
  }>) {
    console.warn(monFormulaire.value);
    // TODO se documenter sur rxjs(pipe, map, tap)
    if (monFormulaire.value.type == "vto") {
      this.http.post<Iusager>(this.url + '/' + this.vto, monFormulaire.value)
        .subscribe({
            next: (x) => console.log('Observer got a next value vto persist: ' + x),
            error: (err) => console.error('Observer got an error: ' + err),
            complete: () => console.log('Observer got a complete notification')
          }
        );
    } else if (monFormulaire.value.type == "vpt") {
      this.http.post<Iusager>(this.url + '/' + this.vpt, monFormulaire.value)
        .subscribe({
            next: (x) => console.log('Observer got a next value vpt persist: ' + x),
            error: (err) => console.error('Observer got an error: ' + err),
            complete: () => console.log('Observer got a complete notification')
          }
        );
    }
    return null;
  }

  //********************************************************************************************************
//***************************VTO*********************
  getVto(): Observable<Iusager[]> {
    return this.http.get<Iusager[]>(this.url + '/' + this.vto, this.httpOptions);
  }

  //********************************************************************************************************
  //************************VPT*********************
  getVpt(): Observable<Iusager[]> {
    return this.http.get<Iusager[]>(this.url + '/' + this.vpt, this.httpOptions);
  }


  //********************************************************************************************************
//****************************USER*********************
  getUser(): Observable<Iuser[]> {
    return this.http.get<Iuser[]>(this.url + '/' + this.user, this.httpOptions);
  }

  //*******************USAGER GET DETAIL*********************
  detailgetUser(id: number): Observable<Iuser> {

    return this.http.get<Iuser>(this.url + '/' + this.user + '/' + id, this.httpOptions);
  }


}

