const express = require("express")

const route = express.Router()

const categoryRouter = require("./categories.routes")
const subcategoryRouter = require("./subcategories.routes")
const productsRouter = require("./products.routes")
const variantsRoute = require("./variants.routes");
const salespeopleRoute = require("./salespeople.routes")
const usersRoute = require("./users.routes")

route.use("/categories", categoryRouter)
route.use("/subcategories", subcategoryRouter)
route.use("/products", productsRouter)
route.use("/variants", variantsRoute);
route.use("/salespeople", salespeopleRoute)
route.use("/users", usersRoute)

module.exports = route