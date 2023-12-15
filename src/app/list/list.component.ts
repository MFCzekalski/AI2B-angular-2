import { Component } from '@angular/core';
import {Person} from "../person";
import {PersonLsService} from "../person-ls.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  people: Person[] = [];

  constructor(private personLsService: PersonLsService) {}

  ngOnInit() {
    this.people = this.personLsService.getAll();
  }

  delete(index: number){
    if(confirm("Are you sure?")){
      this.personLsService.deletePerson(index);
      this.people = this.personLsService.getAll();
    }
  }
}