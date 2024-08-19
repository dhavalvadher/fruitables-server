const pool = require("../db/mysql");

const getsalespeople = async () => {
    try {
        const [rows, fields] = await pool.execute('SELECT * FROM salespeople');
        console.log(rows);
        return rows;
    } catch (error) {
        console.error('Error fetching salespeople:', error);
        throw new Error('Error fetching salespeople');
    }
};

const postsalespeople = async (city, sname, comm,isActive) => {
    try {

        const [result] = await pool.execute("INSERT INTO salespeople (city, sname,comm,isActive) VALUES (?,?,?,?)",
            [city, sname, comm,isActive]);


        // console.log(result);
        return { city, sname, comm, isActive,snum: result.insertId }



    } catch (error) {
        console.log(error);
        throw new Error('Error add salespeople');
    }



}

const deleteSalespeople = async (snum) => {
    try {
        const [result] = await pool.execute("DELETE FROM salespeople WHERE snum=?", [snum]);
        console.log(result);
        return result;
    } catch (error) {
        throw new Error("Error deleting salespeople:" + error.message);
    }
};

const updateSalespeople = async (snum, sname, city, comm, isActive) => {
    try {
        const [result] = await pool.execute('UPDATE salespeople SET sname=?, city= ?, comm=?, isActive = ?   WHERE snum = ?', [sname, city, comm, isActive, snum])
        console.log(result);

        return result

    } catch (error) {
        console.log(error);
        throw new Error("error update salespeople");
    }
};

module.exports = {
    getsalespeople,
    postsalespeople,
    deleteSalespeople,
    updateSalespeople
};

