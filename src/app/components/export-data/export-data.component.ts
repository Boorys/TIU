import { Component, OnInit, Input } from '@angular/core';
import { DataService, User } from 'src/app/service/data.service';
import { SortPreferences } from '../table/table.component';

@Component({
  selector: 'app-export-data',
  templateUrl: './export-data.component.html',
  styleUrls: ['./export-data.component.css']
})
export class ExportDataComponent implements OnInit {
  
  @Input() sortPreference: SortPreferences;
  jsonData:string

  constructor(

    private service: DataService,
  
  ) { }

  ngOnInit(): void {
    
    this.service.getUsersToCsv(localStorage.getItem('sortField'),localStorage.getItem('sortAsc')).subscribe(data => {
    this.jsonData = JSON.stringify(data);
    
  console.log(this.jsonData)
  }, error => {

    })
  }

  downloadFile(data, filename='data') {
   
    let csvData = this.ConvertToCSV(data, [
      "userId",
      "firstName",
      "lastName",
      "userName",
      "password",
      "role",
      "photoPath",
  ]);
  
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
  
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
}

ConvertToCSV(objArray, headerList) {
     let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
     let str = '';
     let row = 'S.No,';

     for (let index in headerList) {
         row += headerList[index] + ',';
     }
     row = row.slice(0, -1);
     str += row + '\r\n';
     for (let i = 0; i < array.length; i++) {
         let line = (i+1)+'';
         for (let index in headerList) {
            let head = headerList[index];

             line += ',' + array[i][head];
         }
         str += line + '\r\n';
     }
     return str;
 }

 download(){
  this.downloadFile(this.jsonData, 'jsontocsv');
}

}