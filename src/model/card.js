const addcategory = async (req, res) => {
    try {
        console.log(req.body);

        const category = await Categories.create(req.body);
        console.log(category);

        if (!category) {
            res.status(400).json({
                success: false,
                message: "Category not creted"
            })
        }

        res.status(201).json({
            success: true,
            message: "Category careted sucessfully",
            data: category
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Intenal server error." + error.message
        })
    }
}