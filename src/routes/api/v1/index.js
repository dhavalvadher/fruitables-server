const express = require("express")

const route = express.Router()

const categoryRouter = require("./categories.routes")
const subcategoryRouter = require("./subcategories.routes")
const productsRouter = require("./products.routes")
const variantsRouter = require('./variants.routes');
const salespeopleRoute = require("./salespeople.routes")
const usersRoute = require("./users.routes")
const ordersRouter = require("./orders.routes")
const paymentsRouter = require('./payments.routes')
const cartsRouter = require("./carts.routes")
const reviewsRoute = require('./reviews.routes')

route.use("/categories", categoryRouter)
route.use("/subcategories", subcategoryRouter)
route.use("/products", productsRouter)
route.use('/variants', variantsRouter);
route.use("/salespeople", salespeopleRoute)
route.use("/users", usersRoute)
route.use("/orders", ordersRouter);
route.use("/payments", paymentsRouter);
route.use("/carts", cartsRouter);
route.use("/reviews", reviewsRoute);



module.exports = route