export let Supplier = {
  title: 'Suppliers',
  route: 'suppliers',
  primaryKey: "supplier_id",
  formTemplate: [
    {
      title: 'supplier_id',
      type: 'hidden',     
    },
    {
      title: 'name',
      type: 'text',
      placeholder: 'full name'    
    },
    {
      title: 'phone',
      type: 'number',
      placeholder: 'contact phone'
    },
    {
      title: 'email',
      type: 'email',
      placeholder: 'email' 
    },
    {
      title: 'address',
      type: 'text',
      placeholder: 'address' 
    },
    {
      title: 'fax',
      type: 'number',
      placeholder: 'fax' 
    }
  ]
};
