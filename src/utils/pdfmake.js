const PdfPrinter = require('pdfmake');
const fs = require('fs');
const path = require('path');

const fonts = {
    Roboto: {
        normal: path.join(__dirname, '../../public/font/Roboto-Regular.ttf'),
        bold: path.join(__dirname, '../../public/font/Roboto-Medium.ttf'),
        italics: path.join(__dirname, '../../public/font/Roboto-Italic.ttf'),
        bolditalics: path.join(__dirname, '../../public/font/Roboto-MediumItalic.ttf')
    }
};

const printer = new PdfPrinter(fonts);

const exportpdfmake = () => {


    const docDefinition = {
        content: [
            [
                {
                    image: './src/images/INVOICE.png',
                    fit: [200, 200]
                }
            ],
            { text: 'INVOICE', style: 'header', alignment: 'center' },
            {
                text: [
                    { text: 'Name: ', bold: true }, 'Kiaan\n',
                    { text: 'Address: ', bold: true }, 'Mota Varachha\n',
                    { text: 'Email: ', bold: true }, 'kiaanvaria@gmail.com\n',
                    { text: 'Phone No: ', bold: true }, '9909412186\n\n\n'
                ]
            },
            {
                style: 'tableExample',
                table: {
                    headerRows: 1,
                    body: [
                        [{ text: 'Sr', style: 'tableHeader' }, { text: 'Item', style: 'tableHeader' }, { text: 'Quantity', style: 'tableHeader' }, { text: 'Price', style: 'tableHeader' }, { text: 'Total Price', style: 'tableHeader' }],
                        ['1', 'Samsung S23', '1', '50000', '50000'],
                        ['2', 'Cover', '2', '1000', '2000'],
                        [{ text: 'Total Amount', bold: true, colSpan: 4, alignment: 'center' }, {}, {}, {}, { text: '52000', bold: true }]
                    ]
                }
            }
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10]
            },
            tableExample: {
                margin: [0, 5, 0, 15]
            },
            tableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
            }
        }
    };

    const outputPath = path.join(__dirname, '../../../../../frontendbackend/backend/ecommerce/document.pdf');
    console.log(outputPath);

    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream(outputPath));
    pdfDoc.end();
}

module.exports = exportpdfmake;

