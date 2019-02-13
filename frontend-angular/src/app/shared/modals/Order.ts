import { OrderDetail } from "./OrderDetail";

export let Order = {
  title: 'Orders',
  route: 'orders',
  primaryKey: 'order_id',
  extras: OrderDetail,
  relations: [
    {
      key: 'costumer_id',
      table: 'costumers',
      placeholder: 'for the costumer'
    },
    {
      key: 'employee_id',
      table: 'employees',
      placeholder: 'from employee'
    }
  ],
  formTemplate: [
    {
      title: 'order_id',
      type: 'hidden'    
    },
    {
      title: 'costumer_id',
      type: 'hidden',     
    },
    {
      title: 'employee_id',
      type: 'hidden',     
    },
    {
      title: 'description',
      type: 'text',
      placeholder: 'short description'
    },
    {
      title: 'date_required',
      type: 'date',
      placeholder: 'date required'
    },
    {
      title: 'date_finished',
      type: 'date', 
      placeholder: 'date finished'
    },
    {
      title: 'completed',
      type: 'text', 
      placeholder: 'false'
    }
  ]
};