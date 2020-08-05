import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DashboardService } from './dashboard.service';
import * as bulmaCalendar from 'bulma-calendar';
import { DatePipe } from '@angular/common';

import { find, flatMap, some} from 'lodash';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  tenantForm = new FormGroup({
    name: new FormControl(''),
  });

  tenantMoveForm = new FormGroup({
    tenantId: new FormControl(''),
    flatId: new FormControl(''),
    moveDate: new FormControl(''),
  });

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

  ngAfterViewInit() {

    setTimeout(() => {
      this.calendar = bulmaCalendar.attach(`#datepicker`, {
        startDate: new Date()
      })[0];

      this.calendar.on('select', (datepicker) => {
      const value = this.datePipe.transform(+datepicker.data.startDate);
      
        this.tenantMoveForm.patchValue({moveDate: value});
      
      });
    });
  }

  
  constructor(
    private dashboardService: DashboardService,
    private datePipe: DatePipe

  ) { }

  ngOnInit(): void {
    this.loadFacilites();
    this.loadTenants();
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

  getTenantById(tenantId) {
    return find(this.tenants, {_id: tenantId});
  }

  openMoveHistory(flatId) {
    if(this.showMoveHistory === flatId) {
      this.showMoveHistory = false;
    } else {
      this.showMoveHistory = flatId;
    }
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

  selectTenant(tenant) {
    this.tenantMoveForm.patchValue({
      tenantId: tenant._id
    });
    this.selectedTenant = tenant;
  }

  isFree(flatId) {
    return !some(this.tenants, t => t.flatId === flatId);
  }


  loadFacilites() {
    return this.dashboardService.getFacilities().subscribe(r => {
      this.facilites = r;
      this.getFlatById(3);
    });
  }

  createTenant() {
    this.tenantBtnLoading = true;
    this.dashboardService.createTenant(this.tenantForm.value).subscribe(r => {
      this.tenantBtnLoading = false;
      this.loadTenants();
    });
  }

  selectFlat(item) {
    this.tenantMoveForm.patchValue({
      flatId: item.flatId
    });
    this.selectedFlat = item;
  }

  loadTenants() {
    return this.dashboardService.getTenants().subscribe(r => {
      this.tenants = r;
    });
  }

  moveTenant() {
    this.tenantBtnLoading = true;
    this.dashboardService.moveTenant(this.tenantMoveForm.value).subscribe(r => {
      this.tenantBtnLoading = false;
      this.loadTenants();
      this.loadFacilites();
    });
  }
}
