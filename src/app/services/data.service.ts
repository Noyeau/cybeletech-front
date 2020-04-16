import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  listType
  constructor(private http: HttpClient) { }

  getListType() {
    let url = environment.api + '/typeList'
    return this.http.get(url).pipe(map(x=>{
      this.listType = x
      console.log(this.listType)
      return x
    }))
  }

  getAllData(dateMin = null, dateMax = null) {
    let url = environment.api + '/getAll'
    if (dateMin) {
      url += '/' + dateMin
      if (dateMax) {
        url += '/' + dateMax
      }
    }
    return this.http.get(url)
  }

  getData(coordinates: { lat: number, lon: number }, dateMin = null, dateMax = null) {
    let url = `${environment.api}/get/${coordinates.lat}/${coordinates.lon}`
    if (dateMin) {
      url += '/' + dateMin
      if (dateMax) {
        url += '/' + dateMax
      }
    }
    return this.http.get(url)
  }


  getValueColor(elem) {
    let rep ='#000';
    switch (elem.type) {
      case "global_rad:W":
        rep = isW(elem.value) 

        break;
      case "dew_point_2m:C":
        rep = isTemp(elem.value) 
        break;
      case "t_2m:C":
        rep = isTemp(elem.value) 
        break;
      case "relative_humidity_2m:p":
        rep = isPourcent(elem.value) 

        break;
    }
    return rep;

    function isTemp(value){
      if(value <= 0)return "#fff"
      else if (value <=10) return "#77e1ff"
      else if (value <=20) return "#ffd800"
      else if (value <=30) return "#ffaf30"
      else if (value <=30) return "#ff7130"
      else if (value >40) return "#ff3030"
    }

    function isPourcent(value){
      if(value <= 0)return "#fff"
      else if (value <=20) return "#aeb7fc"
      else if (value <=40) return "#6c7dfc"
      else if (value <=60) return "#475cff"
      else if (value <=80) return "#1933fc"
      else if (value <=100) return "#001dff"
    }

    function isW(value){
      if(value <= 33)return "#a5ff00"
      else if (value <=66) return "#f6ff00"
      else if (value <=99) return "#ffd800"
      else if (value <=133) return "#ffbb00"
      else if (value <=166) return "#ff8c00"
      else if (value <=200) return "#ff5400"
      else if (value >200) return "#ff0000"
    }
  }



}
