import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private modals: any[] = [];
  private userdetail: {};

  add(modal: any) {
    // add modal to array of active modals
    this.modals.push(modal);
  }

  remove(id: string) {
    // remove modal from array of active modals
    this.modals = this.modals.filter(x => x.id !== id);
  }

  open(id: string, userdetail) {
    // open modal specified by id
    const modal = this.modals.find(x => x.id === id);
    modal.open();
  }

  open1(id: string) {
    // open modal specified by id
    // debugger;
    const modal = this.modals.find(x => x.id === id);
    modal.open();
  }

  opennote(id: string) {
    // open modal specified by id
    const modal = this.modals.find(x => x.id === id);
    modal.openNote();
  }

  openemail(id: string) {
    // open modal specified by id
    const modal = this.modals.find(x => x.id === id);
    modal.openEmail();
  }

  closeNote(id: string) {
    // close modal specified by id
    const modal = this.modals.find(x => x.id === id);
    // document.querySelector('.overlay').classList.remove('overlay-in');
    modal.closeNote();
  }
  closeEmail(id: string) {
    // close modal specified by id
    const modal = this.modals.find(x => x.id === id);
    // document.querySelector('.overlay').classList.remove('overlay-in');
    modal.closeNote();
  }
  setUser(userdetail) {
    this.userdetail = userdetail;
  }

  getUser() {
    return this.userdetail;
  }
  close(id: string) {
    // close modal specified by id
    const modal = this.modals.find(x => x.id === id);
    // document.querySelector('.overlay').classList.remove('overlay-in');
    modal.close();
  }
}
