import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { map } from 'rxjs/operators'


// Importing httpServices
import { HttpHeaders, HttpParams } from '@angular/common/http';
// import { HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url = 'http://localhost:4000/api/';
  private appurl = 'http://efficiencttech.com/';
  token: string;

  constructor(public http: HttpClient) { }


 
  public signupFunction(data): Observable<any> {

    const params = new HttpParams()
      .set('username', data.username)
      .set('usertype', data.usertype)
      .set('email', data.email)
      .set('password', data.password)

    return this.http.post(`${this.url}signup`, params);
  } // end of signup function


 
  public userList(): Observable<any> {
    const params = new HttpParams()
      .set('authToken', Cookie.get('authToken'));
    return this.http.post(`${this.url}userlist`, params);
  }

  // SIGN IN
  public signinFunction(data): Observable<any> {
    console.log("second"+ JSON.stringify(data))
    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);
      
    return this.http.post(`${this.url}login`, params);
  }
  // END OF SIGN IN

  public forgotPassword(data): Observable<any> {
    const params = new HttpParams()
      .set('url', this.appurl)
      .set('email', data.email);
    return this.http.post(`${this.url}forgot`, params);
  }

  public savePassword(data): Observable<any> {
    const params = new HttpParams()
      .set('password', data.password)
      .set('email', data.email);
    return this.http.post(`${this.url}savePassword`, params);
  }

  public setUserEvents(data): Observable<any> {
    const params = new HttpParams()
      .set('authToken', Cookie.get('authToken'))
      .set('events', JSON.stringify(data.events))
      .set('adminemail', data.adminemail)
      .set('adminId', data.adminId)
      .set('useremail', data.useremail)
      .set('userId', data.userId);
    return this.http.post(`${this.url}setuserEvents`, params);
  }

  public getUserEvents(data): Observable<any> {
    const params = new HttpParams()
      .set('authToken', Cookie.get('authToken'))
      .set('adminemail', data.adminemail)
      .set('useremail', data.useremail);
    // console.log(Cookie.get('authToken'));
    // console.log(params);
    return this.http.post(`${this.url}getuserEvents`, params);
  }

  public getOnlyUserEvents(data): Observable<any> {
    // console.log(data);
    const params = new HttpParams()
      .set('authToken', Cookie.get('authToken'))
      .set('userId', data.userId)
      .set('useremail', data.useremail);
    // console.log(params);
    return this.http.post(`${this.url}getOnlyUserEvents`, params);
  }

  public deleteUserEvents(data): Observable<any> {
    const params = new HttpParams()
      .set('authToken', Cookie.get('authToken'))
      .set('adminemail', data.adminemail)
      .set('useremail', data.useremail);
    return this.http.post(`${this.url}deleteuserEvents`, params);
  }

  public mail(userId, message): Observable<any> {
    const params = new HttpParams()
      .set('authToken', Cookie.get('authToken'))
      .set('userId', userId)
      .set('message', message);
      // console.log(params);
    return this.http.post(`${this.url}mail`, params);
  }

  public getUserInfoFromLocalstorage = () => {
    return JSON.parse(localStorage.getItem('userInfo')); // converting the JSON or String to Java Script Object
  }// end getUserInfoFromLocalstorage
  public setUserInfoInLocalStorage = (data) => {
    localStorage.setItem('userInfo', JSON.stringify(data)); // converting javaScript Object to JSON or String
  }

  public logout(): Observable<any> {
    localStorage.clear();
    const params = new HttpParams()
      .set('authToken', Cookie.get('authToken'))
      .set('userId', Cookie.get('receiverId'));
    // console.log(params);
    return this.http.post(`${this.url}logout`, params);

  } // end logout function

  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';

    if (err.error instanceof Error) {

      errorMessage = `An error occurred: ${err.error.message}`;

    } else {

      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;

    } // end condition *if

    console.error(errorMessage);

    return Observable.throw(errorMessage);

  }  // END handleError


  public assetFunction(data): Observable<any> {

    return this.http.post(`${this.url}Form`, data);

  } // end logout function

  public getassetFunction(): Observable<any> {
    console.log("in service")
    return this.http.get(`${this.url}getpo`);

  } // end logout function


  // new db

  public createclient(data): Observable<any> {
    return this.http.post(`${this.url}clientcre`,data);
  }

 
  public getclient(): Observable<any> {
  //  console.log("hsxjhbsh")
    return this.http.get(`${this.url}clientdetails`);
  }
  public postdetails(data): Observable<any> {
    return this.http.post(`${this.url}getdet`,data);
  }
  public invoice(data): Observable<any> {
    return this.http.post(`${this.url}alldata`,data);
  }
  public expense(data): Observable<any> {
    return this.http.post(`${this.url}alldatas`,data);
  }
  public getinvoice(): Observable<any> {
    return this.http.get(`${this.url}getinvoice`);
  }

  public postoption(data): Observable<any> {
    return this.http.post(`${this.url}updateoption`,data);
  }
  public postexpoption(data): Observable<any> {
    console.log("serv",data);
    
    return this.http.put(`${this.url}updateexpoption`,data);
  }
  public checkeddata(data): Observable<any> {
    return this.http.post(`${this.url}checked`,data);
  }
  public checkedexpdata(data): Observable<any> {
    return this.http.post(`${this.url}checkedexp`,data);
  }
  public getiddata(data): Observable<any> {
    return this.http.post(`${this.url}getidpdf`,data);
  }

  public gettitledata(data): Observable<any> {
    return this.http.post(`${this.url}gettitledata`,data);
  }
  public archive(data): Observable<any> {
    console.log("service",data);
    
    return this.http.post(`${this.url}toarchive`,data);
  }
  public archiveexp(data): Observable<any> {
    console.log("service",data);
    
    return this.http.post(`${this.url}toarchiveexp`,data);
  }
  public getactiveinvoice(data): Observable<any> {
    return this.http.post(`${this.url}getactiveinvoice`,data);
  }
  
  public getactiveexpenses(): Observable<any> {
    return this.http.get(`${this.url}getactiveexpenses`);
  }
  public getarchiveinvoice(data): Observable<any> {
    return this.http.post(`${this.url}getarchiveinvoice`,data);
  }
  public getarchiveexpense(data): Observable<any> {
    return this.http.post(`${this.url}getarchiveexpense`,data);
  }
  public getactivedata():Observable<any>{
    return this.http.get(`${this.url}getactivedata`,)
  }
  public postevent(data):Observable<any>{
    return this.http.post(`${this.url}postevent`,data)
  }
  public getevent():Observable<any>{
    return this.http.get(`${this.url}getevent`)
  }


  public tasknew(data): Observable<any> {
    return this.http.post(`${this.url}newtask`,data);
  }
  public getalltasks(): Observable<any> {
    return this.http.get(`${this.url}getalltasks`);
  }
  public complttask(): Observable<any> {
    return this.http.get(`${this.url}complttask`);
  }
  public getnewtask(): Observable<any> {
    return this.http.get(`${this.url}getnewtask`);
  }
  public editnew(data): Observable<any> {
    return this.http.post(`${this.url}editingdata`,data);
  }
  public deletenew(data): Observable<any> {
    return this.http.post(`${this.url}deletedata`,data);
  }

  public postfolders(data): Observable<any> {
    return this.http.post(`${this.url}postfolders`,data);
  }
  public getfolders(): Observable<any> {
    
    return this.http.get(`${this.url}getfolders`);
  }

  
 // sendfoldername
 public sendfoldername(data): Observable<any> {
  console.log("service",data)
  return this.http.post(`${this.url}sendfoldername`,data);
}
public sendifoldername(data): Observable<any> {
  console.log("service",data)
  return this.http.post(`${this.url}sendifoldername`,data);
}

///folderdata
public postfnamei(data): Observable<any>{
  return this.http.post(`${this.url}postfnamei`,data)
}
public postfnameexp(data): Observable<any>{
  return this.http.post(`${this.url}postfnameexp`,data)
}

//getdatatopdf
public getdatatopdf(data): Observable<any>{
  return this.http.post(`${this.url}getdatatopdf`,data)
}

//chart
public getarchiveonly(): Observable<any>{
  return this.http.get(`${this.url}getarchiveonly`)
}
public getactiveonly(): Observable<any>{
  return this.http.get(`${this.url}getactiveonly`)
}

public getarchiveddata(): Observable<any>{
  return this.http.get(`${this.url}getarchiveddata`)
}

//expmonth folder
public getmonthexp(data): Observable<any>{
  return this.http.post(`${this.url}getmonthexp`,data)
}
  
public quotationpost(data): Observable<any>{
  return this.http.post(`${this.url}quotpost`,data)
}

public getquotation(): Observable<any>{
  return this.http.get(`${this.url}getquotation`)
}
public getactivequotation(data): Observable<any>{
  return this.http.post(`${this.url}getactivequotation`,data)
}
public postquotoption(data): Observable<any>{
  return this.http.post(`${this.url}updatequotoption`,data)
}
public quotchecked(data): Observable<any>{
  return this.http.post(`${this.url}quotchecked`,data)
}
public quotarchonly():Observable<any>{
  return this.http.get(`${this.url}quotarchonly`)
}
public getalldata(data):Observable<any>{
  return this.http.post(`${this.url}getdata`,data)
}

public vendorpurchasedata(data):Observable<any>{
  return this.http.post(`${this.url}getvpurchasedata`,data)
}

public getquotdata(data):Observable<any>{
  return this.http.post(`${this.url}getquotdata`,data)
}

public purchasepost(data):Observable<any>{
  return this.http.post(`${this.url}purchasepost`,data)
}

public purchaseactive():Observable<any>{
  return this.http.get(`${this.url}purchaseactive`)
}

public purchasearchive():Observable<any>{
  return this.http.get(`${this.url}purchasearchive`)
}
public purchasechecked(data):Observable<any>{
  return this.http.post(`${this.url}purchasechecked`,data)
}
public postpurchaseoption(data):Observable<any>{
  return this.http.post(`${this.url}updatepurchaseoption`,data)
}

public allpurchaseorders():Observable<any>{
  return this.http.get(`${this.url}allpurchaseorders`)
}
public approvedquot(data):Observable<any>{
  return this.http.post(`${this.url}approvedquot`,data)
}

public apppurchaseorders(data):Observable<any>{
  return this.http.post(`${this.url}apppurchaseorders`,data)
}

public getdeliverydata(data):Observable<any>{
  return this.http.post(`${this.url}getdeliverydata`,data)
}



public deliverybyname(data):Observable<any>{
  return this.http.post(`${this.url}deliverybyname`,data)
}

public deliverypost(data):Observable<any>{
  return this.http.post(`${this.url}deliverypost`,data)
}
public alldeliverychaorders():Observable<any>{
  return this.http.get(`${this.url}alldeliverychaorders`)
}
public deliverychaactive():Observable<any>{
  return this.http.get(`${this.url}deliverychaactive`)
}
public deliverychaarchive():Observable<any>{
  return this.http.get(`${this.url}deliverychaarchive`)
}
public deliverychachecked(data):Observable<any>{
  return this.http.post(`${this.url}deliverychachecked`,data)
}
public updatedeliverychaoption(data):Observable<any>{
  return this.http.post(`${this.url}updatedeliverychaoption`,data)
}
public appdeliverychaorders(data):Observable<any>{
  return this.http.post(`${this.url}appdeliverychaorders`,data)
}
public pdfdata(data):Observable<any>{
  return this.http.post(`${this.url}pdfdata`,data)
}
//vendor
public createvendor(data): Observable<any> {
  return this.http.post(`${this.url}vendorcre`,data);
}

public getvendor(): Observable<any> {
  return this.http.get(`${this.url}vendordetails`);
}
public getvendorbyname(data): Observable<any> {
  return this.http.post(`${this.url}vendorgetdet`,data);
}
public getinvoicedata(data): Observable<any> {
  return this.http.post(`${this.url}getinvoicedata`,data);
}
public getpurchasedata(data): Observable<any> {
  return this.http.post(`${this.url}getpurchasedata`,data);
}
public getinvoicefolder(data): Observable<any> {
  return this.http.post(`${this.url}getinvoicefolder`,data);
}
public getpdeliverydata(data): Observable<any> {
  return this.http.post(`${this.url}getpdeliverydata`,data);
}
public register(data): Observable<any> {
  return this.http.post(`${this.url}register`,data);
}
public allemployes(): Observable<any> {
  return this.http.get(`${this.url}allemployes`);
}
public userProfile(data): Observable<any> {
  return this.http.post(`${this.url}userProfile`,data);
}
public getactiveuserquotation(data): Observable<any> {
  return this.http.post(`${this.url}getactiveuserquotation`,data);
}
public getarchiveuserquotation(data): Observable<any> {
  return this.http.post(`${this.url}getarchiveuserquotation`,data);
}
public getactiveuserdelivery(data): Observable<any> {
  return this.http.post(`${this.url}getactiveuserdelivery`,data);
}
public getarchiveuserdelivery(data): Observable<any> {
  return this.http.post(`${this.url}getarchiveuserdelivery`,data);
}
public getactiveuserinvoice(data): Observable<any> {
  return this.http.post(`${this.url}getactiveuserinvoice`,data);
}
public getarchiveuserinvoice(data): Observable<any> {
  return this.http.post(`${this.url}getarchiveuserinvoice`,data);
}
public getinvoicefolderuser(data): Observable<any> {
  return this.http.post(`${this.url}getinvoicefolderuser`,data);
}
public getquotationfolderuser(data): Observable<any> {
  return this.http.post(`${this.url}getquotationfolderuser`,data);
}
public getdeliveryfolderuser(data): Observable<any> {
  return this.http.post(`${this.url}getdeliveryfolderuser`,data);
}
public logindata(data): Observable<any> {
  return this.http.post(`${this.url}logindata`,data);
}
public logoutdatabyid(data): Observable<any> {
  return this.http.post(`${this.url}logoutdatabyid`,data);
}
//get ip
public getIPAddress()
{
  return this.http.get("http://api.ipify.org/?format=json");
}
public newmessage(data): Observable<any> {
  return this.http.post(`${this.url}newmessage`,data);
}
public particularmessage(data): Observable<any> {
  return this.http.post(`${this.url}particularmessage`,data);
}
public messagepush(data): Observable<any> {
  return this.http.post(`${this.url}messagepush`,data);
}
public updateclientlength(data): Observable<any> {
  return this.http.post(`${this.url}updateclientlength`,data);
}
public clientquots(data): Observable<any> {
  return this.http.post(`${this.url}clientquots`,data);
}
public updatedchallanlength(data): Observable<any> {
  return this.http.post(`${this.url}updatedchallanlength`,data);
}
public updateinvoicelength(data): Observable<any> {
  return this.http.post(`${this.url}updateinvoicelength`,data);
}

public clientDchallan(data): Observable<any> {
  return this.http.post(`${this.url}clientDchallan`,data);
}
public clientInvoice(data): Observable<any> {
  return this.http.post(`${this.url}clientInvoice`,data);
}















}
   

