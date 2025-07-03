const csv = require('csvtojson');
const { Parser } = require('json2csv');

// ✅ CSV → JSON
exports.convertCsvToJson = async (req, res) => {
    const { csvData } = req.body;

    if (!csvData || typeof csvData !== 'string') {
        return res.status(400).json({ success: false, message: 'Invalid CSV input' });
    }

    try {
        const json = await csv().fromString(csvData);
        return res.json({ success: true, data: json });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Conversion failed: ' + err.message });
    }
};

// ✅ JSON → CSV
exports.convertJsonToCsv = (req, res) => {
    const { jsonData } = req.body;

    if (!jsonData || !Array.isArray(jsonData)) {
        return res.status(400).json({ success: false, message: 'Invalid JSON input (must be array of objects)' });
    }

    try {
        const parser = new Parser();
        const csv = parser.parse(jsonData);
        return res.json({ success: true, data: csv });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Conversion failed: ' + err.message });
    }
};
