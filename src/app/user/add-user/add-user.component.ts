import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../../service/user.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {

//  INSERT INTO `virtus`.`user` (`id`, `author_id`, `criado_em`, `email`, `mobile`, `name`, `password`, `role_id`, `username`) VALUES ('1', '3', '2022-03-16 21:10:15.048000', 'gilberto@gmail.com.br', '+5561999999999', 'Gilberto Gil', '12345678', '5', 'gilberto_gil');
//  INSERT INTO `virtus`.`user` (`id`, `author_id`, `criado_em`, `email`, `mobile`, `name`, `password`, `role_id`, `username`) VALUES ('2', '3', '2022-03-16 21:10:15.048000', 'caetanoveloso@gmail.com.br', '+5561999999999', 'Caetano Veloso', '12345678', '5', 'caetano_veloso');
//  INSERT INTO `virtus`.`user` (`id`, `author_id`, `criado_em`, `email`, `mobile`, `name`, `password`, `role_id`, `username`) VALUES ('3', '3', '2022-03-16 21:10:15.048000', 'chicobuarque@gmail.com.br', '+5561999999999', 'Chico Buarque', '12345678', '5', 'chico_buarque');
//  INSERT INTO `virtus`.`user` (`id`, `author_id`, `criado_em`, `email`, `mobile`, `name`, `password`, `role_id`, `username`) VALUES ('4', '3', '2022-03-16 21:10:15.048000', 'jorgebenjor@gmail.com.br', '+5561999999999', 'Jorge Ben Jor', '12345678', '5', 'jorge_ben_jor');
//  INSERT INTO `virtus`.`user` (`id`, `author_id`, `criado_em`, `email`, `mobile`, `name`, `password`, `role_id`, `username`) VALUES ('5', '3', '2022-03-16 21:10:15.048000', 'tomjobim@gmail.com.br', '+5561999999999', 'Tom Jobim', '12345678', '5', 'tom_jobim');
//  INSERT INTO `virtus`.`user` (`id`, `author_id`, `criado_em`, `email`, `mobile`, `name`, `password`, `role_id`, `username`) VALUES ('6', '3', '2022-03-16 21:10:15.048000', 'miltonnascimento@gmail.com.br', '+5561999999999', 'Milton Nascimento', '12345678', '5', 'milton_nascimento');
//  INSERT INTO `virtus`.`user` (`id`, `author_id`, `criado_em`, `email`, `mobile`, `name`, `password`, `role_id`, `username`) VALUES ('7', '3', '2022-03-16 21:10:15.048000', 'elisregina@gmail.com.br', '+5561999999999', 'Elis Regina', '12345678', '5', 'elis_regina');
//  INSERT INTO `virtus`.`user` (`id`, `author_id`, `criado_em`, `email`, `mobile`, `name`, `password`, `role_id`, `username`) VALUES ('8', '3', '2022-03-16 21:10:15.048000', 'joaogilberto@gmail.com.br', '+5561999999999', 'João Gilberto', '12345678', '5', 'joao_gilberto');
//  INSERT INTO `virtus`.`user` (`id`, `author_id`, `criado_em`, `email`, `mobile`, `name`, `password`, `role_id`, `username`) VALUES ('9', '3', '2022-03-16 21:10:15.048000', 'toquinho@gmail.com.br', '+5561999999999', 'Toquinho', '12345678', '5', 'toquinho');
//  INSERT INTO `virtus`.`user` (`id`, `author_id`, `criado_em`, `email`, `mobile`, `name`, `password`, `role_id`, `username`) VALUES ('10', '3', '2022-03-16 21:10:15.048000', 'viniciusmoraes@gmail.com.br', '+5561999999999', 'Vinícius de Moraes', '12345678', '5', 'vinícius_de_moraes');
//  INSERT INTO `virtus`.`user` (`id`, `author_id`, `criado_em`, `email`, `mobile`, `name`, `password`, `role_id`, `username`) VALUES ('11', '3', '2022-03-16 21:10:15.048000', 'robertocarlos@gmail.com.br', '+5561999999999', 'Roberto Carlos', '12345678', '5', 'roberto_carlos');
//  INSERT INTO `virtus`.`user` (`id`, `author_id`, `criado_em`, `email`, `mobile`, `name`, `password`, `role_id`, `username`) VALUES ('12', '3', '2022-03-16 21:10:15.048000', 'naraleao@gmail.com.br', '+5561999999999', 'Nara Leão', '12345678', '5', 'nara_leao');
//  INSERT INTO `virtus`.`user` (`id`, `author_id`, `criado_em`, `email`, `mobile`, `name`, `password`, `role_id`, `username`) VALUES ('13', '3', '2022-03-16 21:10:15.048000', 'djavan@gmail.com.br', '+5561999999999', 'Djavan', '12345678', '5', 'djavan');
//  INSERT INTO `virtus`.`user` (`id`, `author_id`, `criado_em`, `email`, `mobile`, `name`, `password`, `role_id`, `username`) VALUES ('14', '3', '2022-03-16 21:10:15.048000', 'taiguara@gmail.com.br', '+5561999999999', 'Taiguara', '12345678', '5', 'taiguara');
//  INSERT INTO `virtus`.`user` (`id`, `author_id`, `criado_em`, `email`, `mobile`, `name`, `password`, `role_id`, `username`) VALUES ('15', '3', '2022-03-16 21:10:15.048000', 'zeramalho@gmail.com.br', '+5561999999999', 'Zé Ramalho', '12345678', '5', 'ze_ramalho');

  @Input() userObj = { username: '', password: '', email: '', mobile: '', name: '', role_id: 0, author_id: 0, criado_em: ''}

  constructor(
    public userService: UserService, 
    public router: Router
  ) { }

  ngOnInit(): void { }
  
  addUser(data: any) {
    this.userObj.criado_em = new Date().toISOString();
    this.userService.addUser(this.userObj).subscribe((data: {}) => {
      this.router.navigate(['/user/list'])
    })
  }

}