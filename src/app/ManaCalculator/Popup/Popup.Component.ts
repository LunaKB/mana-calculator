import { Component, EventEmitter, Input, Output } from '@angular/core';

// https://zerotomastery.io/blog/angular-modal/
@Component({
  selector: 'app-popup',
  standalone: true,
  templateUrl: './PopupComponent.html',
  styleUrls: ['./PopupComponent.css']
})
export class PopupComponent {
    @Input('title') Title: string
    @Input('message') Message: string
    @Output() close = new EventEmitter<void>();

    closePopup() {
	    this.close.emit();
    }
}