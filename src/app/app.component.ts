import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
declare var ClipboardJS:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'VRoom';
  faCoffee = faCoffee ;

  // route: any;

  ngOnInit(){
    new ClipboardJS('#btnCopy');
  }
  constructor(){}


}
