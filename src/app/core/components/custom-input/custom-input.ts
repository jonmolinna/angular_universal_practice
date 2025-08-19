import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  imports: [],
  templateUrl: './custom-input.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInput),
      multi: true
    }
  ]
})
export class CustomInput implements ControlValueAccessor {
  @Input() label: string = "";
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() id: string = '';
  @Input() error: string = '';
  @Input() disabled: boolean = false;
  @Input() customClass: string = '';

  value: string = '';

  private onChange = (value: string) => {};
  private onTouched = () => {};

  get inputClasses(): string {
    const baseClasses = 'bg-gray-50 border text-gray-900 text-sm placeholder:text-gray-500 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5';
    const errorClasses = this.error ? 'border-red-500' : 'border-gray-300';
    return `${baseClasses} ${errorClasses} ${this.customClass}`;
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
  }

  onBlur(): void {
    this.onTouched();
  }

  // ControlValueAccessor Methods
  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
