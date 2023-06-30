import { Component, OnInit } from '@angular/core';
declare var ClipboardJS:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'VRoom';

  // route: any;

  ngOnInit(){
    new ClipboardJS('#btnCopy');
  }
  constructor(){}


}
