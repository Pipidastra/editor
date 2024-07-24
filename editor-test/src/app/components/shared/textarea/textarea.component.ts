import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';

import {FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextareaComponent),
    multi: true
  }]
})

export class TextareaComponent {
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Output() valueChange = new EventEmitter<string>();

  value: string | null = null;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  onTextareaChange(event: Event) {
    const textareaElement = event.target as HTMLTextAreaElement;
    this.value = textareaElement.value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  writeValue(value: string | null): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
