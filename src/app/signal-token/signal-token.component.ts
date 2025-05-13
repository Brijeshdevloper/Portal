import { Component, OnInit } from '@angular/core';
import { SignalRServiceServiceTsService } from '../signal-rservice.service.ts.service';
import { SharedService } from '../shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
declare function showFModalFb(): any;
@Component({
  selector: 'app-signal-token',
  templateUrl: './signal-token.component.html',
  styleUrls: ['./signal-token.component.css']
})
export class SignalTokenComponent implements OnInit {
  currentDate: any;
  BranchName: any;
  SelectedServices: any;
  tokenData: any;
  AverageWait: any="00:08";
  showToken: boolean | undefined;
  Token_details: any;
  TokenId: any;
  customers: any;
  SignalTokenDetails: any;
  sounds :any[]=[]  ;
  BranchId: any;
  labelValues: { [key: string]: string } = {};
  captions: any;
  LanguageId: any;
  SelectedServiceCaption:any;
  constructor(
    private signalRService: SignalRServiceServiceTsService,
    private service: SharedService,
    private router: Router,
  
  ) {
    this.showToken = true;
    
    const tokenDetails = sessionStorage.getItem('TokenDetails');
    
    if (tokenDetails) {
      this.Token_details = tokenDetails ? JSON.parse(tokenDetails) : null;
      this.currentDate = this.Token_details.CurrentDate;
      this.BranchName = this.Token_details.BranchName;
      this.SelectedServices = this.Token_details.SelectedServices;
      this.tokenData = this.Token_details.tokenData;
      this.AverageWait = this.Token_details.AverageWait;
      this.TokenId = this.Token_details.TokenId;
      this.BranchId=this.Token_details.BranchId;
      this.SelectedServiceCaption=this.Token_details.SelectedServiceCaption;
    } else {
      this.router.navigate(['/Home']);
    }
    console.log("captiondetails",tokenDetails)
  }
  ngOnInit(): void {

    this.LanguageId = localStorage.getItem("LanguageId");

    
    let val = {
      LanguageId: this.LanguageId
    }
    // fuunction To Get Branch Details

    this.service.GetCaption(val).subscribe(data => {

      this.captions = data;
      this.captions.forEach((item: any) => {
        this.labelValues[item.Caption] = item.Value;
       
      });
    })

    // for Page Refresh
    const signalTokenDetails = sessionStorage.getItem("signalTokenDetails");
    this.SignalTokenDetails = signalTokenDetails ? JSON.parse(signalTokenDetails) : null;
    if (this.SignalTokenDetails) {
      let val={
        "TokenId":this.TokenId,
        "BranchID":this.BranchId
      }
      this.service.GetTokenDetail(val).subscribe(data => {
       // console.log("getToken",data);
        if (this.TokenId == data["Table"][0].TokenId && data["Table"][0].StatusId == "130") {
          const htmlElement = document.querySelector(".receipt .receipt-details") as HTMLElement;
          this.statusChange(htmlElement,'#50c878')
        }
      });
    }

    this.signalRService.isReconnecting$.subscribe(isReconnecting => {
      if (isReconnecting) {
        console.log("Reconnecting... Fetching data again.");
        this.fetchTokenDetails();
      }
    });

    // SignalR
    this.signalRService.messages$.subscribe((customers: any) => {
      this.customers = customers;
      sessionStorage.setItem("signalTokenDetails", JSON.stringify(customers));
      //console.log("Customers received in component:", this.customers);
      if (customers["tokenId"] == this.TokenId && customers["branchId"] == this.BranchId) {
       this.fetchTokenDetails();
      }
    });
  }

  fetchTokenDetails(){
    let val={
      "TokenId":this.TokenId,
      "BranchID":this.BranchId
    }
    this.service.GetTokenDetail(val).subscribe(data => {
      if(this.customers.status == data["Table"][0].StatusId){
        const htmlElement = document.querySelector(".receipt .receipt-details") as HTMLElement;
       // console.log("data",data);
        if (this.TokenId == data["Table"][0].TokenId && data["Table"][0].StatusId == "130") {
        // console.log("called")
          const CounterElement = document.querySelector(".receipt .receipt-details #counterText") as HTMLElement;
          CounterElement.innerHTML=`<div class="textAlign"> ${this.getValueForCaption("PleaseProceedto")}<br>${this.getValueForCaption("CounterNo")}-${this.customers.counterId}</br></div><h3><b>${this.getValueForCaption("ThankYou")}.</b></h3><h3><b>${this.getValueForCaption("ForYourPatienceWaiting")}</b></h3>`;
          console.log("brijes", CounterElement.innerHTML)
            //this.addSound(data["Table"][0].TokenNo,this.customers.counterId);
            let audio = new Audio('assets/Voices/tingtong.mp3');
            audio.play();
          // try{Notification.requestPermission().then(prem => {
          //   if (prem === "granted") {
          //     this.notify(`Token No-${data["Table"][0].TokenNo} is up next! Please head to the service counter.`)
          //   };
          // });}catch(ex){
          //   console.log("ex",ex);
          // }
          this.statusChange(htmlElement,'#50c878')
        } 
        else if (this.TokenId == data["Table"][0].TokenId && data["Table"][0].StatusId == "127") {
          let audio = new Audio('assets/Voices/tingtong.mp3');
          audio.play();
          this.statusChange(htmlElement,'white')
        }
        else if(this.TokenId == data["Table"][0].TokenId && data["Table"][0].StatusId == "129") {
          let audio = new Audio('assets/Voices/tingtong.mp3');
          audio.play();
          this.statusChange(htmlElement,'yellow');
        }
        else {
          let audio = new Audio('assets/Voices/tingtong.mp3');
          audio.play();
          // try{Notification.requestPermission().then(prem => {
          //   if (prem === "granted") {
          //     this.notify(`Token No-${data["Table"][0].TokenNo} has been closed. Thank you for your visit!`);
          //   };
          // });}catch(ex){
          //   console.log("ex",ex);
          // }
        
          let text = `<div class="text-center"><img id="logo" src="assets/images/logo.png" alt="COOP logo" style="width: 75%;"></div><br><br><div class="text-center"><h1>${this.getValueForCaption("ThankYou")}-${data["Table"][0].TokenNo} has been closed. Thank you for your visit!</h1></div>`;
          this.statusChange(htmlElement,'red',text);
          //sessionStorage.clear();
          sessionStorage.removeItem('TokenDetails');
          sessionStorage.removeItem('signalTokenDetails');

          setTimeout(() => {
            this.router.navigate(['/Home']);
            sessionStorage.setItem("Modal","true");
          }, 10000);
        }
      }
    });
  }
  notify(msg: any){
    new Notification(msg)
  }

  statusChange(htmlElement:any,color: any,text: any = null){
    if (htmlElement) {
      if(text){
        htmlElement.innerHTML = text;
      }
      htmlElement.style.backgroundColor = color;
    } else {
      console.error("Element not found");
    }
  }
  
audioIndex = 0;


addSound(TokenNumber: any, Counter: any) {
  this.sounds.push("assets/Voices/E/F/tingtong.mp3");
  this.sounds.push("assets/Voices/E/F/TokenNumber.mp3");
  this.sounds.push("assets/Voices/E/F/" + TokenNumber + ".mp3");
  this.sounds.push("assets/Voices/E/F/ProceedToCounterOld.mp3");
  this.sounds.push("assets/Voices/E/F/" + Counter + ".mp3");
  this.playSound();
}

playSound() {
  if (this.audioIndex < this.sounds.length) {
    console.log("this.audioIndex",this.audioIndex)
    let voice = this.sounds[this.audioIndex];
    let audio = new Audio(voice);

    // Check if it's the 'tingtong' sound and log TokenNumber if necessary
    if (voice === "assets/Voices/E/F/tingtong.mp3") {
      let k = this.audioIndex + 2;
      let tn = this.sounds[k];
      console.log("Playing TokenNumber sound after tingtong:", tn);
    }
    console.log("after Playing TokenNumber sound after tingtong:", this.sounds);

    // Play current audio
    audio.play();

    // Wait for the audio to end before playing the next sound
    audio.onended = () => {
      this.audioIndex++;
      this.playSound(); // Recursively call the method to play the next sound
    };
  } else {
    // Reset the audio index when all sounds have been played
    this.audioIndex = 0;
    this.sounds=[];
  }
}
getValueForCaption(caption: string): string {
  return this.labelValues[caption] || '';
}


}


