export interface Iconnexion {
  login: string,
  password: string,
}
class Connexion implements Iconnexion {
  password: string;
  login: string;
  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
  }

}



