import { Workbook } from 'exceljs';
import { Logo } from '../logo-b64/logo-b64';
import * as fs from 'file-saver';
import { environment } from 'src/environments/environment.prod';

// for reports
const informativeText = `Este reporte fue generado por el ${ environment.systemName }`;

export const downloadReportExcel = (title:string, headers:any[], datos:any[], fromToDate: any, total?: number) => {
    const {start, end} = fromToDate;
    let currentdate = new Date;
    let date = `FECHA Y HORA DE GENERACIÓN: ${ currentdate.toLocaleString() } `;
    //create new excel work book
    let workbook = new Workbook();
    //add name to sheet
    let worksheet = workbook.addWorksheet('Hoja 1', {
      headerFooter:{firstHeader: "&INGETEC "},
      pageSetup:{paperSize: 9, orientation:'landscape'}
    });

    // add image to workbook by buffer
    const imageId2 = workbook.addImage({
      base64: Logo,
      extension: 'png',
    });
    // insert an image over B2:D6
    worksheet.addImage(imageId2, 'A1:B1');
    // Generate title
    worksheet.addRow('').height = 60;
    worksheet.addRow('');
    let dateRow = worksheet.addRow([date]);
    let informativeTextRow = worksheet.addRow([informativeText]);
    worksheet.addRow('');
    let titleRow = worksheet.addRow([title]);

    // Add fecha
    if( start && end ){
      worksheet.addRow('');
      let fromDateRow = worksheet.addRow(['FECHA INICIAL:','', start]);
      let toDateRow = worksheet.addRow(['FECHA FINAL:','', end]);
      worksheet.addRow('');
      worksheet.mergeCells(`A${fromDateRow.number}:B${fromDateRow.number}`);
      worksheet.mergeCells(`A${toDateRow.number}:B${toDateRow.number}`);
      fromDateRow.getCell(2).font = { name: 'Calibri', family: 1, size: 11, bold: true };
      toDateRow.getCell(2).font = { name: 'Calibri', family: 1, size: 11, bold: true };
    }

    // Generate headers and size of columns
    let headerRow = worksheet.addRow(headers.map( (e) => e.header));
    headerRow.height = 60;
    // Cell Style : Fill and Border
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE7E6E6' },
        bgColor: { argb: 'FF0000FF' }
      }
      cell.alignment = { vertical: 'middle', horizontal: 'center',  wrapText: true };
      cell.font  = { name: 'Calibri', family: 1, size: 7 };
      cell.border = { top: { style: 'thin' },
                      left: { style: 'thin' },
                      bottom: { style: 'thin' },
                      right: { style: 'thin' }
                    }
    })

    headers.forEach( (element, index) => {
      worksheet.getColumn(index + 1).width = element.size;
    })

    let filas=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O'];

    // Merge the cell of title date and informative
    worksheet.mergeCells(`A${titleRow.number}:${filas[datos[0].length - 1]+titleRow.number}`);
    worksheet.mergeCells(`A${dateRow.number}:I${dateRow.number}`);
    worksheet.mergeCells(`A${informativeTextRow.number}:I${informativeTextRow.number}`);
    titleRow.getCell(1).font = { name: 'Calibri', family: 1, size: 12, underline: 'single' };
    dateRow.getCell(1).font = { name: 'Calibri', 'bold': true };
    informativeTextRow.getCell(1).font = { name: 'Calibri', 'italic': true };
    titleRow.getCell(1).alignment = { vertical: 'middle', horizontal: 'center' };
    titleRow.height = 30;
    titleRow.getCell(1).border =  { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    titleRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE7E6E6' },
      bgColor: { argb: 'FF0000FF' }
    }

    // Generar Encabezado y datos
    datos.forEach((rowData) => {
      let data;
      console.log("desdeeee:", rowData)
      let newrowdata = Object.values( rowData );
      // rowData.forEach((columnData: any)=>{
      //   data.push(columnData);
      // })
      let row = worksheet.addRow(newrowdata);

      row.height = 20;
      row.font  = { name: 'Arial Narrow', family: 1, size: 10 };
      row.alignment = { vertical: 'middle', horizontal: 'center',  wrapText: true }
      // Otorga estilos por celda
      for (let i = 1; i < newrowdata.length + 1; i++) {
        row.getCell(i).border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
      }
    })

    worksheet.addRow('');
    let totalSuma = worksheet.addRow(['TOTAL:','', total]);
    worksheet.mergeCells(`A${ totalSuma.number }:B${ totalSuma.number }`);
    totalSuma.getCell(2).font = { name: 'Calibri', family: 1, size: 11, bold: true };

    //set downloadable file name
    let fname=`${title}_${currentdate.toLocaleString()}`

    //add data and file name and download
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname+'-'+new Date().valueOf()+'.xlsx');
    });

  }
