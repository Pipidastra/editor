import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NotesListComponent} from "./components/notes-list/notes-list.component";
import {NoteDescriptionComponent} from "./components/note-description/note-description.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NotesListComponent, NoteDescriptionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'editor-test';
}
