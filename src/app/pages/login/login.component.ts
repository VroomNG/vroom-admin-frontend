import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { loginInfo } from '../../model/loginInfo';
import { first } from 'rxjs/operators';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

// @NgModule({
//   CUSTOM_ELEMENTS_SCHEMA
// })
export class LoginComponent implements OnInit, OnDestroy {
  faCoffee = faCoffee;
  loginForm!: FormGroup;
  loginDetails: loginInfo;
  isFormReady = false;
  submitted = false;
  isUserNameCount = false;
  errorMessages: any;
  returnUrl!: string;
  error = '';
  emailValid: boolean = false;
  token: any;

  status!: string;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private location: LocationStrategy,
  ) {
    this.loginDetails = new loginInfo();
  }

  ngOnInit() {
    debugger;
    localStorage.setItem('enableSignIn', '1');
    this.createForm();
  }
  ngOnDestroy() {
  }
  get f() { return this.loginForm.controls; }

  createForm() {
    this.isFormReady = true;
    this.loginForm = this.formBuilder.group({
      // email: [this.loginDetails.email],
      // password: [this.loginDetails.password],
      email: [this.loginDetails.email, [Validators.required, Validators.email]],
      password: [this.loginDetails.password, Validators.required],
      isRemberMeChecked: [this.loginDetails.isRemberMeChecked]
    });
  }
  onSubmit() {
    debugger;
    var email = (<HTMLInputElement>document.getElementById("email"));
    var password = (<HTMLInputElement>document.getElementById("password"));
    this.submitted = true;
    this.errorMessages = "";
    // this.createForm();
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    if ((this.loginForm.value.email == "" || this.loginForm.value.email == null) && (this.loginForm.value.password == "" || this.loginForm.value.password == null))
      return;
    const inputRequest = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }

    // token
    debugger;
    this.loginService.AuthorizeUser(inputRequest).pipe(first()).subscribe((result: any) => {
      // this.status = result.toString();
      debugger;
      console.log("login", result)
      if (result) {
        if (result.code == 200) {
          if (this.loginForm.value.isRemberMeChecked) {
            localStorage.setItem('email', this.loginForm.value.email);
            localStorage.setItem('password', this.loginForm.value.password);
          }
          else {
            sessionStorage.setItem('email', this.loginForm.value.email);
            sessionStorage.setItem('password', this.loginForm.value.password);
            localStorage.setItem('email', '');
            localStorage.setItem('password', '');
          }
          // this.toastr.success('Login Successfully');
          localStorage.setItem('email_id', result.data.email);
          localStorage.setItem('userId', result.data.id);
          localStorage.setItem('firstname', result.data.firstname);
          localStorage.setItem('lastname', result.data.lastname);
          localStorage.setItem('token', result.data.token);
          localStorage.setItem('access_token', result.data.access_token);
          localStorage.setItem('profile_url', result.data.profile_url);
          localStorage.setItem('user_type', result.data.user_type);          
          localStorage.setItem('enableSignIn', '0');
          this.loginService.addInteraction(this.loginForm.value.email,"Log In ").subscribe((result:any) => {});
          this.router.navigate(['/dashboard']);
          // location
        }
        else if (result.code == 100) {
          this.emailValid = true;
          setTimeout(() => {                           //<<<---using ()=> syntax
            this.emailValid = false;
          }, 5000);
        }
        else
          this.loginForm.reset();
      } else {
        // this.toastr.error('UserName and Password is Invalid');
        this.loginForm.reset();
      }
    }, (err) => {
      // this.error = err;
      console.log("ERR Value =>", err);
      console.log("ERR Value o=>", err.status);
      if (err.status == 0)
        console.log("ERR Value ins=>", err.status);
      this.loginForm.value.email = null;
      this.loginForm.value.password = null;
      email.value = "";
      password.value = "";
      this.errorMessages = "Please enter a valid Email and Password";
      console.log("errorMessages ==>", this.errorMessages)
      // this.toastr.error('UserName and Password is Invalid');
      // this.loading = false;
      // this.toastr.error('UserName and Password is Invalid');
      // this.loginForm.reset();
    });
  }

  IsRembermeAccept() {
    debugger;
    const rmCheck = (<HTMLInputElement>document.getElementById("rememberMe")),
      emailInput = (<HTMLInputElement>document.getElementById("email")),
      password = (<HTMLInputElement>document.getElementById("password"));

    if (localStorage['email'] && localStorage['email'] !== "") {
      rmCheck.setAttribute("checked", "checked");
      emailInput.value = localStorage['email'];
      password.value = localStorage['password'];
      this.loginDetails.email = localStorage['email'];
      this.loginDetails.password = localStorage['password'];
      this.loginDetails.isRemberMeChecked = true;
    } else {
      rmCheck.removeAttribute("checked");
      emailInput.value = "";
    }
  }

}
