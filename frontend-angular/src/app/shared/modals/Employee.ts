export let Employee = {
  title: 'Employees',
  route: 'employees',
  primaryKey: 'employee_id',
  formTemplate: [
    {
      title: 'employee_id',
      type: 'hidden',     
    },
    {
      title: 'name',
      type: 'text',
      placeholder: 'full name'    
    },
    {
      title: 'number',
      type: 'number',
      placeholder: 'contact number' 
    },
    {
      title: 'email',
      type: 'email',
      placeholder: 'email' 
    },
    {
      title: 'title',
      type: 'text',
      placeholder: 'position / title' 
    }
  ]
}
