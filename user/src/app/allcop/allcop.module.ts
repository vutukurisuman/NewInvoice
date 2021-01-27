import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllcopRoutingModule } from './allcop-routing.module';
import { AllcopComponent } from './allcop.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsComponent } from './forms/forms.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { TablesComponent } from './tables/tables.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { AlertsComponent } from './alerts/alerts.component';
import { AccordionsComponent } from './accordions/accordions.component';
import { BadgesComponent } from './badges/badges.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { PaginationComponent } from './pagination/pagination.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { CarouselComponent } from './carousel/carousel.component';
import { TabsComponent } from './tabs/tabs.component';
import { NewinvoiceComponent } from './newinvoice/newinvoice.component';
import { FoldersComponent } from './folders/folders.component';
import { PdfsComponent } from './pdfs/pdfs.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { ExpensesListComponent } from './expenses-list/expenses-list.component';
import { PreviewExpensesComponent } from './preview-expenses/preview-expenses.component';
import { FilterpipePipe } from '../filterpipe.pipe';
import { AlldataComponent } from './alldata/alldata.component';
import { PurchaseorderComponent } from './purchaseorder/purchaseorder.component';
import { PurchaseorderlistComponent } from './purchaseorderlist/purchaseorderlist.component';
import { DeliveryChallanComponent } from './delivery-challan/delivery-challan.component';
import { DeliveryChallanlistComponent } from './delivery-challanlist/delivery-challanlist.component';
import { VendorsComponent } from './vendors/vendors.component';
import { VendorformComponent } from './vendorform/vendorform.component';
import { VendorsfolderComponent } from './vendorsfolder/vendorsfolder.component';
import { VendetailsfolderComponent } from './vendetailsfolder/vendetailsfolder.component';
import { VendorpurchaselistComponent } from './vendorpurchaselist/vendorpurchaselist.component';
import { PurchasefolderComponent } from './purchasefolder/purchasefolder.component';
import { DeliveryfolderComponent } from './deliveryfolder/deliveryfolder.component';
import { FolderinvoiceComponent } from './folderinvoice/folderinvoice.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgDatepickerModule } from 'ng2-datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { HttpClientModule } from '@angular/common/http';
import { DataTableModule } from 'angular-6-datatable';
import { TasksComponent } from './tasks/tasks.component';
import { FolderdataComponent } from './folderdata/folderdata.component';
import { FoldertopdfComponent } from './foldertopdf/foldertopdf.component';
import { ClientfolderComponent } from './clientfolder/clientfolder.component';
import { InvoicefolderComponent } from './invoicefolder/invoicefolder.component';
import { ExpensefolderComponent } from './expensefolder/expensefolder.component';
import { ExpmonthfolderComponent } from './expmonthfolder/expmonthfolder.component';
import { MonthexpenseComponent } from './monthexpense/monthexpense.component';
import { QuotationComponent } from './quotation/quotation.component';
import { QuotationlistComponent } from './quotationlist/quotationlist.component';
import { ClientslistComponent } from './clientslist/clientslist.component';
import { MessageComponent } from './message/message.component';


@NgModule({
  declarations: [AllcopComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    FormsComponent,
    ButtonsComponent,
    TablesComponent,
    TypographyComponent,
    IconsComponent,
    AlertsComponent,
    AccordionsComponent,
    BadgesComponent,
    ProgressbarComponent,
    BreadcrumbsComponent,
    PaginationComponent,
    DropdownComponent,
    TooltipsComponent,
    CarouselComponent,
    TabsComponent,
    NewinvoiceComponent,
    FoldersComponent,
    PdfsComponent,
    ExpensesComponent,
    ExpensesListComponent,
    PreviewExpensesComponent,
    TasksComponent,
    FolderdataComponent,FoldertopdfComponent,ClientfolderComponent,InvoicefolderComponent,ExpensefolderComponent,
    FilterpipePipe, AlldataComponent, PurchaseorderComponent, PurchaseorderlistComponent, DeliveryChallanComponent, DeliveryChallanlistComponent, VendorsComponent, VendorformComponent, VendorsfolderComponent, VendetailsfolderComponent, VendorpurchaselistComponent, PurchasefolderComponent, DeliveryfolderComponent, FolderinvoiceComponent,
    ExpmonthfolderComponent,MonthexpenseComponent,QuotationComponent,QuotationlistComponent,ClientslistComponent, MessageComponent
  ],
  imports: [
    CommonModule,
    AllcopRoutingModule,
   
    
    FormsModule,
    NgbModule,
    NgDatepickerModule,
    
    ReactiveFormsModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
   
    CalendarModule,
    DataTableModule,
  ]
})
export class AllcopModule { }
