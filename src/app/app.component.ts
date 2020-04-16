import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from './services/data.service';
import { PopupComponent } from './components/popup/popup.component';
declare var require:any;
var Highcharts = require('highcharts');  
// Load module after Highcharts is loaded
require('highcharts/modules/exporting')(Highcharts); 


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('popup') popup:PopupComponent
  coordinates

  title = 'front';
  ready=false;
  dateList = [
    {label : "j0", date: new Date()},
    {label : "j+1", date: new Date(new Date().setDate(new Date().getDate()+1))},
    {label : "j+2", date: new Date(new Date().setDate(new Date().getDate()+2))},
    {label : "j+3", date: new Date(new Date().setDate(new Date().getDate()+3))},
    {label : "j+4", date: new Date(new Date().setDate(new Date().getDate()+4))},
    {label : "j+5", date: new Date(new Date().setDate(new Date().getDate()+5))},
    {label : "j+6", date: new Date(new Date().setDate(new Date().getDate()+6))},
  ]
  selectedDate = this.dateList[0].date;

  selectedTypeCode="t_2m:C";

  dataToDisplay

  public listType:any[] = []
  constructor(
    private _dataService: DataService
  ) {
    this._dataService.getListType().subscribe((res: any[]) => {
      this.listType = res
    })
    this._dataService.getAllData().subscribe((res: any[]) => {
      this.ready=true
      setTimeout(()=>{
        console.log(res[0])
        this.dataToDisplay = res

      },50)
      
    })
  }

  ngOnInit() {

  }

  getSelectedType(){
    return this.listType.find(x=>x.code == this.selectedTypeCode)
  }

  coordinatesSelected(data){
    console.log(data)
    this.coordinates = data
  }

  openPopup() {
    this.popup.open = true
  }

}
