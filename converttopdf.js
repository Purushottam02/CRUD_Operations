const fs = require("fs");
const DocxToPdf = require("docx-pdf");
const HummusRecipe = require("hummus-recipe");
module.exports = async function convertWordToPdfWithPasscode(
  inputFilePath,
  outputFilePath,
  passcode
) {
  // Convert Word document to PDF
  var pdf = await DocxToPdf(inputFilePath, outputFilePath, ()=>{});
  // Add passcode to PDF
  const pdf2 = new HummusRecipe(outputFilePath, 'final.pdf');

  pdf2
    .encrypt({
      userPassword: passcode,
      ownerPassword: passcode,
      userProtectionFlag: 4,
    })
    .endPDF();
  // 

};