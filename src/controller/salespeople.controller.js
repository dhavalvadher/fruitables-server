const { Salespeople } = require("../model");

const Listsalespeople = async (req, res) => {
    try {
        const salespeople = await Salespeople.getsalespeople();
        res.status(200).json({
            success: true,
            data: salespeople,
            message: "Salespeople data fetched"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: []
        });
    }
};

const addsalespeople = async (req, res) => {
    try {
        const { city, sname, comm, isActive } = req.body;
        const salespeople = await Salespeople.postsalespeople(city, sname, comm, isActive);
        console.log(salespeople);
        res.status(201).json({
            success: true,
            data: salespeople,
            message: "Salesperson added successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: []
        });
    }
};

const deleteSales = async (req, res) => {
    try {
        const { snum } = req.params;
        const salespeople = await Salespeople.deleteSalespeople(snum);
        res.status(200).json({
            success: true,
            data: salespeople,
            message: "Salesperson data deleted successfully."
        });
    } catch (error) {
        console.error("Error deleting salesperson:", error);
        res.status(500).json({
            success: false,
            data: [],
            message: "Internal server error."
        });
    }
};

const updateSales = async (req, res) => {
    try {
        const {snum} = req.params

        const {sname, city, comm, isActive} = req.body

        const salespeople = await Salespeople.updateSalespeople(snum, sname, city, comm, isActive);

        console.log(salespeople);

        res.status(200).json({
            success: true,
            message: "salespeople updated sucessfully",
            data: salespeople
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: []
        })
    }
};

module.exports = {
    Listsalespeople,
    addsalespeople,
    deleteSales,
    updateSales
};
