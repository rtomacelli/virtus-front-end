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
  title = 'Virtus';

  events: string[] = [];
  opened!: boolean;
  showMenu_administracao = false;
  showMenu_Configuracao = false;
  showMenu_Coordenacao = false;
  showMenu_Avaliacao = false;
  
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
    if(feature === 'administracao'){
      this.showMenu_administracao = !this.showMenu_administracao;
    } else if(feature === 'configuracao'){
      this.showMenu_Configuracao = !this.showMenu_Configuracao;
    } else if(feature === 'coordenacao'){
      this.showMenu_Coordenacao = !this.showMenu_Coordenacao;
    } else if(feature === 'avaliacao'){
      this.showMenu_Avaliacao = !this.showMenu_Avaliacao;
    }
    setTimeout(() => this.navcontainer.updateContentMargins());
  }
}