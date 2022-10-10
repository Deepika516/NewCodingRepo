import {Component,ViewChild,ViewContainerRef,AfterViewInit} from '@angular/core';
import {AgGridAngular, ICellEditorAngularComp } from 'ag-grid-angular';
import { GridReadyEvent } from 'ag-grid-community';

 
  @Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.css']
  })

  export class DropDownComponent implements ICellEditorAngularComp,
    AfterViewInit {
      public params:object={};
      public value: object={};
    
      values = ["superadmin","admin","subscriber"]
    
      @ViewChild('input', { read: ViewContainerRef }) 
      public input:object={};
    
      agInit(params: {value:object}): void {
        this.params = params;
        this.value = params.value;
      }
    
      getValue(): object {
        return this.value;
      }
    
      isCancelAfterEnd(): boolean {
        return false;
      }
    
      ngAfterViewInit() {   
      }
    }