import { Component } from '@angular/core';
import {ButtonComponent} from "../shared/button/button.component";

@Component({
  selector: 'app-note-description',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './note-description.component.html',
  styleUrl: './note-description.component.scss'
})
export class NoteDescriptionComponent {

}
