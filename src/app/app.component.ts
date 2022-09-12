import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
 

  config: any;
  fullpage_api: any;
  categoryID: number = 1;
  projectID: number = 1;


  constructor(private activeRoute: ActivatedRoute) {

    

    // for more details on config options please visit fullPage.js docs
    this.config = {

      // fullpage options
      licenseKey: 'C5D4A884-5388430F-8802800E-1D5C7FF9',
      anchors: ['menu', 'projekty', 'detail'],
      menu: '#navigation',

      

      // fullpage callbacks
      afterResize: () => {
        console.log("After resize");
      },
      afterLoad: (origin: { index: any; }, destination: any, direction: any) => {
        console.log(origin.index);
        
      }
    };
  }


  getRef(fullPageRef: any) {
    this.fullpage_api = fullPageRef;
  }
  
  ngAfterViewInit() {
      console.log('rebuild');
  }

  ngOnInit() {
    // this.fullpage_api.setAllowScrolling(false);
  }

  changeCategory(categoryOutput: number) {
    this.categoryID = categoryOutput;
    this.fullpage_api.build();
    this.fullpage_api.setAllowScrolling(true);
    this.fullpage_api.moveTo('projekty');
  }

  changeProject(projectOutput: number) {
    this.projectID = projectOutput;
    this.fullpage_api.build();
    this.fullpage_api.moveTo('detail');
  }
}
