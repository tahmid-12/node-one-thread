const db = require("../database/db");

exports.getAllOrders = (req, res) => {
    const query = 'SELECT * FROM orders';
    db.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching orders: ', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json(results);
    });
  };
  
  exports.getOrderById = (req, res) => {
    const orderId = req.params.id;
    const query = 'SELECT * FROM orders WHERE id = ?';
    db.query(query, [orderId], (error, results) => {
      if (error) {
        console.error('Error fetching order: ', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.json(results[0]);
    });
  };
  
  exports.createOrder = (req, res) => {
    const { user_id, product_id, quantities, payment_info } = req.body;
    const query = 'INSERT INTO orders (user_id, product_id, quantities, payment_info) VALUES (?, ?, ?, ?)';
    db.query(query, [user_id, product_id, quantities, payment_info], (error, results) => {
      if (error) {
        console.error('Error creating order: ', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(201).json({ id: results.insertId, user_id, product_id, quantities, payment_info });
    });
  };
  
  exports.updateOrder = (req, res) => {
    const orderId = req.params.id;
    const { user_id, product_id, quantities, payment_info } = req.body;
    const query = 'UPDATE orders SET user_id = ?, product_id = ?, quantities = ?, payment_info = ? WHERE id = ?';
    db.query(query, [user_id, product_id, quantities, payment_info, orderId], (error, results) => {
      if (error) {
        console.error('Error updating order: ', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.json({ id: orderId, user_id, product_id, quantities, payment_info });
    });
  };
  
  exports.deleteOrder = (req, res) => {
    const orderId = req.params.id;
    const query = 'DELETE FROM orders WHERE id = ?';
    db.query(query, [orderId], (error, results) => {
      if (error) {
        console.error('Error deleting order: ', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.json({ message: 'Order deleted successfully' });
    });
  };