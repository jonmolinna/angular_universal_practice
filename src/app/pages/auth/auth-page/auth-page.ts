import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthDto } from '../models/auth.dto';
import { AuthStore } from '../../../store/auth.store';

@Component({
  selector: 'app-auth-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-page.html',
})
export class AuthPage {
  private formBuilder = inject(FormBuilder);
  readonly productStore = inject(AuthStore);

  initialForm = this.formBuilder.group({
    email: [''],
    password: [''],
  });

  handleSubmit(event: Event) {
    event.preventDefault();
    let form = this.initialForm.value as AuthDto;
    this.productStore.authentication(form);
  }
}
