import { Component, OnInit } from '@angular/core';
import * as data from 'src/employee.json';
import { ColDef, GridApi, GridReadyEvent,RowNodeTransaction} from 'ag-grid-community';
import { MockServiceService } from 'src/app/services/mockApi.service';
import { Role } from 'src/app/enums/role.enum';
import{DropDownComponent} from 'src/app/components/dropdown/dropdown.component'


@Component({
  selector: 'app-grid-table',
  templateUrl: './grid-table.component.html',
  styleUrls: ['./grid-table.component.css']
})

export class GridTableComponent implements OnInit {
  employeesjson=data; 
  hideTable = false;
  public editType = 'fullRow';
  public rowData=[];
  private gridApi!: GridApi;
  public rowSelection: 'single' | 'multiple' = 'single'
  role:Role=Role.Subscriber;
  
 
 
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
    minWidth: 50,cellEditor:DropDownComponent},

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
    this.mockService.getData().subscribe((data:[]) => {
    this.rowData = data;
    });
  }
}








