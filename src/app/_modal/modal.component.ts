import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

import { ModalService } from './modal.service';

@Component({
  selector: 'jw-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  private element: any;

  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    // ensure id attribute exists
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', el => {
      if (el.target.className === 'jw-modal') {
        this.close();
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);
  }

  // remove self from modal service when component is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  // open modal
  open(): void {
    document.body.classList.add('jw-modal-open');
    let myTag = this.el.nativeElement.querySelector('.mobile-side'); // you can select html element by getelementsByClassName also, please use as per your requirement.
    myTag.classList.add('mobile-side-in');
    document.querySelector('.overlay').classList.add('overlay-in');
  }

  // open modal
  openNote(): void {
    document.body.classList.add('jw-modal-open');
    let myTag = this.el.nativeElement.querySelector('.comm-note'); // you can select html element by getelementsByClassName also, please use as per your requirement.
    myTag.classList.add('comm-note-box');
    // document.querySelector('.overlay').classList.add('overlay-in');
  }

  // close modal
  close(): void {
    document.body.classList.remove('jw-modal-open');
    let myTag = this.el.nativeElement.querySelector('.mobile-side'); // you can select html element by getelementsByClassName also, please use as per your requirement.
    myTag.classList.remove('mobile-side-in');
    document.querySelector('.overlay').classList.remove('overlay-in');
  }  // close modal

  closeNote(): void {
    document.body.classList.remove('jw-modal-open');
    let myTag = this.el.nativeElement.querySelector('.comm-note'); // you can select html element by getelementsByClassName also, please use as per your requirement.
    myTag.classList.remove('comm-note-box');
    // document.querySelector('.overlay').classList.remove('overlay-in');
  }
}
