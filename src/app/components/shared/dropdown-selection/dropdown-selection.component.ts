import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, computed, effect, ElementRef, input, output, signal, ViewChild } from '@angular/core';
import { DocumentListenerService } from '../../../services/document-listener.service';
import { createAnimation } from '../../../animations/default-transitions.animations';

export interface DropdownListOptions{
  name: string,
  value?: any,
  isActive: boolean
}

@Component({
  selector: 'dropdown-selection',
  host: {
    class: 'dropdown'
  },
  styles: [`:host { position: relative; }`],
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown-selection.component.html',
  styleUrl: './dropdown-selection.component.scss',
  animations: [ createAnimation('slideDropdown', { duration: '200ms', animateY: true, transform: 'scale(.8) translateY(-10px)' }) ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DropdownSelectionComponent implements AfterViewInit{
  //inputs
  public label = input<string>('Dropdown Name');
  public labelAfterSelect = input<string>();
  public items = input.required<DropdownListOptions[]>();
  public dropdownId = input.required<string>();
  public disabled = input<boolean>(false);
  //output
  public clickedItem = output<DropdownListOptions>();
  //signals
  protected displayedLabel = signal(this.label())
  protected isExpanded = signal(false);
  //view child
  @ViewChild('DropdownButton') dropdown!: ElementRef;
  @ViewChild('DropdownMenu') dropdownMenu!: ElementRef;
  //variables
  private dropdownElement!: HTMLElement
  protected dropdownMenuId = computed(()=> `${this.dropdownId()}-menu`)
  
  constructor(private documentListener: DocumentListenerService, private el: ElementRef) {
    effect(()=> {
      const event = documentListener.event$();
      if(event instanceof MouseEvent ) {
        this.onClickOutside(event);
      }
    })
    effect(() => this.setLabelOnItemSelected())
  }

  ngAfterViewInit(): void {
    this.displayedLabel.set(this.label())
    this.dropdownElement = this.dropdown.nativeElement; // set the dropdown native element after view init
  }

  toggleDropDown(){
    this.isExpanded() ? this.closeDropDown() : this.openDropDown();
  }

  openDropDown(){
    if(this.disabled()) return;
    this.isExpanded.set(true);
    setTimeout(() => { // focus on the first item of the dropdown list
      const list = this.dropdownMenu.nativeElement as HTMLElement;
      const firstChild = list.querySelector('.dropdown__item') as HTMLElement;
      firstChild.focus();
    }, 100);
  }

  closeDropDown(){
    this.isExpanded.set(false);
    this.dropdownElement.focus();
  }

  onKeyDownItem(event: KeyboardEvent, item: DropdownListOptions) {
    if(event.key === 'Enter' || event.key === ' '){
      event.preventDefault(); // avoid spacebar to scroll the page
      this.onclickItem(item);
    }
  }

  onclickItem(item: DropdownListOptions){
    if(this.disabled()) return;
    this.clickedItem.emit(item); // when item clicked, parent will receive it and set the active item
    this.closeDropDown();
  }

  setLabelOnItemSelected(): void { // set the label of the dropdown when input signal items is updated // effect function
    const activeItem = this.items().find((item) => item.isActive);
    if(activeItem && this.labelAfterSelect()) {
      this.displayedLabel.set(this.labelAfterSelect()!);
    } else if(activeItem) {
      this.displayedLabel.set(activeItem.name);
    }
  }

  onClickOutside(event: MouseEvent){ // close dropdown when click outside the element
    if(this.isExpanded() == true){
      const element = event.target as HTMLElement;
      const clickInsideDropdown = this.el.nativeElement.contains(element);
      if(!clickInsideDropdown){
        this.closeDropDown();
      }
    }
  }

}
