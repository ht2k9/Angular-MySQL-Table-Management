import { Component, OnDestroy, Input, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs';
import { DatabaseService } from '../../shared/database.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnChanges, OnDestroy {
  @Input('data') tableData : any;

  items = [];
  orders = [];
  products = [];
  options = [];
  extras = [];

  editMode = false;
  dataSubscriber = new Subscription();
  isCollapsed = true;
  showDetail = true;

  selectedItem : number;
  selectedOrder : number;
  errorMsg : string;

  constructor(private databaseSrv: DatabaseService) { }

  ngOnChanges() {
    if(this.tableData.route != ''){
      this.items = this.onGetData(this.tableData.route);
    }
    if(this.tableData.relations){
      for (let i = 0; i < this.tableData.relations.length; i++) {
        const relation = this.tableData.relations[i];
        this.options[i] = this.onGetData(relation.table); 
      }
      setTimeout(() => {
        for (let i = 0; i < this.items.length; i++) {
          for (let j = 0; j < this.tableData.relations.length; j++) {
            const relation = this.tableData.relations[j];

            for(let opt of this.options[j]){
              if(this.items[i][relation.key] == opt[relation.key]){
                this.items[i][relation.key] = opt.name;
              }
            }
          }
        }
      }, 2000);
    }

    if(this.tableData.extras){
      this.products = this.onGetData('products');
      this.extras = this.tableData.extras.relations;
    }
    
    this.isCollapsed = true;
    this.showDetail = true;
    this.orders = this.onGetData('orders');
  }

  onGetData(route: String){
    let newData = [];
    this.dataSubscriber.add(this.databaseSrv.getData(route).subscribe(
      (data) => {
        data.forEach(item => {
          newData.push(item);   
        });
      }
    ));
    return newData;
  }

  onSubmit(form: NgForm){
    let isValid = true;
    const values = form.value;

    if(this.tableData.relations){
      this.tableData.relations.forEach(element => {
        if(values[element.key] == "" || values[element.key] == null){
          this.errorMsg = 'Select from dropdown';
          isValid = false;
        }
      });
    }

    if(!isValid)
      return;
    
    if(this.tableData.route == 'costumers'){
      let date  = new Date();
      let today = date.getFullYear() + '-' + date.getMonth() + '-' +date.getDate();
      values.date_added = today;
    }
    
    if(!this.editMode){
      this.dataSubscriber.add(this.databaseSrv.postData(values, this.tableData.route).subscribe(
        (data) => {
          this.items.push(data);
        }
      ));
    } else {
      this.dataSubscriber.add(this.databaseSrv.updateData(this.tableData.route, this.items[this.selectedItem][this.tableData.primaryKey], values).subscribe(
        (data) => {
            console.log(data);
            this.items[this.selectedItem] = values;
          }
        ));
      }
      
      form.resetForm();
      this.editMode = false;
      this.isCollapsed = true;
    }
  
  onEdit(index: number, form: NgForm){
    this.isCollapsed = false;
    this.editMode = true;
    this.selectedItem = index;

    form.setValue(this.items[index]);
  }

  onDelete(id: number, index: number){
    this.dataSubscriber.add(this.databaseSrv.deleteData(this.tableData.route, id).subscribe(
      (data) => {
        this.items.splice(index, 1);
      }
    ));
  }

  onShowOrders(id: number){
    this.orders.forEach( order => {
      if(order[this.tableData.primaryKey] == id){
        console.log(order);
      }
    });
  }

  onComplete(form: NgForm){
    let oldValues = form.value;
    let newValues = [];

    for (let i=1 ; i < this.extras.length; i++) {
      if(oldValues['prodct'+i] != '' || oldValues['prodct'+i] != undefined){
        newValues.push({
            order_id: oldValues['order_id'],
            product_id: oldValues['prodct'+i],
            quantity: oldValues['quantity'+i],
            sold_for: oldValues['sold_for']
          });
      }
    }

    this.dataSubscriber.add(this.databaseSrv.postData(newValues, 'orderDetails').subscribe((data) => {
        // console.log(data);
          this.dataSubscriber.add(this.databaseSrv.updateData('orders', this.selectedOrder, {'completed': true}).subscribe((newdata) => {
            console.log(newdata);
          })
        );
    }));

    form.resetForm();
    this.showDetail = true;
  }
  
  onAddProduct() {
    this.extras.push({
        key: 'product_id',
        table: 'products',
        placeholder: 'select product'
      });
  }
  
  ngOnDestroy(){
    this.dataSubscriber.unsubscribe();
  }

  onShowDetails(pKey: number){
    this.showDetail = true;
    this.selectedOrder = pKey;
  }
}