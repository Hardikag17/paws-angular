import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() text!: string;
  @Input() color!: string;
  @Input() disabled: boolean = false;
  @Output() btnClick = new EventEmitter();

  onClick = () => {
    this.btnClick.emit();
  };
}
