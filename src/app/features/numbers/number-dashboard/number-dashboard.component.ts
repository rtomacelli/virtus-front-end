import { Component, OnInit } from '@angular/core';
import { PhoneNumber } from '../../../model/phonenumber'
import { NumberService } from '../../../service/number/number.service';

@Component({
  selector: 'app-number-dashboard',
  templateUrl: './number-dashboard.component.html',
  styleUrls: [ './number-dashboard.component.css' ]
})
export class NumberDashboardComponent implements OnInit {
  numbers: PhoneNumber[] = [];

  constructor(private numberService: NumberService) { }

  ngOnInit(): void {
    this.getNumbers();
  }

  getNumbers(): void {
    this.numberService.getNumbers()
      .subscribe(numbers => this.numbers = numbers.slice(0, 10));
  }
}
