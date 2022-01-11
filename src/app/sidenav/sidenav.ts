import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatSidenavContainer } from '@angular/material/sidenav';

/** @title Responsive sidenav */
@Component({
  selector: 'sidenav',
  templateUrl: './sidenav.html',
  styleUrls: ['sidenav.css'],
})
export class Sidenav implements OnDestroy {
  
  mobileQuery: MediaQueryList;
  title = 'Zarbat Tester';

  events: string[] = [];
  opened!: boolean;
  showMenu_Context = false;
  showMenu_Number = false;
  showMenu_Power = false;
  showMenu_Environment = false;
  showMenu_Feature = false;
  showMenu_Parameter = false;
  showMenu_Scenario = false;
  showMenu_Step = false;
  showMenu_Test_Case = false;
  showMenu_Run = false;
  showMenu_User = false;
  showMenu_Schedule = false;
  
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  
  @ViewChild('navcontainer')
  navcontainer!: MatSidenavContainer;
  
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  
  toggleMenu(feature:string) {
    if(feature === 'environment'){
      this.showMenu_Environment = !this.showMenu_Environment;
    } else if(feature === 'context'){
      this.showMenu_Context = !this.showMenu_Context;
    } else if(feature === 'feature'){
      this.showMenu_Feature = !this.showMenu_Feature;
    } else if(feature === 'number'){
      this.showMenu_Number = !this.showMenu_Number;
    } else if(feature === 'parameter'){
      this.showMenu_Parameter = !this.showMenu_Parameter;
    } else if(feature === 'scenario'){
      this.showMenu_Scenario = !this.showMenu_Scenario;
    } else if(feature === 'step'){
      this.showMenu_Step = !this.showMenu_Step;
    } else if(feature === 'test-case'){
      this.showMenu_Test_Case = !this.showMenu_Test_Case;
    } else if(feature === 'run'){
      this.showMenu_Run = !this.showMenu_Run;
    } else if(feature === 'user'){
      this.showMenu_User = !this.showMenu_User;
    } else if(feature === 'schedule'){
      this.showMenu_Schedule = !this.showMenu_Schedule;
    } else {
      this.showMenu_Power = !this.showMenu_Power;
    }
    setTimeout(() => this.navcontainer.updateContentMargins());
  }
}