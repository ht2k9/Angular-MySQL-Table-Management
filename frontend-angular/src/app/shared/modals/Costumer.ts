export let Costumer = {
     title: 'Costumers',
     route: 'costumers',
     primaryKey: "costumer_id",
     formTemplate: [
        {
            title: 'costumer_id',
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
            title: 'address',
            type: 'text',
            placeholder: 'address'
        },
        {
            title: 'status',
            type: 'number',
            placeholder: 'status'
        },
        {
            title: 'date_added',
            type: 'hidden',
        }
    ]
};

