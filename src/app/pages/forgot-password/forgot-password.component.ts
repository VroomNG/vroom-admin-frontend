import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { forgotPasswordInfo } from '../../model/forgotPassword';
// password must match
import { MustMatch } from "../../helpers/password.validator";
import { ForgotPasswordService } from '../../service/forgotPassword.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {

  PasswordForm: any;

  changePasswordForm!: FormGroup;
  submitted = false;
  isFormReady = false;
  forgotPasswordInfo: forgotPasswordInfo;

  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    private forgotPass: ForgotPasswordService,) {
    this.forgotPasswordInfo = new forgotPasswordInfo();
  }

  ngOnInit() {
    this.createPassword();
  }

  createPassword() {
    this.changePasswordForm = this.formBuilder.group(
      {
        password: [this.forgotPasswordInfo.password, [Validators.required, Validators.minLength(4)]],
        confirmPassword: [this.forgotPasswordInfo.confirmPassword, Validators.required],
      },
      {
        validator: MustMatch("password", "confirmPassword")
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.changePasswordForm.controls;
  }

  updatePassword() {
    debugger;
    this.submitted = true;
    // stop here if form is invalid
    if (this.changePasswordForm.invalid) {
      return;
    }
    console.log("right ==>", JSON.stringify(this.changePasswordForm.value)); 

      const inputParameter = {
        password: this.changePasswordForm.value.password,
        confirmPassword: this.changePasswordForm.value.confirmPassword,
      }
      console.log("The Forgot",localStorage.getItem("userId"));
      var userId = localStorage.getItem("userId");
      this.forgotPass.forgotPassword(inputParameter, userId).subscribe((data: any) => {
        debugger;
        if (data) {
          console.log(data, 'form data');
          this.route.navigate(['/login']);
        }
        else{
          console.log("error password or confirm password")
        }
      })


  }

}
