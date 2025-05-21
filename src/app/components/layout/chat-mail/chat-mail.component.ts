import { AfterViewInit, ChangeDetectionStrategy, Component, computed, effect, ElementRef, HostBinding, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ButtonComponent } from '../../base/button.component';
import { NgClass } from '@angular/common';
import { DocumentListenerService } from '../../../services/document-listener.service';
import { LANGUAGE_APPLICATION } from '../../../tokens/language.tokens';
import { language_en_us, language_pt_br } from '../../../models/language.model';

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
export class ChatMailComponent implements AfterViewInit, OnInit {
  private documentListener = inject(DocumentListenerService);
  lg = inject(LANGUAGE_APPLICATION);
  // 
  type = signal<ContactChannel>('email');
  message = signal(' ');
  // isTouched = false;
  isTouched = computed(() => {
    const us_message = language_en_us.contact.chat.initial_message;
    const br_message = language_pt_br.contact.chat.initial_message;
    return this.message() !== us_message && this.message() !== br_message;
  });
  @ViewChild('textarea') textarea!: ElementRef<HTMLTextAreaElement>;

  ngAfterViewInit(): void {
    this.resizeTextArea();
  }

  ngOnInit(): void {
    this.message.set(this.lg().contact.chat.initial_message); // set initial message
  }

  constructor() {
    effect(() => {
      const detectScreenChange = this.documentListener.screenSize$(); // trigger effect on screen size change
      this.resizeTextArea();
    })
    effect(() => {
      if (!this.isTouched()) {
        this.message.set(this.lg().contact.chat.initial_message); // set translated initial message if textarea is not touched
      }
    })
  }

  setType(type: ContactChannel) {
    this.type.set(type);
  }

  setMessage(text: string) {
    this.message.set(text);
  }

  sendMessage() {
    const emailSubject = encodeURIComponent(this.lg().contact.email_subject);
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
    this.resizeTextArea();
  }


  private resizeTextArea(): void {
    if (this.textarea) {
      const textAreaElement = this.textarea.nativeElement;
      textAreaElement.style.height = 'auto';
      textAreaElement.style.height = textAreaElement.scrollHeight + 'px';
    }
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
