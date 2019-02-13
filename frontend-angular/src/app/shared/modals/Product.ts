export let Product = {
  title: 'Products',
  route: 'products',
  primaryKey: "product_id",
  relations: [
    {
      key: 'supplier_id',
      table: 'suppliers',
      placeholder: 'supplied from'
    }
  ],
  formTemplate: [
    {
      title: 'product_id',
      type: 'hidden',     
    },
    {
      title: 'supplier_id',
      type: 'hidden',     
    },
    {
      title: 'description',
      type: 'text',
      placeholder: 'product details'    
    },
    {
      title: 'quantity',
      type: 'number',
      placeholder: 'units in storage' 
    },
    {
      title: 'cost',
      type: 'number',
      placeholder: 'price per unit' 
    }
  ]
};