import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';
import { MessageItem } from '../../shared/models/messageItem';



@Component({
  selector: 'contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent implements OnInit {

  @Output() addMessage = new EventEmitter<MessageItem>();

  contactForm!: FormGroup;
  payLoad = '';


  constructor(private fb: FormBuilder) { }

  ngOnInit() {

     this.contactForm = this.fb.group({
       name: ['', [ Validators.required,
                    Validators.maxLength(50),
                    Validators.pattern('^[a-zA-Z ]*$')]],
       email: ['', [Validators.required, Validators.email]],
       message: ['']
     });

     this.contactForm.statusChanges.subscribe(status => {
      console.log('Form status:', status);
    });
  }



  onSubmit() {
    if (this.contactForm.valid) {
     this.addMessage.emit(new MessageItem(
      this.contactForm.get('name')?.value,
      this.contactForm.get('email')?.value,
      this.contactForm.get('message')?.value
    ));
    // Reset the form after successful submission
    this.contactForm.reset();
    }
    else{
     console.log('Form is invalid. Please check the fields.');
    }

  }
}
