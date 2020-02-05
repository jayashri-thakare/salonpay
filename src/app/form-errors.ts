
import { InjectionToken } from '@angular/core';


export const defaultErrors = {
  required: (error) => `This field is required.`,
  pattern: (error) => 'This is not valid.',
  minlength: ({ requiredLength, actualLength }) => `Min 8 chars. Atleast 1 Uppercase,1 Lowercase and 1 Number.`,
  maxlength: ({ requiredLength, actualLength }) => `Should not be more than 10.`,
  MustMatch: (error) => 'Password dont match.'
}

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => defaultErrors
});


