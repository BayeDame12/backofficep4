import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BackofficerServiceService} from "../../../service/backofficer-service.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Iusager} from "../../../model/iusager";

declare var jquery: any;
declare var $: any;

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
  usage!: any
  status!: string;
  messageerreurformulaire!: string;
  states = [
    'vto',
    'vpt',
  ];
  submitted = false;
  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private modalService: BsModalService, private activatedRoute: ActivatedRoute, private backofficerServiceService: BackofficerServiceService) {
  }

  ngOnInit(): void {
//affichage donnee usager venue de la base de donne
    this.backofficerServiceService.getUsager().subscribe(data => {
      if (data != null) {
        this.usager = data;
        console.warn("donne", this.usager);
        console.log("donnees disponible");
      } else {
        console.warn("pas de données");
      }
    });

    this.registerForm = this.formBuilder.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      geolatitude: ['', Validators.required],
      geolongititude: ['', Validators.required],
      login: ['', [Validators.required, Validators.email]],
      msisdn: ['', [Validators.required, Validators.maxLength(9)]],
      numeroContact: ['', [Validators.required, Validators.maxLength(9)]],
      type: ['', Validators.required],

    });
    this.status = "ajouter"
  }



  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.ajout(this.registerForm.value);
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  detail(id: any) {
    this.detailus = id
    console.warn(id)
  }

  update(usager: Iusager, id: any) {
    this.registerForm = this.formBuilder.group({
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
    this.status = "mise a jour"
    this.backofficerServiceService.updateUsager(this.registerForm, usager.id).subscribe({
      next: (x) => console.log('Observer got a next value vto persist: ' + x),
      error: (err) => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification')
    });
  }

  ajout(monFormulaire: any) {
    this.backofficerServiceService.addusager(this.registerForm);
    this.registerForm.reset()
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



