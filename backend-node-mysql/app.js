const functions = require('firebase-functions'),
      admin = require('firebase-admin'),
      express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors');

admin.initializeApp(functions.config().firebase);

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let route = require('./routes/route');

// TODO: table details
app.use('/route', route('table', 'primary_key'));

// app.use('/products', route('products', 'product_id'));
// app.use('/suppliers', route('suppliers', 'supplier_id'));
// app.use('/costumers', route('costumers', 'costumer_id'));
// app.use('/employees', route('employees', 'employee_id'));
// app.use('/orders', route('orders', 'order_id'));
// app.use('/orderDetails', route('order_details', 'order_id'));

app.get('/', (req, res) => {
    res.send('Hello to Photo Factory Backend');
});

exports.app = functions.https.onRequest(app);