import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from './../../models/user';

@Component({
  selector: 'app-signup-reactive-form',
  templateUrl: './signup-reactive-form.component.html',
  styleUrls: ['./signup-reactive-form.component.css']
})
export class SignupReactiveFormComponent implements OnInit {
  countries: Array<string> = ['Ukraine', 'Armenia', 'Belarus', 'Hungary', 'Kazakhstan', 'Poland', 'Russia'];
  user: User = new User();
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  private createForm() {
    this.userForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      sendProducts: new FormControl(true)
    });
  }

  private buildForm() {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: [
        { value: 'Zhyrytskyy', disabled: false },
        [Validators.required, Validators.maxLength(50)]
      ],
      email: [
        '',
        [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+'), Validators.email]
      ],
      sendProducts: true
    });
  }

  onSave() {
    // Form model
    console.log(this.userForm);
    // Form value w/o disabled controls
    console.log(`Saved: ${JSON.stringify(this.userForm.value)}`);
    // Form value w/ disabled controls
    console.log(`Saved: ${JSON.stringify(this.userForm.getRawValue())}`);
  }

  private setFormValues() {
    this.userForm.setValue({
      firstName: 'Vitaliy',
      lastName: 'Zhyrytskyy',
      email: 'vitaliy_zhyrytskyy@ukr.net',
      sendProducts: false
    });
  }

  private patchFormValues() {
    this.userForm.patchValue({
      firstName: 'Vitaliy',
      lastName: 'Zhyrytskyy'
    });
  }

}
