import { Component, OnInit } from '@angular/core'
import { PhoneNumber } from 'src/app/model/phonenumber';
import { NumberService } from 'src/app/service/number/number.service';
import { MessageService } from 'src/app/service/message/message.service';

@Component({
  selector: 'app-number-list',
  templateUrl: './number-list.component.html',
  styleUrls: ['./number-list.component.css']
})
export class NumberListComponent implements OnInit {
  numbers: PhoneNumber[] = [];
  selectedNumber?:PhoneNumber;
  constructor(private numberService: NumberService, private messageService: MessageService) {}
  getNumbers(): void {
    this.numberService.getNumbers().subscribe(numbers=>this.numbers = numbers);
  }
  ngOnInit(): void {
    this.getNumbers();
  }
  onSelect(number:PhoneNumber): void{
    this.selectedNumber = number;
    this.messageService.add(`NumbersComponent: Selected number id=${number.id}`);
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.numberService.addNumber({ name } as PhoneNumber)
      .subscribe(number => {
        this.numbers.push(number);
      });
  }
  delete(number: PhoneNumber): void {
    this.numbers = this.numbers.filter(h => h !== number);
    this.numberService.deleteNumber(number.id).subscribe();
    
  }
}
