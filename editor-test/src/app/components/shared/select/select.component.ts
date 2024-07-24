import {Component, EventEmitter, Input, Output} from '@angular/core';

import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {Option, OptionValue} from "./select";

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})

export class SelectComponent {
  @Input() options: Option[] = [];
  @Input() selected: OptionValue | null = null;
  @Output() selectedChange: EventEmitter<OptionValue> = new EventEmitter<OptionValue>();

  onChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedChange.emit(selectElement.value);
  }
}
