const Express = require("express");
const app = Express();
const publicRoute = require('./routes/publicRoute');
const privateRoute = require("./routes/privateRoutes");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const swagger = require("./swagger");

app.use(cors())
app.use(bodyParser.json())
app.use(Express.json());
app.use(publicRoute);
app.use(privateRoute)
app.use(morgan('combined'));
swagger(app);

// Define the root route at the end
app.get('/', (request, response) => {
  response.json({
    message: 'Works',
  });
});

app.listen(3001, () => {
    console.log("listening to port 3001");
});