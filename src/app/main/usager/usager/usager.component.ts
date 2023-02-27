import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BackofficerServiceService} from "../../../service/backofficer-service.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Iusager} from "../../../model/iusager";
import {AuthentificationBackofficerService} from "../../../service/authentification-backofficer.service";

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

  constructor(private formBuilder: FormBuilder, private modalService: BsModalService, private activatedRoute: ActivatedRoute, private backofficerServiceService: BackofficerServiceService,private authentification:AuthentificationBackofficerService) {
  }

  ngOnInit(): void {
//affichage donnee usager venue de la base de donne
    this.backofficerServiceService.getUsager().subscribe(data => {
      if (data != null) {
        this.usager = data;
      } else {
        console.warn("pas de données");
      }
    });

    this.registerForm = this.formBuilder.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      geolatitude: ['', Validators.required],
      geolongititude: ['', Validators.required],
      login: ['', Validators.required],
      msisdn: ['', Validators.required],
      numeroContact: ['', Validators.required],
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
    console.warn("donne envoyer",this.registerForm.value)
    this.ajout(this.registerForm.value);
  }
  // ************************************RESET FORMULAIRE************************************


  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  detail(id: any) {
    this.detailus = id
    console.warn(id)
  }
  // ************************************MISE A JOUR************************************

  update(usager: Iusager, id: any) {
    this.registerForm = this.formBuilder.group({
      id: [usager.id],
      prenom: [usager.prenom],
      nom: [usager.nom],
      geolatitude: [usager.geolongititude],
      geolongititude: [usager.geolongititude],
      msisdn: [usager.msisdn],
      numeroContact: [usager.numeroContact],
      login: [usager.login],
      type: [usager.type],
    });
    this.status = "mise a jour"
    this.backofficerServiceService.updateUsager(this.registerForm, usager.id).subscribe({
      next: (x) => console.log('Observer got a next value vto persist: ' + x),
      error: (err) => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification')
    });
    // this.registerForm.reset()
   // window.location.reload();

  }
  // ************************************AJOUTER UN UTILISATEUR************************************


  ajout(monFormulaire: any) {
    this.backofficerServiceService.addusager(this.registerForm);
    this.registerForm.reset()
    window.location.reload();

  }
  // ************************************SUPPRIMER UN UTILISATEUR************************************
  deleteUsager(usager: any) {
    this.backofficerServiceService.deleteUsager(usager).subscribe(data => {
      window.location.reload();
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  // ************************************SUBMIT MISE A JOUR************************************



  onsubmit(uptodate: any) {
    if (uptodate.id) {
      this.update(uptodate, uptodate.id)
      window.location.reload();
    } else {

      this.ajout(uptodate)
      window.location.reload();
    }
  }
  // ************************************DECONNEXION************************************
  logout(){
    this.authentification.logout()
    }


}



