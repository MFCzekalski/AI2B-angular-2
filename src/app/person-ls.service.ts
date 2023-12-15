import { Injectable } from '@angular/core';
import {Person} from "./person";

@Injectable({
  providedIn: 'root'
})
export class PersonLsService {
  readonly KEY = 'local-storage';
  constructor() { }

   public getAll(): Person[] {
    let people: Person[] = [];
    const data = localStorage.getItem(this.KEY);

    if (data) {
      people = JSON.parse(data) || [];
    }

    return people
  }
  
  public getPerson(index: number): Person {
    return this.getAll()[index];
  }
  
  public addPerson(person: Person): void {
    const people = this.getAll();
    people.push(person);
    localStorage.setItem(this.KEY, JSON.stringify(people));
  }
  
  public deletePerson(index: number): void {
    const people = this.getAll();
    people.splice(index, 1);
    localStorage.setItem(this.KEY, JSON.stringify(people));
  }
}
