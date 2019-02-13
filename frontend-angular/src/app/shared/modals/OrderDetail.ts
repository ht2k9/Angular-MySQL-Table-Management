export let OrderDetail = {
  title: 'Order Details',
  route: 'orderDetails',
  primaryKey: 'order_detail_id',
  relations: [
    {
      key: 'order_id',
      table: 'orders',
      placeholder: 'selected order',
      disabled: true
    },
    {
      key: 'product_id',
      table: 'products',
      placeholder: 'select product'
    }
  ],
  formTemplate: [
    {
      title: 'order_detail_id',
      type: 'hidden',     
    },
    {
      title: 'order_id',
      type: 'hidden',     
    },
    {
      title: 'product_id',
      type: 'hidden',     
    },
    {
      title: 'quantity',
      type: 'number'
    },
    {
      title: 'sold_for',
      type: 'number'
    }
  ]
};
