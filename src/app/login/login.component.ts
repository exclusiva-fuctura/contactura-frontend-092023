import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  formulario!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(){
     this.init();
  }

  private init(){
    this.formulario = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onEntrar() {
    this.router.navigate(['inicial']);
  }
}
