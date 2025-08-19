import { AbstractControl } from '@angular/forms';

export function getFieldError(
  control: AbstractControl | null,
  fieldName: string
): string {
  if (!control?.errors || !control.touched) {
    return '';
  }

  const errorMessages: { [key: string]: { [key: string]: string } } = {
    email: {
      required: 'El email es requerido',
      email: 'Ingrese un email válido',
    },
    password: {
      required: 'La contraseña es requerida',
      minlength: 'La contraseña debe tener al menos 6 caracteres',
    },
    name: {
      required: 'El nombre es requerido',
    },
  };

  const fieldErrors = errorMessages[fieldName];
  if (!fieldErrors) return '';

  for (const errorType in control.errors) {
    if (fieldErrors[errorType]) {
      return fieldErrors[errorType];
    }
  }

  return '';
}
