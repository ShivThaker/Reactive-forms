import { AbstractControl, ValidatorFn } from "@angular/forms";

// export function forbiddenNameValidator(control: AbstractControl): {[key: string]: any} | null {
//     const forbidden = /admin/.test(control.value);
//     // sets true/false depending on the name
//     return forbidden ? {'forbiddenName': {value: control.value}} : null;
// }
// a form control parameter
// when validation fails, it return an object else null
// test if the form control val matches the pattern admin

// a funtion that return a validator function or a factory funciton

export function forbiddenNameValidator(forbiddenName: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        const forbidden = forbiddenName.test(control.value);
        return forbidden ? {'forbiddenName': {value: control.value}} : null;
    };
}