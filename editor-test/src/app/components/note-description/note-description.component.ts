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

  ngOnInit() {

    this.noteService.newNote$.subscribe(newNote => {
      if (newNote) {
        this.handleNewNote();
      }
    });
  }

  handleNewNote() {
    this.isNew = true;
    this.noteForm.reset();
    this.cdr.detectChanges();
  }

  onSubmit() {
    if (this.noteForm.valid) {
      const newNote: Note = {
        id: Date.now(),
        title: this.noteForm.value.title,
        text: this.noteForm.value.text,
        date: new Date()
      };
      this.noteService.addNote(newNote);
      this.isNew = false;
    }
  }

  onCancel() {
    this.isNew = false;
  }

}
