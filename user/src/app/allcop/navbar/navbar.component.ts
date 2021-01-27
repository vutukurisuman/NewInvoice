import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavbarComponent implements OnInit {
  public sidebarOpened = false;
  username: any;
  jstoday= '';
  today= new Date();
  toggleOffcanvas() {
    this.sidebarOpened = !this.sidebarOpened;
    if (this.sidebarOpened) {
      document.querySelector('.sidebar-offcanvas').classList.add('active');
    }
    else {
      document.querySelector('.sidebar-offcanvas').classList.remove('active');
    }
  }
  constructor(config: NgbDropdownConfig,private router:Router,private http: HttpService) {
    config.placement = 'bottom-right';
  }

  ngOnInit() {
    this.username= JSON.parse(localStorage.getItem("mail"));
  // console.log("res",(this.username.firstName));
  
  }
  logout(){
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
    let data={

      "email":this.username.email,
      "logouttime":this.jstoday
    }
    console.log("logout data",data);

    this.http.logoutdatabyid(data).subscribe(res=>{
      console.log("logout res",res);
      

    })
    localStorage.clear();
    this.router.navigate(['/users'], { replaceUrl: true });
  }
}
