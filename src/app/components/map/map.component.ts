import { Component, OnInit, Input } from '@angular/core';
import * as L from 'leaflet';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: any;
  private _data
  private _type = { label: "température à 2m", code: "t_2m:C", unite: "°C" }

  coordinatesSelected: any = null

  @Input() typeList;

  private _date

  @Input() set date(value) {
    this._date = value
    console.log(value)
    if (this.map && this.data) {
    this.updateData()
    }
  }
  get date() {
    return this._date
  }

  @Input() set type(value) {
    this._type = value
    if (this.map && this.data) {
      this.updateData()
    }
  }
  get type() {
    return this._type
  }
  @Input() set data(value) {
    this._data = value
    if (this.map && this.data) {
      this.updateData()
    }
  }
  get data() {
    return this._data
  }

  dataCircle = []
  constructor(
    private _dataService: DataService
  ) { }

  ngOnInit() {
    this.setMap()
  }


  updateData() {
    this.clearData()
    this.dataCircle = this.data.map(x => {
      let thisValue;
      if(!this.date){
        thisValue = x.dates[0].values.find(y => y.type == this.type.code)
      } else {
        if(x.dates.find(y => new Date(y.date).toDateString() == new Date(this.date).toDateString()))
        thisValue = x.dates.find(y => new Date(y.date).toDateString() == new Date(this.date).toDateString()).values.find(y => y.type == this.type.code)
      }

        let circle = L.circle([x.lat, x.lon], {
          opacity: 0.2,
          color: this._dataService.getValueColor(thisValue),
          fillColor: this._dataService.getValueColor(thisValue),
          fillOpacity: 0.4,
          radius: 5000
        }).addTo(this.map);
      circle.addEventListener('click', (event) => {
        this.coordinatesSelected = x
      })
      return circle
    })
  }

  clearData() {
    this.dataCircle.map(x => {
      x.remove()
    })
    this.dataCircle = []
  }

  setMap() {
    this.map = L.map('frugalmap').setView([46.9, 1.6], 6);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Test'
    }).addTo(this.map);

  }
}
