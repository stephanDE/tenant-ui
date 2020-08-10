import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

import { find, flatMap, filter} from 'lodash';

import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  public facilites;
  public facilityDrpdIsOpen: boolean;
  public selectedFacility;

  public tenants;
  public tenantBtnLoading: boolean;
  

  public selectedFlat;

  public selectedTenant;

  public moveDate;

  public datePickerConfig = {};

  public calendar;

  public showMoveHistory;

  public dataLoading;

  public openedId: string;
  public fraunhoferData;

  
  constructor(
    private dashboardService: DashboardService
  ) { 
    moment.locale('de');
  }

  ngOnInit(): void {
    this.loadFacilites();
  }

  getFlatById(flatId) {
    if(!flatId) return;

    const a = flatMap(this.facilites, ({ floors }) =>
      {
        return flatMap(floors, ({flats}) => flats);
      }
    );
    return find(a, {flatId});
  }

  getFloorById(floorId) {
    if(!floorId) return;

    const a = flatMap(this.facilites, ({ floors }) =>
      {
        return floors
      }
    );
    return find(a, {floorId});
  }

  get rooms() {
    if(!this.selectedFlat) return [];
    return this.selectedFlat.rooms;
  }

  getFacilityById(facilityId) {
    if(!facilityId) return;
    return find(this.facilites, {facilityId});
  }

  toggleFacilityDrpd() {
    this.facilityDrpdIsOpen = !this.facilityDrpdIsOpen;
  }

  selectFacility(facility) {
    this.toggleFacilityDrpd();
    this.selectedFacility = facility;  
  }


  loadFacilites() {
    return this.dashboardService.getFacilities().subscribe(r => {
      this.facilites = r;
      this.getFlatById(3);
    });
  }


  selectFlat(item) {
    this.selectedFlat = item;

    /*
    this.dashboardService.getDevices().subscribe(r => {
      debugger;

      //const filtered = filter(r, {roomId: this.selectedFlat})

      this.dashboardService.getFraunhoferDevice(r[0]._id).subscribe(r => {
        debugger;
      });
    });*/
    
  }

  openData(room) {
    this.dataLoading = true;
    this.openedId = room.roomId;

    this.dashboardService.getDevice(room.roomId).subscribe(r => {
      this.dashboardService.getFraunhoferDevice((r as any)._id).subscribe(r => {
        this.dataLoading = false;
        this.fraunhoferData = r;
      });
    });
  }

  getTime(value) {
    return moment(value).fromNow();
  }
}
