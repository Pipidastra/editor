import {ChangeDetectorRef, Component} from '@angular/core';
import {ButtonComponent} from "../shared/button/button.component";
import {CommonModule} from "@angular/common";
import {NoteService} from "../../services/note-service/note.service";
import {Note} from "../../services/note-service/note";
import {InputComponent} from "../shared/input/input.component";
import {SelectComponent} from "../shared/select/select.component";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";

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

  private destroy$ = new Subject<void>();

  constructor(private noteService: NoteService, private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.searchForm = this.fb.group({
      search: ['']
    });

    this.searchForm.get('search')?.valueChanges.subscribe(value => {
      this.filterNotes(value);
    });
  }

  ngOnInit(): void {
    this.noteService.getNotes()
      .pipe(takeUntil(this.destroy$))
      .subscribe(notes => {
        this.notes = notes;
        this.filteredNotes = [...this.notes];
        this.sortNotes();
        if (this.filteredNotes.length > 0) {
          this.selectNote(this.filteredNotes[0]);
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

  deleteNote(note: Note) {
      this.noteService.deleteNote(note.id);
      this.selectedNote = null;
      this.noteService.getNotes().subscribe(notes => {
        if (notes.length > 0) {
          this.noteService.selectNote(notes[0]);
        } else {
          this.noteService.selectNote(null);
        }
      });
      this.cdr.detectChanges();
  }

  sortNotes() {
    const sortOrder = this.selectedSort === 'increaseDate' ? 1 : -1;
    this.filteredNotes.sort((a, b) => (new Date(a.date).getTime() - new Date(b.date).getTime()) * sortOrder);
  }

  selectNote(note: Note) {
    this.selectedNote = note;
    this.noteService.selectNote(note);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
