import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'mdb-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']

})

export class AppComponent implements OnInit {
  food$: Observable<any[]>;
  table$: Observable<any[]>;
  order$: Observable<any[]>;

  constructor(private db: AngularFireDatabase) { }
  ngOnInit() {
    this.food$ = this.getFood('food');
    this.table$ = this.getTable('table');
    this.order$ = this.getOrder('order');
  }

  /**
  * begin select
  */

  // food
  getFood(listPath): Observable<any[]> {
    console.log(this.db.list(listPath).valueChanges());
    return this.db.list(listPath).valueChanges();
  }

  // table
  getTable(listPath): Observable<any[]> {
    return this.db.list(listPath).valueChanges();
  }

  // order
  getOrder(listPath): Observable<any[]> {
    return this.db.list(listPath).valueChanges();
  }

  /**
   * end select
   */


  /**
   * begin  insert
   */

  // food 
  addFood(name, price) {
    const newPushId = this.db.createPushId();
    const data = {
      "id": newPushId,
      "name": name,
      "price": price
    };
    console.log(data);
    this.db.object('food/' + newPushId).update(data);
  }

  // table 
  addTable(name) {
    const newPushId = this.db.createPushId();
    const data = {
      "id": newPushId,
      "name": name,
    };
    this.db.object('table/' + newPushId).update(data);
  }

  // order 
  addOrder(idFood, idTable, status, quantity) {
    const newPushId = this.db.createPushId();
    const data = {
      "id": newPushId,
      "idFood": idFood,
      "idTable": idTable,
      "status": status,
      "quantity": quantity,
    };
    this.db.object('order/' + newPushId).update(data);
  }

  /**
   * end  insert
   */

  /**
   * begin update
   */

  // food
  updateFood(id, name, price) {
    const data = {
      "id": id,
      "name": name,
      "price": price
    };
    this.db.object('food/').update(data);
  }

  // table 
  updateTable(id, name) {
    const data = {
      "id": id,
      "name": name,
    };
    this.db.object('table/').update(data);
  }

  // order 
  updateOrder(id, idFood, idTable, status, quantity) {
    const data = {
      "id": id,
      "idFood": idFood,
      "idTable": idTable,
      "status": status,
      "quantity": quantity,
    };
    this.db.object('table/').update(data);
  }

  /**
   * end update
   */


  /**
   * begin delete
   */

  // food
  deleteFood(id) {
    this.db.object('food/' + id).remove();
  }


  // table
  deleteTable(id) {
    this.db.object('table/' + id).remove();
  }


  // order
  deleteOrder(id) {
    this.db.object('order/' + id).remove();
  }

  /**
   * end delete
   */
}
