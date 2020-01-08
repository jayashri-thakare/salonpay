
import { InjectionToken } from '@angular/core';


export const defaultErrors = {
  required: (error) => `This field is required.`,
  pattern: (error) => 'This is not valid.',
  minlength: ({ requiredLength, actualLength }) => `Password should not be less than 8.`,
  MustMatch: (error) => 'Password does not match.'
}

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => defaultErrors
});


