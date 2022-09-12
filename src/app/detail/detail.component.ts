import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
// import CATEGORIES_QUERY from "../apollo/queries/category/categories";
import { Subscription } from "rxjs";
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import PROJECT_BY_CATEGORY_QUERY from '../apollo/queries/project/project';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  @Input()
  projectInput!: number;

  data: any = {};
  loading = true;
  errors: any;
  fullpage_api: any;
  faAngleUp = faAngleUp;
  private queryProject: Subscription = new Subscription;

  constructor(private apollo: Apollo, private route: ActivatedRoute) {}

  ngOnInit() {
    this.queryProject = this.apollo
      .watchQuery({
        query: PROJECT_BY_CATEGORY_QUERY,
        variables: {
          id: this.projectInput
        }
      })
      .valueChanges.subscribe(result => {
        this.data = result.data;
        this.loading = result.loading;
        this.errors = result.errors;
        // this.api.build();
      });
    }
  ngOnDestroy() {
    this.queryProject.unsubscribe();
  }

  getRef(fullPageRef: any) {
    this.fullpage_api = fullPageRef;
  }


  ngOnChanges() {
    this.queryProject = this.apollo
    .watchQuery({
      query: PROJECT_BY_CATEGORY_QUERY,
      variables: {
        id: this.projectInput
      }
    })
    .valueChanges.subscribe(result => {
      this.data = result.data;
      this.loading = result.loading;
      this.errors = result.errors;
      // this.api.build();
    });
  }
}


