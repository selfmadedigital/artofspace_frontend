import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import SwiperCore, { Virtual, SwiperOptions, Swiper } from 'swiper';


import { Apollo, QueryRef } from "apollo-angular";
import gql from "graphql-tag";
// import CATEGORIES_QUERY from "../apollo/queries/category/categories";
import { Subscription } from "rxjs";
import { ActivatedRoute } from '@angular/router';
import PROJECTS_QUERY from '../apollo/queries/project/projects';

SwiperCore.use([Virtual]);

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})


export class ProjectsComponent implements OnInit {
  @Input()
  categoryInput!: number;

  @Output() projectOutput: EventEmitter<number> = new EventEmitter();
  
  config: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };
  onSwiper(swiper: Swiper) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }
  
  data: any = {};
  loading = true;
  errors: any;

  queryProjects!: QueryRef<any, any>;
  private subscriptionQuery: Subscription = new Subscription;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.queryProjects = this.apollo
      .watchQuery({
        query: PROJECTS_QUERY,
        pollInterval: 500,
        variables: {
          id: this.categoryInput
        }
      });
      this.subscriptionQuery = this.queryProjects.valueChanges.subscribe(result => {
        this.data = result.data;
        this.loading = result.loading;
        this.errors = result.errors;
        console.log(result.errors);
      });

      
  }
  ngOnDestroy() {
    this.subscriptionQuery.unsubscribe();
  }

  loadDetail(id: number){
    this.projectOutput.emit(id);
  }

  ngOnChanges() {
    this.queryProjects = this.apollo
      .watchQuery({
        query: PROJECTS_QUERY,
        pollInterval: 500,
        variables: {
          id: this.categoryInput
        }
      });
      this.subscriptionQuery = this.queryProjects.valueChanges.subscribe(result => {
        this.data = result.data;
        this.loading = result.loading;
        this.errors = result.errors;
      });
  }

  refresh() {
    this.queryProjects.refetch();
  }

}


