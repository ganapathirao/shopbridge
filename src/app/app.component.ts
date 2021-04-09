import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  // Creating public variables
  title = 'shopbridge';
  showLoader = true;

  constructor(private appservice: AppService) {}

  ngOnInit() {
    // Subscribing to BehaviorSubject to hide/show the loader
    this.appservice.isShowLoader.subscribe((response) => {
      if (response) {
        this.showLoader = true;
      } else {
        // Intentionally adding timeout to show the loader
        setTimeout(() => {
          this.showLoader = false;
        }, 1000);
      }
    });
  }
}
