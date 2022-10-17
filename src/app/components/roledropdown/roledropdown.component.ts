import {Component,ViewChild,ViewContainerRef} from '@angular/core';
import {AgGridAngular, ICellEditorAngularComp } from 'ag-grid-angular';


 
  @Component({
    selector: 'app-roledropdown',
    templateUrl: './roledropdown.component.html',
    styleUrls: ['./roledropdown.component.css']
  })

  export class RoleDropDownComponent implements ICellEditorAngularComp
     {
      public params:object={};
      public rolevalue: object={};
    
      rolevalues = ["superadmin","admin","subscriber"]
    
      @ViewChild('input', { read: ViewContainerRef }) 
      public input:object={};
    
      agInit(params: {value:object}): void {
        this.params = params;
        this.rolevalue = params.value;
      }
    
      getValue(): object {
        return this.rolevalue;
      }
    
      isCancelAfterEnd(): boolean {
        return false;
      }
    }