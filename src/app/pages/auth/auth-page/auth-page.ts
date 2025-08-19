import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthDto } from '../models/auth.dto';
import { AuthStore } from '../../../store/auth.store';
import { CustomInput } from '../../../core/components/custom-input/custom-input';
import { getFieldError } from '../../../core/components/custom-input/form-error.utils';

@Component({
  selector: 'app-auth-page',
  imports: [CommonModule, ReactiveFormsModule, CustomInput],
  templateUrl: './auth-page.html',
})
export class AuthPage {
  private formBuilder = inject(FormBuilder);
  readonly productStore = inject(AuthStore);

  initialForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  handleSubmit(event: Event) {
    event.preventDefault();
    let form = this.initialForm.value as AuthDto;
    console.log('Form submitted:', form);
    // this.productStore.authentication(form);
  }

  // Metodo para obtener errores
  // Un solo método genérico que reemplaza a los otros dos
  getFieldErrorMessage(fieldName: string): string {
    return getFieldError(this.initialForm.get(fieldName), fieldName);
  }
}
