import { Component } from '@angular/core';
import { Costumer } from './shared/modals/Costumer';
import { Employee } from './shared/modals/Employee';
import { Order } from './shared/modals/Order';
import { OrderDetail } from './shared/modals/OrderDetail';
import { Product } from './shared/modals/Product';
import { Supplier } from './shared/modals/Supplier';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: any; 

  canLoad = false;
  tables = [Costumer, Employee, Order, OrderDetail, Product, Supplier];

  onSidebarClick(tableName: string){
    if(tableName == 'dashboard'){
      this.canLoad = false;
    } else {
      this.tables.forEach(table => {
        if(tableName == table.route){
          this.data = table;
        }
        this.canLoad = true;
      });
    }
  }
}
