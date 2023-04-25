import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appMessage]',
})
export class MessageDirective {
  @Input() SenderId!: string;
  userId: any = sessionStorage.getItem('state');

  constructor(private el: ElementRef) {
    this.userId = JSON.parse(this.userId).userId;
  }

  ngOnInit(): void {
    if (this.SenderId == this.userId)
      this.el.nativeElement.classList.add('ms-auto');
    else this.el.nativeElement.classList.add('me-auto');
  }
}
