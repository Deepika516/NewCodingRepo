import {Component,ViewChild,ViewContainerRef,AfterViewInit} from '@angular/core';
import {AgGridAngular, ICellEditorAngularComp } from 'ag-grid-angular';

 
  @Component({
    selector: 'app-select-rederer',
    templateUrl: './selectRenderer.component.html',
    styleUrls: ['./selectRenderercomponent.css']
  })

  export class SelectRedererComponent implements ICellEditorAngularComp,
    AfterViewInit {
      public params:any;
      public value: object={};
    
      values = ["superadmin","admin","subscriber"]
    
      @ViewChild('input', { read: ViewContainerRef }) 
      public input:object={};
    
      agInit(params: object): void {
        this.params = params;
        this.value = this.params.value;
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