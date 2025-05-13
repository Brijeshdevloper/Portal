import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AppConfig } from '../../config/app-config';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private service: SharedService, private router: Router, appConfig: AppConfig, private activatedRoute: ActivatedRoute) {
    //  this.BranchID = appConfig.branchID
    this.BranchID = this.service.Branchid;
    // alert(this.BranchID);
  }


  datePipe: DatePipe = new DatePipe('en-US');
  currentDate: Date = new Date();
  // ngOnInit() {
  //   setInterval(() => {
  //     this.currentDate = new Date();
  //   }, 1000);
  // }


  Language: any;
  BranchID: any;
  dynamicBranchID: any;
  Services: any;
  showLanguage = true;
  HomeServices: any[] = [];
  isConventional(): boolean {
    return this.HomeServices.some(service => service.ParentServiceName === 'Conventional');
  }
  isAlhuda(): boolean {
    return this.HomeServices.some(service => service.ParentServiceName === 'Coop Alhuda');
  }
  ngOnInit(): void {
    localStorage.setItem("BranchId", this.BranchID);
    // });
    this.activatedRoute.paramMap.subscribe(params => {
      let branchid = params.get('id') || "";
      const secretKey = "SmartBranchDae";
      branchid = decodeURIComponent(branchid)
      const decryptedBranchId = branchid
        ? parseInt(CryptoJS.AES.decrypt(branchid, secretKey).toString(CryptoJS.enc.Utf8))
        : 0;
      if (branchid) {
        this.dynamicBranchID = decryptedBranchId;
        localStorage.setItem("BranchId", this.dynamicBranchID);
      }
      //this.dynamicBranchID= decryptedBranchId;
      // let decrypt = CryptoJS.AES.decrypt(branchid, secretKey)
      // let decryptedBranchId = 0;
      // console.log("decrpt 1",decrypt);
      // if(decrypt){
      //   decryptedBranchId = parseInt(decrypt.toString(CryptoJS.enc.Utf8));
      // }
      // console.log("decryptedBranchId",decryptedBranchId);

      let vals = {
        "BranchID": decryptedBranchId
      }

      this.service.GetApiUrl(vals).subscribe(data => {
        if (data && data.length > 0) {
          this.service.APIURL = data[0]["APIURL"];
          sessionStorage.setItem("apiurl", data[0]["APIURL"])
          this.getLanguage();
        }
        else {
          sessionStorage.removeItem('apiurl');
        }
      })
    })

    let apiurl = sessionStorage.getItem("apiurl")
    if (apiurl) {
      this.service.APIURL = apiurl;
    }
    this.getLanguage();
    //Set  default language English
    // localStorage.setItem("LanguageId", "1");

    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);

    this.service.currentHomeServices.subscribe(HomeServices => {
      this.HomeServices = HomeServices;

      if (this.HomeServices.length > 0) {

      }
    });

  }

  getLanguage() {

    var val = {};
    this.service.GetLanguage(val).subscribe(data => {
      if (data["Body"]["GetLanguagesResult"]["TokenScreenLanguages"]["Languages"]) {
        this.Language = data["Body"]["GetLanguagesResult"]["TokenScreenLanguages"]["Languages"];
        // 

      }
    })
  }

  getServices(language: any) {
    // 

    localStorage.setItem("LanguageId", language.LanguageID);
    // location.reload();
    // alert('mayur');
    const currentUrl = this.router.url;
    //  
    if (currentUrl == '/Home') {
      this.router.navigate(['/Homes']);
    }
    else {
      this.router.navigate(['/Home']);
    }
    // this.router.navigate([currentUrl],{ skipLocationChange: false });
    // this.router.navigate(['/Home'],navigationExtras);
    // let val = {
    //   ParentService: "",
    //   IsBack: false,
    //   BranchID: this.BranchID,
    //   LaguageID: language.LanguageID
    // }
    // this.getChildServices(val);
  }

  getChildServices(val: any) {

    this.service.GetChildServices(val).subscribe(data => {


      if (data["Body"]["GetChildServicesResult"]["GetChildServices"]["Service"]) {
        this.showLanguage = false;
        var Services = data["Body"]["GetChildServicesResult"]["GetChildServices"]["Service"];


        this.Services = this.modifyPropertyNames(Services);


      }
    })
  }

  modifyPropertyNames(data: any[]): any[] {
    return data.map((item) => {
      const newItem: { [key: string]: any } = {};
      for (const key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
          const newKey = key.replace('@', '');
          newItem[newKey] = item[key];
        }
      }
      return newItem;
    });
  }

  ParentBack() {
    // localStorage.setItem("LanguageId", language.LanguageID);
    // location.reload();
    // alert('mayur');
    const currentUrl = this.router.url;
    //  
    if (currentUrl == '/Home') {
      this.router.navigate(['/Homes']);
    }
    else {
      this.router.navigate(['/Home']);
    }
  }

}
