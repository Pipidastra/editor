import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() value: string | null = null;
  @Input() disabled: boolean = false;
  @Output() valueChange = new EventEmitter<string>();

  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.valueChange.emit(inputElement.value);
  }
}
