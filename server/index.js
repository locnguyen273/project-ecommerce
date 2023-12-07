const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const morgan = require("morgan");
const cors = require("cors");

// Khởi tạo paypal
var paypal = require("paypal-rest-sdk");

// const io = require('socket.io')(http);

var upload = require("express-fileupload");
const port = 8000;

const ProductAPI = require("./api/routers/product.router");
const UserAPI = require("./api/routers/user.router");
const OrderAPI = require("./api/routers/order.router");
const Detail_OrderAPI = require("./api/routers/detail_order.router");
const CommentAPI = require("./api/routers/comment.router");
const CategoryAPI = require("./api/routers/category.router");
const NoteAPI = require("./api/routers/note.router");

const ProductAdmin = require("./api/routers/admin/product.router");
const CategoryAdmin = require("./api/routers/admin/category.router");
const Permission = require("./api/routers/admin/permission.router");
const UserAdmin = require("./api/routers/admin/user.router");
const Order = require("./api/routers/admin/order.router");
const Coupon = require("./api/routers/admin/coupon.router");
const Sale = require("./api/routers/admin/sale.router");

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://tanloc20600:0YrDOEmlIMDNEes8@cluster0.rgnkza9.mongodb.net/app-food",
    // "mongodb://localhost:27017/test",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((error) => {
    console.log("database connection failed. exiting now...");
    console.error(error);
    process.exit(1);
  });
app.use(morgan("dev"));
app.use("/", express.static("public"));
app.use(upload());

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// Cài đặt config cho paypal
// paypal.configure({
//   mode: "sandbox", //sandbox or live
//   client_id:
//     "AZs1BwWM6IlHg7FFjBOURgGUuObrQmEKguSVbowu4ZqOuH7n2em2NBDmzBoQOqrUsgV-CVAsylOOB5ve", // Thông số này copy bên my account paypal
//   client_secret:
//     "ELcS0dYevQhG7LZrBQ-fdOpPXINVQXfKQCzh8f7uFpM2vpO_g0hz5K4rk2tg1dO5p2Hzxvsx-m2fn0QU", // Thông số này cùng vậy
// });

app.use("/api/Product", ProductAPI);
app.use("/api/User", UserAPI);
app.use("/api/Payment", OrderAPI);
app.use("/api/Comment", CommentAPI);
app.use("/api/Note", NoteAPI);
app.use("/api/DetailOrder", Detail_OrderAPI);
app.use("/api/Category", CategoryAPI);

app.use("/api/admin/Product", ProductAdmin);
app.use("/api/admin/Category", CategoryAdmin);
app.use("/api/admin/Permission", Permission);
app.use("/api/admin/User", UserAdmin);
app.use("/api/admin/Order", Order);
app.use("/api/admin/Coupon", Coupon);
app.use("/api/admin/Sale", Sale);

// io.on("connection", (socket) => {
//   console.log(`Có người vừa kết nối, socketID: ${socket.id}`);

//   socket.on("send_order", (data) => {
//     console.log(data);

//     socket.broadcast.emit("receive_order", data);
//   });
// });

http.listen(port, () => {
  console.log("listening on *: " + port);
});
