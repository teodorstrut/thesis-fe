import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScrollSharedService } from './shared-services/scroll-shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'thesis-fe';
  thresholdReached = false;
  constructor(private scrollSharedService: ScrollSharedService) {}

  ngOnInit() {}

  ngOnDestroy() {}

  getScrollPercent() {
    const h = document.documentElement;
    const b = document.body;
    const st = 'scrollTop';
    const sh = 'scrollHeight';
    const scrollPercent =
      ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
    if (scrollPercent >= 80 && !this.thresholdReached) {
      this.thresholdReached = true;
      this.scrollSharedService.sendScrollEvent();
    } else if (scrollPercent < 80 && this.thresholdReached) {
      this.thresholdReached = false;
    }
  }
}
