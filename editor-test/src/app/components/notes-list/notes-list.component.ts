import { Component } from '@angular/core';
import {ButtonComponent} from "../shared/button/button.component";
import {CommonModule} from "@angular/common";
import {NoteService} from "../../services/note-service/note.service";
import {Note} from "../../services/note-service/note";
import {InputComponent} from "../shared/input/input.component";
import {SelectComponent} from "../shared/select/select.component";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [
    ButtonComponent,
    CommonModule,
    InputComponent,
    SelectComponent,
    ReactiveFormsModule
  ],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss'
})
export class NotesListComponent {
  notes: Note[] = [];
  filteredNotes: Note[] = [];
  searchForm: FormGroup;

  constructor(private noteService: NoteService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      search: ['']
    });

    this.searchForm.get('search')?.valueChanges.subscribe(value => {
      this.filterNotes(value);
    });
  }

  ngOnInit(): void {
    this.noteService.getNotes().subscribe(notes => {
      this.notes = notes;
      this.filteredNotes = notes;
      this.sortNotes();
    });
  }

  selectedNote = 'decreaseDate';
  noteOptions = [
    { value: 'decreaseDate', label: 'убыванию даты' },
    { value: 'increaseDate', label: 'возрастанию даты' },
  ];

  onNoteChange() {
    this.sortNotes();
  }

  addNote() {
    this.noteService.createNewNote();
  }

  filterNotes(searchTerm: string) {
    if (!searchTerm) {
      this.filteredNotes = this.notes;
    } else {
      this.filteredNotes = this.notes.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    this.sortNotes();
  }

  sortNotes() {
    const sortOrder = this.selectedNote === 'increaseDate' ? 1 : -1;
    this.filteredNotes.sort((a, b) => {
      const dateA = a.date instanceof Date ? a.date.getTime() : new Date(a.date).getTime();
      const dateB = b.date instanceof Date ? b.date.getTime() : new Date(b.date).getTime();
      return (dateA - dateB) * sortOrder;
    });
  }
}
