const express = require('express');
const { salespeopleController } = require('../../../controller');
const routes = express.Router();

routes.get(
    '/get-salespeople',
    salespeopleController.Listsalespeople
)

routes.post(
    '/add-salespeople',
    salespeopleController.addsalespeople
);

routes.delete(
    '/delete-salesperson/:snum',
    salespeopleController.deleteSales
);

routes.put(
    '/update-salesperson/:snum',
    salespeopleController.updateSales
)

module.exports = routes;
