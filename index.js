const express = require('express');
const app = express();
const orderRoutes = require("./routes/orderRoutes");

app.use(express.json());

app.use('/orders', orderRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});