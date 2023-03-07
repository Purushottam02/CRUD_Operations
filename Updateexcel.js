const ExcelJS = require('exceljs');

module.exports = async function Updateexcel(inputFile) {
//   const workbook = xlsx.readFile(inputFile);
//   const sheetName = "Sheet1"; // the name of the sheet you want to update
//   const cellAddress = "A1"; // the address of the cell you want to update
//   const newValue = "Hello, world!"; // the new value you want to insert

//   const worksheet = workbook.Sheets[sheetName];
//   worksheet[cellAddress] = { t: "s", v: newValue };

//   xlsx.writeFile(workbook, inputFile);



// create a new workbook and sheet
const workbook = new ExcelJS.Workbook();
await workbook.xlsx.readFile(inputFile);
const worksheet = workbook.getWorksheet('Sheet1');

// set the value of cell A1 to "Hello, World!"
worksheet.getCell('D4').value = 45;
worksheet.getCell('D3').value = 40;
var result = worksheet.getCell('D11').value;
result.commit();
// worksheet.updateCell('D14').value;

// save the workbook
workbook.xlsx.writeFile(inputFile)
  .then(() => {
    console.log('Workbook saved successfully');
  })
  .catch((error) => {
    console.error('Error saving workbook:', error);
  });

};
