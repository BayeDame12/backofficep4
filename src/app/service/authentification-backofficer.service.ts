import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Iconnexion} from "../model/iconnexion";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationBackofficerService {
  public itemsSubject = new BehaviorSubject<Iconnexion[]>([]);
  items$ = this.itemsSubject.asObservable();
  url = "http://localhost:8080/auth/realms/backendp4/protocol/openid-connect/token"
  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
  constructor(public http: HttpClient) { }

  connexion(connexionForm:any):Observable<Iconnexion[]>{
    console.warn(connexionForm.value)
    return this.http.post<Iconnexion[]>(this.url,this.httpOptions);
  }









}
