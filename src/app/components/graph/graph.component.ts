import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
declare var require: any;
var Highcharts = require('highcharts');
// Load module after Highcharts is loaded
require('highcharts/modules/exporting')(Highcharts);

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  private _type
  @Input() set type(value) {
    this._type = value
    if (this.data && this.type) {
      this.genereGraph()
    }
  }
  get type() {
    return this._type
  }

  private _data
  @Input() set data(value) {
    this._data = value
    if (this.data && this.type) {
      this.genereGraph()
    }
  }
  get data() {
    return this._data
  }
  constructor() { }

  ngOnInit() {
  }

  graph
  genereGraph() {
    let categories = []


    let serie = {
      name: this.type.label,
      data: []
    }

    this.data.dates.map(x => {
      categories.push(new Date(x.date).toLocaleString('fr-FR', { timeZone: 'UTC' }))
      serie.data.push(x.values.find(y => y.type == this.type.code).value)

    })
    let series = [serie]

    this.graph = null
    this.graph = Highcharts.chart('graph', {
      chart: {
        type: 'line'
      },
      title: {
        text: this.type.label
      },
      subtitle: {
        text: 'Source: Cybeletech Meteomatics'
      },
      xAxis: {
        categories: categories
      },
      yAxis: {
        title: {
          text: "" // "Unitée ("+ this.type.unite +")"
        },
        labels: {
          format: "{value} " + this.type.unite
        },
      },
      navigator: {
        enabled: false
      },
      rangeSelector: {
        enabled: false
      },
      tooltip:{
        pointFormat:'<span style="color:{point.color}">●</span> {series.name}: <b>{point.y} '+this.type.unite+'</b><br/>'
      },
      exporting: { enabled: false },
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true,
            format: "{y} " + this.type.unite

          }
        }
      },
      series: series,
      responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }
    });
  }


}
