import { AfterViewInit, ChangeDetectionStrategy, Component, effect, ElementRef, HostBinding, inject, signal, ViewChild } from '@angular/core';
import { ButtonComponent } from '../../base/button.component';
import { NgClass } from '@angular/common';
import { DocumentListenerService } from '../../../services/document-listener.service';

type ContactChannel = 'whatsapp' | 'email';
@Component({
  selector: 'app-chat-mail',
  host: {
    class: "flex flex-col justify-between bg-neutral-900 rounded-2xl p-4 outline-1 outline-transparent focus-within:outline-1 transition-colors"
  },
  imports: [ButtonComponent, NgClass],
  templateUrl: './chat-mail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMailComponent implements AfterViewInit {
  documentListener = inject(DocumentListenerService);
  // 
  type = signal<ContactChannel>('email');
  message = signal('Gostaria de fazer um site para o meu negócio. Poderia me passar mais informações?');
  @ViewChild('textarea') textarea!: ElementRef<HTMLTextAreaElement>;

  ngAfterViewInit(): void {
    if (this.textarea) {
      const textAreaElement = this.textarea.nativeElement;
      this.resizeTextArea(textAreaElement);
    }
  }

  constructor() {
    effect(() => {
      const detectScreenChange = this.documentListener.screenSize$();
      this.resizeTextArea(this.textarea.nativeElement);
    })
  }

  setType(type: ContactChannel) {
    this.type.set(type);
  }

  setMessage(text: string) {
    this.message.set(text);
  }

  sendMessage() {
    const emailSubject = encodeURIComponent('Olá, quero fazer o orçamento de um site');
    const encodedMessage = encodeURIComponent(this.message());
    if (this.type() === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?phone=5561996111423&text=${ encodedMessage }`);
    } else {
      window.open(`mailto:edumoreira.dev@gmail.com?subject=${ emailSubject }&body=${ encodedMessage }`);
    }
    console.log(encodeURIComponent(this.message()));
  }

  onInput(event: Event){
    const textArea = event.target as HTMLTextAreaElement;
    this.setMessage(textArea.value);
    this.resizeTextArea(textArea);
  }

  private resizeTextArea(textarea: HTMLTextAreaElement): void {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  surfaceClick() {
    const textarea = this.textarea.nativeElement;
    const length = textarea.value.length;
    textarea.setSelectionRange(length, length);
    textarea.focus();
  }

  @HostBinding('class')
  get variantClasses() {
    return this.type() === 'whatsapp' ? 'focus-within:outline-green-800' : 'focus-within:outline-neutral-600'
  }
}
