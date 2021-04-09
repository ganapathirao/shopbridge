import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'shopbridge';
  showLoader:boolean = true
constructor(private appservice: AppService){}
ngOnInit(){
  this.appservice.isShowLoader.subscribe((res) => {
    if(res) {
      this.showLoader = true;
    } else {
      setTimeout(() => {
        this.showLoader = false;
      },1000)
    }
  })
}
}
