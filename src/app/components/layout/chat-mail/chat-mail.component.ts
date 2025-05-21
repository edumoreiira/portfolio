import { Component, signal } from '@angular/core';
import { ButtonComponent } from '../../base/button.component';
import { NgClass } from '@angular/common';

type ContactChannel = 'whatsapp' | 'email';
@Component({
  selector: 'app-chat-mail',
  host: {
    class: "bg-neutral-900 rounded-2xl w-full min-h-fit p-4 outline-1 outline-transparent focus-within:outline-1 focus-within:outline-neutral-600 transition-colors relative"
  },
  imports: [ButtonComponent, NgClass],
  templateUrl: './chat-mail.component.html'
})
export class ChatMailComponent {
  type = signal<ContactChannel>('whatsapp');
  message = signal('Gostaria de fazer um site para o meu negócio. Poderia me passar mais informações?');

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
    this.autoResize(textArea);
  }

  autoResize(textarea: HTMLTextAreaElement): void {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
}
