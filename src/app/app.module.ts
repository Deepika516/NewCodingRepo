import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridTableComponent } from './components/grid-table/grid-table.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import{RoleDropDownComponent} from 'src/app/components/roledropdown/roledropdown.component'
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    AppComponent,
    GridTableComponent,
    RoleDropDownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
