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
  selectedNote: Note | null = null;

  selectedSort = 'decreaseDate';
  noteOptions = [
    { value: 'decreaseDate', label: 'убыванию даты' },
    { value: 'increaseDate', label: 'возрастанию даты' },
  ];

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
      this.filteredNotes = notes;
      this.sortNotes();
      if (this.filteredNotes.length > 0) {
        this.selectNote(this.filteredNotes[0]);
        this.selectedNote = this.filteredNotes[0];
      }
    });
  }

  onNoteChange() {
    this.sortNotes();
  }

  addNote() {
    this.noteService.createNewNote();
  }

  filterNotes(searchTerm: string) {
    this.noteService.getNotes().subscribe(notes => {
      if (!searchTerm) {
        this.filteredNotes = notes;
      } else {
        this.filteredNotes = notes.filter(note =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.text.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      this.sortNotes();
    });
  }

  sortNotes() {
    const sortOrder = this.selectedSort === 'increaseDate' ? 1 : -1;
    this.filteredNotes.sort((a, b) => (new Date(a.date).getTime() - new Date(b.date).getTime()) * sortOrder);
  }

  selectNote(note: Note) {
    this.selectedNote = note;
    this.noteService.selectNote(note);
    console.log(note)
  }

}
