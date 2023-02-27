import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Iconnexion} from "../model/iconnexion";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationBackofficerService {
  public itemsSubject = new BehaviorSubject<Iconnexion | null>(null);
  items$ = this.itemsSubject.asObservable();

  isAuthenticated: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(null);
  token = '';

  public get userValue(){
    return this.itemsSubject.asObservable();
  }
  userlogged: BehaviorSubject<any> = new BehaviorSubject<any>(null);

   httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  private currentUserSubject!: BehaviorSubject<any>;
  public currentUser!: Observable<any>;

  constructor(public http: HttpClient,private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('token') || '[]'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

// Net@BM656677?
  login(user:Iconnexion):any{
    console.warn('connexion',user)
    return this.http.post<any>(`${environment.url}/login`,user).subscribe(data => {
      console.warn( data.status)
      this.router.navigateByUrl('/home');

    });
  }
  logout(){
    console.log("deconnexion")
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }


}
