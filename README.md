# Angular-SQL-Table-Management
Database management in Angular 7 using Node and MySQL, Search/Insert/Update/Delete.

## Getting Started
* Install all the neccesary node modules in the backend and also in the frontend. (npm install)
* Import the project to Angular using Github.
* Enter the credentials of MySQL database in `backend/config/database.js`.
* Configure the routing.
** IMPORTANT: search for TODO in files.

### Prerequisites
- [MySQL credentials](https://www.mysql.com/)
- Node npm, Angular 7.

### Installing & Coding
##### 1) Back-end Routing:
To set the routing for different tables, no need to repeat the same code, this route has post/get/delete/put.
Simply pass the table name and the primary key.

`app.use('/route', route('table', 'primary_key'));`

- /route
   - /get: returns all the data in the table
   - /post: inserts a new data.
   - /:id
     - /delete: removes the row with the provided id.
     - /put: updates the row.
     
#### 2) MySQL Details:

`connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database : 'mydatabase' 
});`

## Deployment:
Add the hosting path and http options: `frontend/components/shared/database.servece.ts`

## License
Free for all.
