import { Component } from '@angular/core';
import {ButtonComponent} from "../shared/button/button.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [
    ButtonComponent,
    CommonModule
  ],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss'
})
export class NotesListComponent {
  notes = [
    {title: 'рello', content: 'аhe world is good'},
    {title: 'Hello', content: 'The world is good'},
  ]
}
