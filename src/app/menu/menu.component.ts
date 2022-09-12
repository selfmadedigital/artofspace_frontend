import { Component, EventEmitter, OnInit, Output } from '@angular/core';


import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import CATEGORIES_QUERY from "../apollo/queries/category/categories";
import { Subscription } from "rxjs";
declare var $: any;


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Output() categoryOutput : EventEmitter<number> = new EventEmitter();

  data: any = {};
  loading = true;
  errors: any;

  private queryCategories: Subscription = new Subscription;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.queryCategories = this.apollo
      .watchQuery({
        query: CATEGORIES_QUERY
      })
      .valueChanges.subscribe(result => {
        this.data = result.data;
        this.loading = result.loading;
        this.errors = result.errors;
      });
  }
  ngOnDestroy() {
    this.queryCategories.unsubscribe();
  }

  loadProjects(id: number){
    this.categoryOutput.emit(id);
  }

  showMenu(){
      if(!$('#logo').hasClass('show-menu')){
           $('.logo-line.even').animate({
               'height':'1.8vw'
           },{ duration: 400, queue: false });
  
           $('.logo-line.odd.left-align').animate({
               'left':'-40vw'
           },{ duration: 400, queue: false });
  
           $('.logo-line.odd').animate({
               'margin-top':'0',
               'width':'60vw',
           },{ duration: 400, queue: false });
  
           $('.logo-line a').animate({
               'opacity':'1'
           },800);
  
           $('.logo-line span').animate({
               'opacity':'1'
           },800);
  
           $('#logo').addClass('show-menu');
       }
  }

}


