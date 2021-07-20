import fs from 'fs'
import fetch from 'node-fetch'
import csv from 'csvtojson'

// Some notes on configuration file creation.
// Especially, Google gviz "Chart Tools datasource protocol" that serves sheets as CSV is somewhat haphazard, so...

// - Use English locale to ensure numbers have a dot (.) separator instad of comma (,)
// - Header line may need a "EOF" column with a dummy value 1 below it to prevent header garbling
// - If cURL is used to fetch the CSV, include url in 'quotes', otherwise something goes silently wrong...
// - csvtojson uses handy special header syntax that can construct arrays (MyArray.[0], MyArray.[1]) and dictionarys (MyDict.MyKey), see https://www.npmjs.com/package/csvtojson

const googleSpreadsheedId = process.env.REACT_APP__DELI_CONFIG_SPREADSHEET_ID
if (googleSpreadsheedId === undefined) {
    throw Error('Need environment variable REACT_APP__DELI_CONFIG_SPREADSHEET_ID to point to a Google Sheet which has been shared to public with read access')
}

const deliAppId = process.env.REACT_APP__DELI_VARIANT_ID
if (deliAppId === undefined) {
    throw Error('Need environment variable REACT_APP__DELI_VARIANT_ID like \'fi\' or \'en\' to be able to save the data for the correct variant.')
}

fetchCsvSaveJson(
    `https://docs.google.com/spreadsheets/d/e/${googleSpreadsheedId}/pub?output=csv&gid=502119156`,
    `variants/${deliAppId}/src-customization/data/collections.json`
)

fetchCsvSaveJson(
    `https://docs.google.com/spreadsheets/d/e/${googleSpreadsheedId}/pub?output=csv&sheet=Inventory`,
    `variants/${deliAppId}/src-customization/data/inventory.json`
)

function fetchCsvSaveJson(csvUrl: string, outFile: string) {
    console.log(csvUrl)
    fetch(csvUrl)
        .then(response => response.text())
        .then(data => {
            console.log(data)
            csv({
                ignoreEmpty: true,
                checkType: true,
                trim: true,
                ignoreColumns: /EOF/,
            }).fromString(data)
                .then((csvRow) => {
                    console.log(csvRow)
                    const jsonString = JSON.stringify(csvRow, null, 2)
                    fs.writeFile(outFile, jsonString, (err) => {
                        if (err) throw err
                        console.log(`The file ${outFile} has been saved!`)
                    })
                })
        })
}
/*

    csv({
        // noheader:true,
        // output: "csv"
        ignoreEmpty: true,
        checkType: true,
        trim: true,
    }).fromFile('src/data/products.csv')
    .then((csvRow)=>{
        console.log(csvRow)
        console.log(csvRow[0].Tag)
    })
*/