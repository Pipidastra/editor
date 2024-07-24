import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NotesListComponent} from "./components/notes-list/notes-list.component";
import {NotesHeaderComponent} from "./components/notes-header/notes-header.component";
import {NoteDescriptionComponent} from "./components/note-description/note-description.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NotesListComponent, NotesHeaderComponent, NoteDescriptionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'editor-test';
}
