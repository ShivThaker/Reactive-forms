import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup } from '@angular/forms';
import { Form, FormBuilder, FormGroup, Validator, Validators, FormArray } from '@angular/forms';
import { passwordValidator } from './shared/password.validator';
import { forbiddenNameValidator } from './shared/user-name.validator';
import { RegistrationService } from './registration.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // public registrationForm: FormGroup;
  registrationForm!: FormGroup;
  constructor(private fb: FormBuilder, private _registrationService: RegistrationService) {}
  // using the form builder service
  ngOnInit() {
    this.registrationForm = this.fb.group(
      {
        userName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            forbiddenNameValidator(/admin/),
          ],
        ],
        password: [''],
        confirmPassword: [''],
        address: this.fb.group({
          city: [''],
          state: [''],
          postalCode: [''],
        }),
        email: [''],
        alternateEmails: this.fb.array([]),
        subscribe: false,
      },
      { validators: passwordValidator }
    );

    // valuechanges returns an observable
    this.registrationForm.get('subscribe')?.valueChanges
      .subscribe(checkedValue => {
        const email = this.registrationForm.get('email');
        if (checkedValue) {
          email?.setValidators(Validators.required);
        } else {
          email?.clearValidators()
        }
        email?.updateValueAndValidity();
      });
  }
  get userName() {
    return this.registrationForm.get('userName'); // a getter
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get alternateEmails() {
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  addAlternateEmail() {
    this.alternateEmails.push(this.fb.control('')); // method to dynamically push form control into the form array
  }
  // new formgp instance that represents the user registration form
  // registrationForm = new FormGroup({
  //   userName: new FormControl('Shiv'),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     postalCode: new FormControl(''),
  //   })
  // });

  // next step is to initialize this formgp with an obj of controls that are present in the html
  // form model ready
  // next associate the model with the view which is our html form

  loadApiData() {
    // this.registrationForm.setValue({
    //   userName: "Shiv",
    //   password: "test",
    //   confirmPassword: "test",
    //   address: {
    //     city: "city",
    //     state: "state",
    //     postalCode: "123456"
    //   }
    // })
    this.registrationForm.patchValue({
      userName: 'Shiv',
      password: 'test',
      confirmPassword: 'test',
    });
    // setValue accepts an object that matches the structure of the formgroup with control names as keys
  }

  onSubmit() {
    console.log(this.registrationForm.value);
    this._registrationService.register(this.registrationForm.value)
      .subscribe(
        response => console.log("Success!", response),
        error => console.error("Error!", error)
      )
  }
}
// now do custom validation
// custom validator is but a function, can be written right into the component file itself
// always create a sep file to export them
