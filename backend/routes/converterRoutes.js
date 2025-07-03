const express = require('express');
const router = express.Router();
const { convertCsvToJson , convertJsonToCsv} = require('../converters/apiConverters');

// CSV --> JSON
router.post('/csv2json', convertCsvToJson);
// JSON --> CSV
router.post('/json2csv', convertJsonToCsv);

module.exports = router;