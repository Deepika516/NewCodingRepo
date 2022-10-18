import { Component, OnInit } from '@angular/core';
import * as data from 'src/employee.json';
import { ColDef, GridApi, GridReadyEvent,RowNodeTransaction,RowModelType,
               IDatasource, IGetRowsParams} from 'ag-grid-community';
import { MockServiceService } from 'src/app/services/mockApi.service';
import { Role } from 'src/app/enums/role.enum';
import{RoleDropDownComponent} from 'src/app/components/roledropdown/roledropdown.component'
import { IUser } from 'src/app/interfaces/users.interface';

@Component({
  selector: 'app-grid-table',
  templateUrl: './grid-table.component.html',
  styleUrls: ['./grid-table.component.css']
})

export class GridTableComponent implements OnInit {
  employeesjson=data; 
  hideTable = false;
  public editType = 'fullRow';
  public rowData:IUser[]=[];
  private gridApi!: GridApi;
  public rowSelection: 'single' | 'multiple' = 'single'
  role:Role=Role.Subscriber;

  // Used for Infinite Scroll
  public rowModelType: RowModelType = 'infinite';
  cacheBlockSize = 10;
  cacheOverflowSize=1;
  maxConcurrentDatasourceRequests=1;
  maxBlocksInCache=1;
  infiniteInitialRowCount=5;
  
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
    minWidth: 50,cellEditor:RoleDropDownComponent},

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
    (document.querySelector('#selectedRows')as HTMLElement).innerHTML =
    selectedRows.length === 1 ? selectedRows[0].id : '';
  }

  //on the of click of delete button delete the specific row
 onRemoveSelected() {
  const selectedData = this.gridApi.getSelectedRows();
  const res = this.gridApi.applyTransaction({ remove: selectedData });
  if(res!=null)
  this.printResult(res);
}

 printResult(res: RowNodeTransaction) 
 {
 
  if (res.remove) {
    res.remove.forEach(function (rowNode) {
      console.log('Removed Row Node', rowNode);
    });
  }
 }

 
 // to Edit the row and save the updated data 
  onGridReady(params: GridReadyEvent)
   {
    this.gridApi = params.api;
    this.mockService.getData().subscribe((data:IUser[]) => {
      const dataSource: IDatasource = {
        rowCount: undefined,
        getRows: (params: IGetRowsParams) => {
          // At this point in code, you would call the server.
          setTimeout(function () {
            const rowsThisPage = data.slice(params.startRow, params.endRow);
            // if on or after the last page, work out the last row.
            let lastRow = -1;
            if (data.length <= params.endRow) {
              lastRow = data.length;
            }
            // call the success callback
            params.successCallback(rowsThisPage, lastRow);
          }, 500);
        },
      };
      params.api!.setDatasource(dataSource);
    });
}
  // to click the loadbutton and show the ag grid table
  onClick(){
    this.hideTable = true;
    const loadbtn = document.getElementById("loadData") as HTMLElement; 
    loadbtn.innerHTML = "Refresh Data"; 
  }
}









