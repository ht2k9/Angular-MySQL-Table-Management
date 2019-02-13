const express = require('express'),
      con     = require('../config/database');

module.exports = function(tableName, field){
    const router  =  express.Router();
    
    router.get('/', (req, res) => {
        const sqlQuery = "SELECT * FROM " + tableName;

        con.query(sqlQuery, (err, queryRes)=> {
            if(err) throw err;
            res.send(queryRes);
        });
    });

    router.post('/', (req, res) => {
        let values = req.body;
        const sqlQuery = "INSERT INTO " + tableName + " SET ?";

        con.query(sqlQuery, values, (err, queryRes) => {
            if(err) throw err;
            values[field] = queryRes.insertId;
            res.send(values);
        });
    });

    router.delete('/:id', (req, res) => {
        const sqlQuery = "DELETE FROM " + tableName + " WHERE " + field + " = ?";
        
        con.query(sqlQuery, req.params.id, (err, queryRes)=> {
            if(err) throw err;
            res.send(queryRes);
        });
    });

    router.put('/:id', (req, res) => {
        const sqlQuery = "UPDATE " + tableName + " SET ? WHERE " + field + " = ?";
        
        con.query(sqlQuery, [req.body, req.params.id], (err, queryRes)=> {
            if(err) throw err;
            res.send(queryRes);
        });
    });

    return router;
}