import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Note } from './note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notesSubject: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>([]);
  private newNoteSubject = new BehaviorSubject<boolean>(false);
  public notes$: Observable<Note[]> = this.notesSubject.asObservable();


  private localStorageKey: string = 'notes';
  newNote$ = this.newNoteSubject.asObservable();

  constructor() {
    this.loadNotesFromLocalStorage();
  }

  getNotes(): Observable<Note[]> {
    return this.notes$;
  }

  addNote(item: Note): void {
    const currentNotes = this.notesSubject.value;
    const updatedNotes = [...currentNotes, item];
    this.notesSubject.next(updatedNotes);
    this.saveNotesToLocalStorage(updatedNotes);
  }

  createNewNote() {
    this.newNoteSubject.next(true);
  }

  updateNote(updatedNote: Note): void {
    const currentNotes = this.notesSubject.value;
    const index = currentNotes.findIndex(item => item.id === updatedNote.id);
    if (index !== -1) {
      currentNotes[index] = updatedNote;
      this.notesSubject.next([...currentNotes]);
      this.saveNotesToLocalStorage(currentNotes);
    }
  }

  deleteNote(id: number): void {
    const currentNotes = this.notesSubject.value;
    const updatedNotes = currentNotes.filter(item => item.id !== id);
    this.notesSubject.next(updatedNotes);
    this.saveNotesToLocalStorage(updatedNotes);
  }

  private saveNotesToLocalStorage(notes: Note[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(notes));
  }

  private loadNotesFromLocalStorage(): void {
    try {
      const notes = localStorage.getItem(this.localStorageKey);
      if (notes) {
        this.notesSubject.next(JSON.parse(notes));
      }
    } catch (error) {
      console.error('Error loading notes from Local Storage', error);
      this.notesSubject.next([]);
    }
  }
}
