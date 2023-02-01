import { ValidatorFn } from "@angular/forms";


export function emailValidator(): ValidatorFn {

    const re = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

    return (control) => {
        return control.value === '' || re.test(control.value) ? null : { emailValidator: true };
    }
}