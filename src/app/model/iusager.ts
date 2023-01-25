export interface Iusager {

  id: number,
  prenom: string,
  nom: string,
  msisdn: string,
  numeroContact: string,
  login: string,
  geolatitude: string,
  geolongititude: string,
  type: string

}

class Usager implements Iusager {

  id: number;
  prenom: string;
  geolatitude: string;
  geolongititude: string;
  login: string;
  msisdn: string;
  nom: string;
  numeroContact: string;
  type: string;

  constructor(id: number,
              prenom: string,
              geolatitude: string,
              geolongititude: string,
              login: string,
              msisdn: string,
              nom: string,
              numeroContact: string,
              type: string) {
    this.id = id;
    this.prenom = prenom;
    this.nom = nom;
    this.geolatitude = geolatitude;
    this.geolongititude = geolongititude;
    this.msisdn = msisdn;
    this.numeroContact = numeroContact;
    this.login = login;
    this.type = type
  }

}
