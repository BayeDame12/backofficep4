import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BackofficerServiceService} from "../../../service/backofficer-service.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Iusager} from "../../../model/iusager";

@Component({
  selector: 'app-usager',
  templateUrl: './usager.component.html',
  styleUrls: ['./usager.component.css'],

})

export class UsagerComponent implements OnInit {
  usager!: any[];
  detailUsager!: any
  detailus!: any
  modalRef?: BsModalRef;
  monFormulaire!: FormGroup;
  Formulaire!: FormGroup;
  usage!: any
  status!: string;
  states = [
    'vto',
    'vpt',
  ];
  element!: any;

  constructor(private fb: FormBuilder, private modalService: BsModalService, private activatedRoute: ActivatedRoute, private backofficerServiceService: BackofficerServiceService) {
  }

  ngOnInit(): void {
//affichage donnee usager venue de la base de donne
    this.backofficerServiceService.getUsager().subscribe(data => {
      if (data != null) {
        console.log("donnees disponible");
        data.forEach(element => {
          this.usager = data;
          this.element = element;
        })
      } else {
        console.warn("pas de données");
      }
    })

    //lister details usager
    const usagerdetail = this.activatedRoute.snapshot.params['id'];
    this.backofficerServiceService.detailgetUsager(usagerdetail).subscribe(data => {
      this.detailUsager = data;
      console.warn("supprimer", this.detailUsager)
    })
    this.monFormulaire = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      geolatitude: ['', Validators.required],
      geolongititude: ['', Validators.required],
      msisdn: ['', Validators.required],
      numeroContact: ['', Validators.required],
      login: ['', Validators.required],
      type: ['', Validators.required],
    });

  }

  detail(id: any) {
    this.detailus = id
    console.warn(id)
  }

  update(usager: Iusager, id: any) {
    this.monFormulaire = this.fb.group({
      id: [usager.id],
      prenom: [usager.prenom, Validators.required],
      nom: [usager.nom, Validators.required],
      geolatitude: [usager.geolongititude, Validators.required],
      geolongititude: [usager.geolongititude, Validators.required],
      msisdn: [usager.msisdn, Validators.required],
      numeroContact: [usager.numeroContact, Validators.required],
      login: [usager.login, Validators.required],
      type: [usager.type, Validators.required],
    });
    this.backofficerServiceService.updateUsager(this.monFormulaire, usager.id).subscribe({
      next: (x) => console.log('Observer got a next value vto persist: ' + x),
      error: (err) => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification')
    });

  }

  ajout(monFormulaire: any) {
    this.backofficerServiceService.addusager(this.monFormulaire);
    this.monFormulaire.reset()
  }

//supprimer un utilisateur
  deleteUsager(usager: any) {
    this.backofficerServiceService.deleteUsager(usager).subscribe(data => {
      window.location.reload();
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onsubmit(uptodate: any) {
    if (uptodate.id) {
      this.update(uptodate, uptodate.id)
      window.location.reload();

    } else {

      this.ajout(uptodate)
      window.location.reload();
    }
  }
}
