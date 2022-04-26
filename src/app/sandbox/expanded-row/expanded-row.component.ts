import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component} from '@angular/core';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: string;
  phone: string;
  website: string;
  company: string;
  expanded: boolean;
}

const ELEMENT_DATA: User[] = [
  {
    "id": 123,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": "Kulas Light Apt. 556 Gwenborough",
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": "Romaguera-Crona",
    "expanded": false
  },
  {
    "id": 52,
    "name": "Ervin Howell",
    "username": "Antonette",
    "email": "Shanna@melissa.tv",
    "address": "Victor Plains Suite 879 Wisokyburgh",
    "phone": "010-692-6593 x09125",
    "website": "anastasia.net",
    "company": "Deckow-Crist",
    "expanded": false
  },
  {
    "id": 62,
    "name": "Clementine Bauch",
    "username": "Samantha",
    "email": "Nathan@yesenia.net",
    "address": "Douglas Extension Suite 847 McKenziehaven",
    "phone": "1-463-123-4447",
    "website": "ramiro.info",
    "company": "Romaguera-Jacobson",
    "expanded": false
  },
  {
    "id": 65,
    "name": "Patricia Lebsack",
    "username": "Karianne",
    "email": "Julianne.OConner@kory.org",
    "address": "Hoeger Mall Apt. 692 South Elvis",
    "phone": "493-170-9623 x156",
    "website": "kale.biz",
    "company": "Robel-Corkery",
    "expanded": false
  },
  {
    "id": 84,
    "name": "Chelsey Dietrich",
    "username": "Kamren",
    "email": "Lucio_Hettinger@annie.ca",
    "address": "Skiles Walks Suite 351 Roscoeview",
    "phone": "(254)954-1289",
    "website": "demarco.info",
    "company": "Keebler LLC",
    "expanded": false
  }
];

@Component({
  selector: 'app-expanded-row',
  templateUrl: './expanded-row.component.html',
  styleUrls: ['./expanded-row.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ExpandedRowComponent {
  title = 'angular-mat-table-example';

  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['id', 'name', 'username', 'email', 'address'];

  toggleRow(element: { expanded: boolean; }) {
    // Uncommnet to open only single row at once
    // ELEMENT_DATA.forEach(row => {
    //   row.expanded = false;
    // })
    element.expanded = !element.expanded
  }

  manageAllRows(flag: boolean) {
    ELEMENT_DATA.forEach(row => {
      row.expanded = flag;
    })
  }
}