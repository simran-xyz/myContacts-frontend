import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudService } from 'src/app/service/crud.service';
import { PATTERNS } from 'src/enums';

@Component({
  selector: 'app-update-contact-dialog',
  templateUrl: './update-contact-dialog.component.html',
  styleUrls: ['./update-contact-dialog.component.scss']
})
export class UpdateContactDialogComponent implements OnInit {

  updateContact : FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) public data : any,
    private fb          : FormBuilder,
    private crudService : CrudService
  ) { }

  ngOnInit(): void {
    this.updateContact = this.fb.group({
      name  : ['', [Validators.required, Validators.pattern(PATTERNS.text)]],
      email : ['', [Validators.required, Validators.pattern(PATTERNS.email)]],
      phone : ['', [Validators.required, Validators.pattern(PATTERNS.mobile)]]
    })

    if(this.data.action === 'EDIT') {
    this.setFormValues(this.data.contact)
    }
  }

  get updateContactControls() {
    return this.updateContact.controls
  }

  addContact() {
    const newContact = {
      name  : this.updateContact.value.name,
      email : this.updateContact.value.email,
      phone : this.updateContact.value.phone
    }

    switch (this.data.action){
      case 'ADD' :
        this.crudService.addContact(newContact).subscribe(res => {
          window.location.reload()
        })
        break;
      case 'EDIT':
        const id = this.data.contact._id
        
        this.crudService.updateContact(id, newContact).subscribe(res => {
          window.location.reload()
        })
        break;
    }
  }

  setFormValues(contact : any) {
    this.updateContact.setValue({
      name : contact.name,
      email: contact.email,
      phone: contact.phone
    })
  }
}
