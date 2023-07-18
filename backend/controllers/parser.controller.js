const csv = require('csv-parser');
const fs = require('fs');
const Category = require("../models/parser.model");
const path = require('path')

async function readFile(filename) {
    return new Promise((resolve, reject) => {
        let results = []
        fs.createReadStream(filename)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                resolve(results)
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

const insertCSVDataToMongo = async (req, res) => {
    try {
        const { vendor, date } = req.body
        if (!vendor || !date || !req.file) {
            return res.status(400).json({ message: 'fill all fields' })
        }
        const getPath = path.join(path.dirname(__dirname), "uploads")
        const filePath = `${getPath}/${req.file.filename}`
        const checkCSVExtension = req.file.mimetype === 'text/csv'
        if (!checkCSVExtension) {
            return res.status(400).json({ message: 'wrong extension' })
        }
        let parsData = await readFile(filePath);
        let updatePrseData = []
        if (parsData && parsData.length > 0) {
            for (let i = 0; i < parsData.length; i++) {
                let modelNumber = parsData[i]["Model Number"]
                let price = parsData[i]["Unit Price"]
                let qty = parsData[i]["Quantity"]
                let UnitPrice = !isNaN(price) ? parseFloat(price) : 0
                let Quantity = !isNaN(qty) ? parseInt(qty) : 0
                if (modelNumber && UnitPrice && Quantity) {
                    updatePrseData.push({ ModelNumber: modelNumber, UnitPrice, Quantity, Vendor: vendor, Date: date })
                }
            }
        }
        const data = await Category.insertMany(updatePrseData)
        if (data)
            return res.status(200).json({ success: true });

    } catch (err) {
        return res.status(400).json({ message: err });
    }
}
module.exports = { insertCSVDataToMongo }
