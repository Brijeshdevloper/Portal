  import { Component,OnInit } from '@angular/core';
  import { SharedService } from 'src/app/shared.service';
  import { ActivatedRoute, Router } from '@angular/router';



  @Component({
    selector: 'app-language',
    templateUrl: './language.component.html',
    styleUrls: ['./language.component.css']
  })

  
  export class LanguageComponent {

    constructor(private service: SharedService,private router: Router,private activatedRoute: ActivatedRoute){}
    // selectedLanguage: any;

    Language:any;
    BranchID:any = 190;
    Services:any;
    showLanguage = true;
    ngOnInit(): void {
      // localStorage.setItem("BranchId", this.BranchID);
      // this.activatedRoute.paramMap.subscribe(params =>{
      //   const branchid=params.get('id');
      //   const secretKey="SmartBranchDae";
      //   const decryptedBranchId = CryptoJS.AES.decrypt(branchid!, secretKey).toString(CryptoJS.enc.Utf8);
      //   localStorage.setItem("BranchId", decryptedBranchId);
      //   let vals = {
      //     "BranchID" : decryptedBranchId 
      //   }
    
      //   this.service.GetApiUrl(vals).subscribe(data => {    
      //     this.service.APIURL = data[0]["APIURL"]
      //   }
      // )});

      this.getLanguage()
    }

    getLanguage(){
      var val = {};
      this.service.GetLanguage(val).subscribe(data => {     
        if(data["Body"]["GetLanguagesResult"]["TokenScreenLanguages"]["Languages"]){
          this.Language = data["Body"]["GetLanguagesResult"]["TokenScreenLanguages"]["Languages"];
          // 
        }
      })
    }

  //   getLanguage() {
  //     var val = {};
  //     this.service.GetLanguage(val).subscribe(data => {     
  //         if(data["Body"]["GetLanguagesResult"]["TokenScreenLanguages"]["Languages"]){
  //             this.Language = data["Body"]["GetLanguagesResult"]["TokenScreenLanguages"]["Languages"];
  //             // If no language is selected, set English as default
  //             if (!this.selectedLanguage) {
  //                 this.selectedLanguage = this.Language.find((lang: Language) => lang.LanguageID === 1);
  //                 // Call the function to get services based on the default language
  //                 this.getServices(this.selectedLanguage);
  //             }
  //         }
  //     })
  // }
  

    getServices(language:any){
      

      localStorage.setItem("LanguageId", language.LanguageID);
      

      this.router.navigate(['/Home']);
      // let val = {
      //   ParentService: "",
      //   IsBack: false,
      //   BranchID: this.BranchID,
      //   LaguageID: language.LanguageID
      // }
      // this.getChildServices(val);
    }

    getChildServices(val:any){
      
      this.service.GetChildServices(val).subscribe(data => {     
        

        if(data["Body"]["GetChildServicesResult"]["GetChildServices"]["Service"]){
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
  }
