import { Component, OnInit } from '@angular/core';
import * as data from 'src/employee.json';
import { ColDef, GridApi, GridReadyEvent,RowNodeTransaction,ICellEditorComp,
  ICellEditorParams,} from 'ag-grid-community';
import { MockServiceService } from 'src/app/service/mockApi.service';
import { Role } from 'src/app/enum/role.enum';
import { IUser } from 'src/app/interfaces/users.interface' 


import{SelectRedererComponent} from 'src/app/components/selectRenderer/selectRenderer.component'

@Component({
  selector: 'app-grid-table',
  templateUrl: './grid-table.component.html',
  styleUrls: ['./grid-table.component.css']
})

export class GridTableComponent implements OnInit {
  employeesjson=data; 
  hideTable = false;
  public editType = 'fullRow';
  public rowData: any;
  private gridApi!: GridApi;
  public rowSelection: 'single' | 'multiple' = 'single'
  role:Role=Role.Subscriber;
  roles=Object.keys(Role);

  roleUser=Role;
 
  constructor(private mockService:MockServiceService) {
  }
 
  ngOnInit():void{ 
  }

  // to show Header Row in ag-Grid Table.
  columns=[
    {"headerName":"ID", "field":"id",width: 90, 
     minWidth: 50},

    {"headerName":"FIRST_NAME","field":"first_name",width: 90,
    minWidth: 50},

    {"headerName":"MIDDLE_NAME","field":"middle_name",width: 90,
    minWidth: 50},

    {"headerName":"LAST_NAME", "field":"last_name",width: 90,
    minWidth: 50 },

    {"headerName":"EMAIL", "field":"email",width: 170,
    minWidth: 90},

    {"headerName":"PHONE_NO","field":"phone_no",width: 120,
    minWidth: 50},

    {"headerName":"ROLE","field":"role",width: 90, 
    minWidth: 50,cellEditor:SelectRedererComponent},

    {"headerName":"ADDRESS","field":"address",width: 90,
    minWidth: 50},

    {"headerName":"DOJ", "field":"doj",width: 100,
    minWidth: 70},
  ];

  public defaultColDef: ColDef = {
    flex: 1,
    editable: true,
  };

  // To select the specific row for delete operation
  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows();
    (document.querySelector('#selectedRows') as any).innerHTML =
    selectedRows.length === 1 ? selectedRows[0].id : '';
  }

  //on the of click of delete button delete the specific row
 onDelete(){
  const selectedData = this.gridApi.getSelectedRows();
  const res = this.gridApi.applyTransaction({ remove: selectedData })!;
  this.printResult(res);
 }

 printResult(res: RowNodeTransaction) 
 {
  if (res.remove)
  {
     res.remove.forEach(function (rowNode) {
     console.log('Removed Row Node', rowNode);
  });
  }
 }

 // to Edit the row and save the updated data 
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  // to click the loadbutton and show the ag grid table
  onClick(){
    this.hideTable = true;
    const loadbtn = document.getElementById("loadData") as HTMLElement; 
    loadbtn.innerHTML = "Refresh Data"; 
    this.mockService.getData().subscribe((data:{}) => {
    this.rowData = data;
    });
  }
}
// class DatePicker implements ICellEditorComp {
//   eInput!: HTMLInputElement;

//   // gets called once before the renderer is used
//   init(params: ICellEditorParams) {
//     // create the cell
//     this.eInput = document.createElement('input');
//     this.eInput.value = params.value;
//     this.eInput.classList.add('ag-input');
//     this.eInput.style.height = '100%';

//     // https://jqueryui.com/datepicker/
//     $(this.eInput).datepicker({
//       dateFormat: 'dd/mm/yy',
//       onSelect: () => {
//         this.eInput.focus();
//       },
//     });
//   }

//   // gets called once when grid ready to insert the element
//   getGui() {
//     return this.eInput;
//   }

//   // focus and select can be done after the gui is attached
//   afterGuiAttached() {
//     this.eInput.focus();
//     this.eInput.select();
//   }

//   // returns the new value after editing
//   getValue() {
//     return this.eInput.value;
//   }

//   // any cleanup we need to be done here
//   destroy() {
//     // but this example is simple, no cleanup, we could
//     // even leave this method out as it's optional
//   }

//   // if true, then this editor will appear in a popup
//   isPopup() {
//     // and we could leave this method out also, false is the default
//     return false;
//   }
// }








