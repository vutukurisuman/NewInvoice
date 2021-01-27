import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllcopComponent } from './allcop.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsComponent } from './forms/forms.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { TablesComponent } from './tables/tables.component';
import { IconsComponent } from './icons/icons.component';
import { TypographyComponent } from './typography/typography.component';
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
import { MessageComponent } from './message/message.component';

const routes: Routes = [

{ path: '', component: AllcopComponent ,
  children:[
    { path: '', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent },

    { path: 'forms', component: FormsComponent },
    { path: 'buttons', component: ButtonsComponent },
    { path: 'tables', component: TablesComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'alerts', component: AlertsComponent },
    { path: 'accordions', component: AccordionsComponent },
    { path: 'badges', component: BadgesComponent },
    { path: 'progressbar', component: ProgressbarComponent },
    { path: 'breadcrumbs', component: BreadcrumbsComponent },
    { path: 'pagination', component: PaginationComponent },
    { path: 'dropdowns', component: DropdownComponent },
    { path: 'tooltips', component: TooltipsComponent },
    { path: 'carousel', component: CarouselComponent },
    { path: 'tabs', component: TabsComponent },
    { path: 'newinvoice', component: NewinvoiceComponent },
    { path: 'folders', component: FoldersComponent },
    { path: 'pdfs', component: PdfsComponent },
    { path: 'expenses', component:ExpensesComponent},
    { path: 'list',component:ExpensesListComponent},
    { path: 'preview/expenses', component:PreviewExpensesComponent},
    { path: 'tasks', component: TasksComponent },
    { path: 'folderdata', component:FolderdataComponent},
    { path: 'foldertopdf', component:FoldertopdfComponent},
    { path: 'clientfolder', component:ClientfolderComponent},
    { path: 'invoicefolder', component:InvoicefolderComponent},
    { path: 'expensefolder', component:ExpensefolderComponent},
    { path: 'expmonthfolder', component:ExpmonthfolderComponent},
    { path: 'monthexpense', component:MonthexpenseComponent},
    { path: 'quotation', component:QuotationComponent},
    { path: 'quotationlist', component:QuotationlistComponent},
    { path: 'clientlist', component:ClientslistComponent},
    { path: 'alldata', component:AlldataComponent},
    { path: 'purchaseorder', component:PurchaseorderComponent},
    { path: 'purchaseorderllist', component:PurchaseorderlistComponent},
    { path: 'delivery-challan', component:DeliveryChallanComponent},
    { path: 'delivery-challanlist', component:DeliveryChallanlistComponent},
    { path: 'vendors', component:VendorsComponent},
    { path: 'vendorregform', component:VendorformComponent},
    { path: 'venfolder', component:VendorsfolderComponent},
    { path: 'vdetailsfolder', component:VendetailsfolderComponent},
    { path: 'vpurchaselist', component:VendorpurchaselistComponent},
    
    { path: 'purchasefolder', component:PurchasefolderComponent},
    { path: 'deliveryfolder', component:DeliveryfolderComponent},
    { path: 'folderinvoice', component:FolderinvoiceComponent},
    { path: 'message', component:MessageComponent},
    
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllcopRoutingModule { }
