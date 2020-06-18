const express = require('express');

const app = express();


app.get('/', (req, res) => {
    res.send('Hello');
});


// Define the port and listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));