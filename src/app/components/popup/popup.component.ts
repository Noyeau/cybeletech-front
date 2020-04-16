import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  private _test
  @Input() set test(value) {
    console.log(this.listType)
    this._test = value
    if (value) {
      this.open = true
    } else {
      this.open = false
    }
  }
  get test() {
    return this._test
  }
  public listType;
  public open = false
  constructor(
    private _dataService: DataService
  ) {
    this.listType = this._dataService.listType
    if (!this.listType) {
      this._dataService.getListType().subscribe(res => {
        this.listType = res
      })
    }
  }

  ngOnInit() {
  }

  getValue(date, type) {
    return date.values.find(x => x.type == type.code).value + type.unite
  }

}
