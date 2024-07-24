import { Component } from '@angular/core';
import {ButtonComponent} from "../shared/button/button.component";
import {InputComponent} from "../shared/input/input.component";
import {SelectComponent} from "../shared/select/select.component";

@Component({
  selector: 'app-notes-header',
  standalone: true,
  imports: [
    ButtonComponent,
    InputComponent,
    SelectComponent
  ],
  templateUrl: './notes-header.component.html',
  styleUrl: './notes-header.component.scss'
})
export class NotesHeaderComponent {

  noteOptions = [
    { value: 'decreaseDate', label: 'по убыванию' },
    { value: 'increaseDate', label: 'по возрастанию' },
  ];
  selectedNote = 'decreaseDate';

  onNoteChange(note: any) {
    console.log('Selected note:', note);
  }

  hello() {
    console.log('hello')
  }
}
