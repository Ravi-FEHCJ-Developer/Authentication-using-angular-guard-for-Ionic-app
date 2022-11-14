import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.page.html',
  styleUrls: ['./projects-list.page.scss'],
})
export class ProjectsListPage implements OnInit {

  search: any;
  constructor() { }

  ngOnInit() {
  }

  searchProject(event)
  {
    console.log(this.search);
  }
}
