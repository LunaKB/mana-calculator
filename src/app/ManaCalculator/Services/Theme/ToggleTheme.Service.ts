import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleThemeService {

  private currentTheme: string = 'dark';
  private themeChangeSubject = new Subject<string>();

  onThemeChange$ = this.themeChangeSubject.asObservable();

  constructor() { }

  getCurrentTheme() {
    return this.currentTheme;
  }

  setCurrentTheme(theme: string): void {
    this.currentTheme = theme;
    this.themeChangeSubject.next(theme);
  }
}