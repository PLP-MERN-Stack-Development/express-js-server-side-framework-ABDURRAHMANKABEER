express = require("express");
dotenv = require("dotenv");
dotenv.config();

app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

app.get('/', (req, res)=> {
    res.send("Hello World");
});