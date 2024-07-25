import {ChangeDetectorRef, Component} from '@angular/core';
import {ButtonComponent} from "../shared/button/button.component";
import {NoteService} from "../../services/note-service/note.service";
import {CommonModule} from "@angular/common";
import {InputComponent} from "../shared/input/input.component";
import {TextareaComponent} from "../shared/textarea/textarea.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Note} from "../../services/note-service/note";

@Component({
  selector: 'app-note-description',
  standalone: true,
  imports: [
    ButtonComponent,
    CommonModule,
    InputComponent,
    TextareaComponent,
    ReactiveFormsModule
  ],
  templateUrl: './note-description.component.html',
  styleUrl: './note-description.component.scss'
})
export class NoteDescriptionComponent {
  noteForm: FormGroup;
  isNew = false;
  isEditing = false;
  selectedNote: Note | null = null;

  constructor(
    private noteService: NoteService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      text: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.noteService.selectedNote$.subscribe(note => {
      this.selectedNote = note;
      if (note) {
        this.noteForm.patchValue({
          title: note.title,
          text: note.text
        });
      }
    });
    this.noteService.newNote$.subscribe(newNote => {
      if (newNote) {
        this.handleNewNote();
      }
    });
  }

  handleNewNote() {
    this.isNew = true;
    this.isEditing = false;
    this.noteForm.reset();
    this.cdr.detectChanges();
  }

  editNote() {
    this.isEditing = true;
    this.isNew = false;
  }

  deleteNote() {
    if (this.selectedNote) {
      this.noteService.deleteNote(this.selectedNote.id);
      this.selectedNote = null;
      this.isEditing = false;
      this.isNew = false;

      this.noteService.getNotes().subscribe(notes => {
        if (notes.length > 0) {
          this.noteService.selectNote(notes[0]);
        } else {
          this.noteService.selectNote(null);
        }
      });
    }
  }

  onSubmit() {
    if (this.noteForm.valid) {
      if (this.isEditing && this.selectedNote) {
        const updatedNote: Note = {
          ...this.selectedNote,
          title: this.noteForm.value.title,
          text: this.noteForm.value.text,
        };
        this.noteService.updateNote(updatedNote);
      } else {
        const newNote: Note = {
          id: Date.now(),
          title: this.noteForm.value.title,
          text: this.noteForm.value.text,
          date: new Date()
        };
        this.noteService.addNote(newNote);
      }
      this.isNew = false;
      this.isEditing = false;
    }
  }

  onCancel() {
    this.isNew = false;
    this.isEditing = false;
  }
}
