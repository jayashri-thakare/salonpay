import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  template: `<p class="help is-danger gen-error" [class.hide]="_hide">{{_text}}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./control-error.component.css']
})
export class ControlErrorComponent implements OnInit {
  _text;
  _hide = true;

  @Input() set text(value) {
    if (value !== this._text) {
      console.log(value)
      this._text = value;
      this._hide = !value;
      this.cdr.detectChanges();
    }
  };

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

}
