import { FormControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Injectable, Component, OnInit } from "@angular/core";
import { OfficeService } from "src/app/service/office.service";
import { User, UserService } from "src/app/service/user.service";
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LinkOfficeUserComponent } from "../link-office-user/link-office-user.component";
import { of, tap, Observable, startWith, debounceTime, distinctUntilChanged, switchMap, map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class Service {
  constructor(private http: HttpClient) { }

  opts = [];

  getData() {
    return this.opts.length ?
      of(this.opts) :
      this.http.get<any>('http://localhost:3000/usuarios').pipe(tap(data => this.opts = data))
  }
}

export interface DialogData {
  id?:number;
  nome?: string;
  abreviatura?: string;
  descricao?: string;
  chefe_id?: number;
  usuarios?:User[]; 
}

@Component({
  selector: 'app-edit-office',
  templateUrl: './edit-office.component.html',
  styleUrls: ['./edit-office.component.css']
})

export class EditOfficeComponent implements OnInit {

  id = this.actRoute.snapshot.params['id'];
  options = [];
  Usuarios: any = [];
  officeFormObj: any = {};
  myControl = new FormControl();
  filteredOptions: Observable<any[]>;

  constructor(
    public officeService: OfficeService,
    public actRoute: ActivatedRoute,
    public userService: UserService,
    private service: Service,
    public dialog: MatDialog,
    public router: Router
  ) {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
            return this.filter(val || '')
       }) 
    )
  }

  ngOnInit() {
    this.officeService.getSingleOffice(this.id).subscribe((res: {}) => {
      this.officeFormObj = res;
    });

    this.userService.getUsers().subscribe((usuarios: {}) => {
      this.Usuarios = usuarios;
    });
  }

  filter(val: string): Observable<any[]> {
    // call the service which makes the http-request
    return this.service.getData()
     .pipe(
       map(response => response.filter(option => { 
         return option.nome.toLowerCase().indexOf(val.toLowerCase()) === 0
       }))
     )
   }

   openDialog() {
    const dialogRef = this.dialog.open(LinkOfficeUserComponent, {
      width:  '50%',
      height: '400px',
      data:  this.officeFormObj
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  updateOffice(id: any, data: any) {
    if (window.confirm('Confirma a atualização dos dados?')) {
      this.officeService.updateOffice(this.id, data).subscribe((res) => {
        this.router.navigate(['/list']);
      });
    }
  }

}
