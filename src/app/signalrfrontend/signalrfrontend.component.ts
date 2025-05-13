import { SignalRServiceServiceTsService } from '../signal-rservice.service.ts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, HostListener,ViewChild } from '@angular/core';
import { Renderer2, ElementRef, ViewChildren, QueryList, AfterViewInit, Directive, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators, FormControl, NgControl } from '@angular/forms';
import { SharedService } from 'src/app/shared.service';
import { DatePipe } from '@angular/common';
import { elementAt } from 'rxjs';
import SignaturePad from 'signature_pad';
import * as CryptoJS from 'crypto-js';


declare function showModal(): any;
declare function showSecondModal(): any;
declare function hideFModal(): any;
declare function hideSecondModal(): any;
declare function hideFirstModalFT(): any;
declare function showSecondModalFT(): any;
declare function hideSecondModalFT(): any;
declare function showThirdModalFT(): any;
declare function hideThirdModalFT(): any;
declare function showFModal(): any;
declare function showFirstModal(): any;
declare function hideFirstModal(): any;
declare function showFirstModalFT(): any;
declare function showFirstModalCP(): any;
declare function hideFirstModalCP(): any;
declare function showFirstModalFeedbackComplains(): any;
declare function hideModalFeedbackComplains(): any;
declare function showFCashWModal(): any;
declare function hideFCashWModal(): any;
declare function showSecondCashWModal(): any;
declare function hideSecondCashWModal(): any;
declare function showFCashDModal(): any;
declare function hideFCashDModal(): any;

declare function showSecondCashDModal(): any;
declare function hideSecondCashDModal(): any;

declare function showNewCardOTPModal(): any;
declare function hideNewCardOTPModal(): any;

declare function showPaymentProcessModal1(): any;
declare function hidePaymentProcessModal1(): any;
declare function showPaymentProcessModal2(): any;
declare function hidePaymentProcessModal2(): any;
declare function showPaymentProcessModal3(): any;
declare function hidePaymentProcessModal3(): any;
declare function showPaymentProcessModal4(): any;

declare function showChequeProcessModal1(): any;
declare function hideChequeProcessModal1(): any;
declare function showChequeProcessModal2(): any;
declare function hideChequeProcessModal2(): any;
declare function showChequeProcessModal3(): any;
declare function hideChequeProcessModal3(): any;
declare function showChequeProcessModal4(): any;
declare function hideChequeProcessModal4(): any;
// -----------------------------------------------airline modal ends---------------------------------------
declare function showFBillpaymentModal(): any;
declare function hideFBillpaymentModal(): any;
declare function showSecondBillpaymentModal(): any;
declare function hideSecondBillpaymentModal(): any;
declare function showThirdBillpaymentModal(): any;
declare function hideThirdBillpaymentModal(): any;
declare function showFourthBillpaymentModal(): any;
declare function hideFourthBillpaymentModal(): any;
declare function showFifthBillpaymentModal(): any;
declare function hideFifthBillpaymentModal(): any;
// ------------------------------------------------airline modal ends-----------------------------------------------
declare function showFMobileWalletModal(): any;
declare function hideFMobileWalletModal(): any;

declare function showFModalFb(): any;
declare function hideFModalFb(): any;
declare function showSecondModalFb(): any;
declare function hideSecondModalFb(): any;
declare function showFirstTelebirrModal(): any;
declare function hideFirstTelebirrModal(): any;
declare function showSecondTelebirrModal(): any;
declare function hideSecondTelebirrModal(): any;
// ------------------------------------------------------Telebirr------------------------------------
declare function showFirstTelebirrModal(): any;
declare function hideFirstTelebirrModal(): any;
declare function showSecondTelebirrModal(): any;
declare function hideSecondTelebirrModal(): any;
// ------------------------------------------------------Telebirr------------------------------------

// ------------------------------------------------------New Card------------------------------------
declare function showNewCardModal(): any;
declare function hideNewCardModal(): any;
declare function showNewCardSuceessModal(): any;
declare function hideNewCardSuceessModal(): any;
// ------------------------------------------------------New Card------------------------------------

// ------------------------------------------------------Open An Account------------------------------------
declare function showopenAnAccountModalPersonalInformation(): any;
declare function hideopenAnAccountModalPersonalInformation(): any;

declare function showopenAnAccountModalContactInformation(): any;
declare function hideopenAnAccountModalContactInformation(): any;

declare function showopenAnAccountModalFinancialInfromation(): any;
declare function hideopenAnAccountModalFinancialInfromation(): any;

declare function showopenAnAccountModalSignaturePad(): any;
declare function hideopenAnAccountModalSignaturePad(): any;
@Component({
  selector: 'app-signalrfrontend',
  templateUrl: './signalrfrontend.component.html',
  styleUrls: ['./signalrfrontend.component.css']
})
export class SignalrfrontendComponent  implements OnInit {
  customers: any[] = [];
  signatureNeeded!: boolean;
  signaturePad!: SignaturePad;
  @ViewChild('canvas') canvasEl!: ElementRef;
  signatureImg!: string;

  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
  }

  isFieldsDisabled: boolean = true;
  constructor(
    // private signalRService: SignalRServiceServiceTsService,
    private activatedRoute: ActivatedRoute ,
    private router: Router, 
    private formBuilder: FormBuilder, private formBuilderPersonalInformation: FormBuilder,
    private formBuilderContactInformation: FormBuilder, private formBuilderFinancialInformation: FormBuilder,
    private formBuilderFT: FormBuilder, private formBuilderFTOTP: FormBuilder,
    private formBuilderft2: FormBuilder, private formBuilderft4: FormBuilder,
    private formBuilderAL: FormBuilder, private formBuilderTB1: FormBuilder,
    private formBuilderTB4: FormBuilder,
    private formBuilder2: FormBuilder, private formBuilder3: FormBuilder,
    private formBuilder4: FormBuilder, private formBuilder5: FormBuilder,
    private formBuilder2ndCW: FormBuilder, private formBuilderCD3: FormBuilder,
    private formBuilderNewCard: FormBuilder,
    private formBuilderCD: FormBuilder, private formBuilder15Account: FormBuilder,
    private formBuilder15: FormBuilder,
    private formBuilder6: FormBuilder, private formBuilder7: FormBuilder,
    private formBuilderCPOTP: FormBuilder, private formBuilder8: FormBuilder,
    private formBuilder11: FormBuilder, private formBuilder12: FormBuilder,
    private formBuilder13: FormBuilder, private fb: FormBuilder, private ALAccSumm: FormBuilder,

    private service: SharedService
    
  ) { this.createForm(); }
    private timeoutId: any;
    private timeoutCD: any;
    private timeoutFT: any;
    private timeoutGT: any;
    private timeoutAL1: any;
    private timeoutAL2: any;
    private timeoutTB1: any;
    private timeoutTB2: any;
    private timeoutMS: any;

  otpinvalid: any = false;
  newCardError: any = false;
  AverageWait: any;
  FeedbackActive: any;
  GPriorityID = 211;
  PaymentProcessTab = "";
  BenificiaryNamePP: any = '';
  branchDetails: any;
  selectedRating: number = 0;
  dataList: any = [];
  FeedbackResponse: any;
  SelectedServiceCaption:any;
  Language: any;
  BranchID: any;
  BranchName = '';
  TokenId: any;
  CounterId: any;
  LanguageId: any;
  UserID: any;
  Services: any;
  showLanguage = true;
  SelectedService: any;
  SelectedServices: string = '';
  SelectedServicesID = '';
  SelectedTokenID = '';
  ministatementList: any[] = [];
  failureStatus: any[] = [];
  failureStatus1: boolean = false
  failureStatus2 = false;
  CurrentBalanceAL: any;
  CurrentBalanceMS: any;
  CurrentBalanceMS2: any;
  failure: any[] = [];
  showContent = false;
  policyNumber: any = '';
  decryptedBranchId:any;
  //<--payment process------------------->
  submitted11 = false;
  submitted12 = false;
  submitted13 = false;
  showPPOTP: boolean = false;
  errorMessage12: any;
  errorMessagecTB: any;
  errorMessagecTB1: any;
  errorMessagecd: any;
  errorMessagecAl1: any;
  errorMessageCW: any;
  errorMessagecW: any;
  errorMessageMP: any;
  errorMessagecW1: any;
  errorMessageFB: any;
  showPPToken: boolean = false;
  errorMessagePP7: any;
  tokenDataPP: any;
  PPotpValue: any;
  PPFirstOTP: any;
  PPSecondOTP: any;
  PPThirdOTP: any;
  PPFourthOTP: any;
  BBcriteriaValue: any;
  //<--payment process ended------------------->

  //<--chequeprocessfeilds------------------->
  MobileNumber: any = '';
  CheaqueBook: any = '';
  CheaqueLeaf: any = '';
  CheaqueBookAddress: any = '';
  showCPOTP: boolean = false;
  showOTP: boolean = false;
  showOTPAL: boolean = false;
  showOTPFT: boolean = false;
  CPFirstOTP: any;
  CPSecondOTP: any;
  CPThirdOTP: any;
  CPFourthOTP: any;
  showCPToken: boolean = false;
  CPotpValue: any;
  showLeafErrorMessage = false;
  showBookErrorMessage = false;
  errorMessageCP7: any;
  submitted7 = false;
  submitted8 = false;
  submitted9 = false;
  tokenDataCP: any;
  //<--cheque process ended------------------->

  showOTPCashWithdrawl: boolean = false;
  showOTPCashDeposit: boolean = false;
  otpValue: any;
  otpvalue: any;
  xyz: any;
  ModalTitle: any;
  showModalStatus: any;
  pinChangeMode = false;
  newPin: string = '';
  confirmPin: string = '';
  TXNREF: any;
  DATE: any;
  DESC: any;
  DRAMT: any;
  CRAMT: any;
  operand: any;
  criteriaValue: any;
  criteriaAmount: any;
  columnName: any;
  submitted = false;
  submittedFT = false;
  showSpinner: boolean = false;
  errorMessage: any;
  errorMessage5: any;
  errorMessage1: any;
  errorMessage2: any;
  errorMessage9: any;
  errorMessageAL: any;
  errorMessageAL1: any;
  errorMessageAL3: any;
  errorMessageaL: any;
  errorMessagecW2: any;
  errorMessageFT2: any;
  errorMessageFT4: any;
  errorMessagefT1: any;
  errorMessagefT2: any;
  errorMessageTB: any;
  errorMessagetB: any;
  errorMessageTB1: any;
  errorMessagetB2: any;
  errorMessageTB2: any;
  errorMessageTB3: any;

  errorMessageAL5: any;
  errorMessageAL6: any;
  errorMessageMS2: any;
  errorMessagems: any;
  errorMessagemS: any;
  errorMessageFT5: any;
  errorMessageAL2: any;
  errorMessageft: any;
  errorMessageFTA: any;
  errorMessagePNR: any;
  AirlineAmount1: any;
  AirlineNameACC: any;

  FirstOtp: any;
  SecondOtp: any;
  ThirdOtp: any;
  FourOtp: any;
  //-------------------------->
  FirstOTP: any;
  SecondOTP: any;
  ThirdOTP: any;
  FourOTP: any;
  ID: any;
  transactionData: any;
  tokenData: any;
  tokenData1: any;
  tokenData2: any;
  tokenIdforupdate: any;
  submittedMS = false;
  submitted2 = false;
  submitted3 = false;
  submittedAL = false;
  submitted4 = false;
  submitted5 = false;
  submitted2ndCW = false;
  submittedCD = false;
  submitted6 = false;
  submittedCD2 = false;
  submittedCD3 = false;
  submittedNewCard = false;
  submitted15 = false;
  submitted15Account = false;
  CreditNarrative: any;
  DebitAccount: any;
  CreditAccount: any;
  CreditAmount: any;
  dataItem: any;
  CustomerName: any;
  CustomerNameCW: any;
  CustomerNameSenderFT: any;
  NameCD: any;
  value: any;

  AmountCW: any;
  CustomerNameCD: any;
  DepositerBy: any;
  CustomerNameFT: any;
  AlCustomerNameAcc: any;
  CustomerNameALAcc: any;
  CurrentBalanceCW: any;
  CurrentBalanceFT: any;
  maskedAccountNumber: string = '';
  actualAccountNumber: string = '';
  actualMobileNumber: string = '';
  maskedMobileNumber: string = '';
  maskedAccountNumber1: string = '';
  actualAccountNumber1: string = '';
  actualMobileNumber1: string = '';
  maskedMobileNumber1: string = '';
  showToken: boolean = false;
  showToken1: boolean = false;
  showToken2: boolean = false;
  showToken3: boolean = false;
  showToken3Account: boolean = false;
  formSubmittedAirline = false;
  formsubmittedAl1 = false;
  showSuggetion1 = false;
  Verify: any;
  ShowFeedback: boolean = false;

  AmountWithdrawlorDeposit: any;
  // billPayment
  showAccountDiv = false;
  ShowCashdiv = true;
  transactionType1: string = 'Cash';
  // transactionType1: any;
  transactionType2: any;
  transactionTypeFS: any;
  transactionTypeFS2: any;
  AirlinesName: any;
  Passengername: any;
  amount: any;
  Amount: any;
  PNR: any;
  AccountID: any;
  Airlines: any;
  Passenger: any;
  AccountId: any;
  AccountIdCW: any;
  PhoneNumber: any;
  PhoneNumberformFT: any;
  lastTwoDigit: any;
  PhoneNumberformAL: any;
  selectedTransactionType1: string = '';
  selectedTransactionType2: string = '';
  selectedTransactionTypeFS: string = '';
  selectedTransactionTypeFS2: string = '';

  AirlineOrderdetail: any[] = [];
  AirlineName: any;
  AirlineAmount: any;
  AirlineAmountCash: any
  failureStatus1AL: any;
  failureStatus2AL: any;
  // acceptTransactionDigitally: boolean = false;
  // --------------------------------------fundtransfer--------------------------------
  FirstOTPFT: any;
  SecondOTPFT: any;
  ThirdOTPFT: any;
  FourOTPFT: any;

  submittedFT2 = false;
  submittedFt2 = false;
  submittedFt3 = false;
  submittedFt4 = false;
  showFTSuccess = false;
  formSubmitted = false;
  fromAccountToAccoutError = false;

  CreditNarrativeft1: any;
  DebitAccountft1: any;
  CreditAccountft1: any;
  CreditAmountft1: any;
  transactionDataft1: any;

  formALCash!: FormGroup;
  // ----------------------------------end fund transfer----------------------------------------

  //-------------------------------------- Telebirr------------------------------------------------
  submittedTB2 = false;
  showTBSuccess = false;
  errorMessageFT3: any;
  CreditAccountTB1: any;
  MobileNumberTB1: any;
  CreditAmountTB2: any;
  submittedTB1 = false;
  CustomerNameTB1: any;
  CustomerNameTB: any;
  transactionTypeSelf: any;
  selectedtransactionTypeSelf: any
  CurrentBalanceTB: any;
  selectedTransactionType: string = '';
  // ---------------------------------------------Telebirr end----------------------------------------------------
  CustomerNameOtherTB1: any;
  CreditAccountOtherTB: any;
  MobileNumberOtherTB1: any;
  CreditAmountTB3: any;
  CustomerNameOtherTB2: any;
  showTBSuccess1 = false;
  isParentServiceClicked: boolean = false;

  CurrentBalanceTB1: any;

  submittedTB3 = false;
  submittedTB4 = false;
  submittedTB5 = false;

  LastName: any;
  MiddleName: any;
  FirstName: any;
  Identifier: any;
  MobileNumberOtherTB: any;
  //------------------------------------------------- Telebirr Other start-----------------------------------------

  // ---------------------------------------------------- feedback start-------------------------------------------
  feedback: any;
  name: any;
  // ---------------------------------------------------------feedback end--------------------------------------------------


  // --------------------------------------------------------- Open Account -----------------------------------------------

  // Personal Information
  submittedPersonalInformation = false;

  formPersonalInformation: FormGroup = new FormGroup({
      fullName: new FormControl(''),
      surName: new FormControl(''),
      motherName: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      gender: new FormControl(''),
  })

  get fPersonalInformation(): { [key: string]: AbstractControl } {
    return this.formPersonalInformation.controls;
  }

  // Contact Information  
  submittedContactInformation = false;

  formContactInformation: FormGroup = new FormGroup({
      streetAddress: new FormControl(''),
      country: new FormControl(''),
      stateProvince: new FormControl(''),
      city: new FormControl(''),
      zipCode: new FormControl(''),            
  })

  get fContactInformation(): { [key: string]: AbstractControl } {
    return this.formContactInformation.controls;
  }

  //Financial Information
  submittedFinancialInformation = false;

  formFinancialInformation: FormGroup = new FormGroup({
      occupation: new FormControl(''),
      currency: new FormControl(''),
      initialDeposit: new FormControl(''),
      monthlyIncome: new FormControl('')             
  })

  get fFinancialInformation(): { [key: string]: AbstractControl } {
    return this.formFinancialInformation.controls;
  }

  // --------------------------------------------------------- END Open Account -----------------------------------------------


  form: FormGroup = new FormGroup({
    columnName: new FormControl(''),
    criteriaValue: new FormControl(''),
    operand: new FormControl(''),
    MobileNumber: new FormControl(''),
  });

  formFT: FormGroup = new FormGroup({
    columnName: new FormControl(''),
    criteriaValue: new FormControl(''),
    operand: new FormControl(''),
    MobileNumber: new FormControl(''),
  });

  formNC: FormGroup = new FormGroup({
    columnName: new FormControl(''),
    criteriaValue: new FormControl(''),
    operand: new FormControl(''),
  });

  formFTOTP: FormGroup = new FormGroup({
    FirstOTPFT: new FormControl(''),
    SecondOTPFT: new FormControl(''),
    ThirdOTPFT: new FormControl(''),
    FourOTPFT: new FormControl(''),
  });
  formFt2: FormGroup = new FormGroup({
    CreditAccountft1: new FormControl(''),
    // CreditAmountft1: new FormControl(''),
    // CreditNarrativeft1: new FormControl(''),
  });
  formTelebirr: FormGroup = new FormGroup({
    transactionTypeSelf: new FormControl('')
  });
  formTelebirr1: FormGroup = new FormGroup({
    MobileNumberTB1: new FormControl(''),
    CreditAccountTB1: new FormControl(''),
  });
  formFt4: FormGroup = new FormGroup({

    CreditAmountft1: new FormControl(''),
    CreditNarrativeft1: new FormControl(''),
  });
  formTelebirr2: FormGroup = new FormGroup({

    CreditAmountTB2: new FormControl(''),
  });

  formTelebirrOther1: FormGroup = new FormGroup({
    MobileNumberOtherTB1: new FormControl(''),
    CreditAmountTB3: new FormControl(''),
    CustomerNameOtherTB2: new FormControl(''),
  });

  formTelebirrOther: FormGroup = new FormGroup({
    MobileNumberOtherTB: new FormControl(''),
    CreditAccountOtherTB: new FormControl(''),
    CustomerNameOtherTB1: new FormControl(''),
  });

  form3: FormGroup = new FormGroup({
    FirstOtp: new FormControl(''),
    SecondOtp: new FormControl(''),
    ThirdOtp: new FormControl(''),
    FourOtp: new FormControl(''),
  });

  ALOTPform: FormGroup = new FormGroup({
    ALFirstOtp: new FormControl(''),
    ALSecondOtp: new FormControl(''),
    ALThirdOtp: new FormControl(''),
    ALFourOtp: new FormControl(''),
  });

  form2: FormGroup = new FormGroup({
    CreditAmount: new FormControl(''),
    CreditAccount: new FormControl(''),
    DebitAccount: new FormControl(''),
    CreditNarrative: new FormControl(''),
  });

  form4: FormGroup = new FormGroup({
    MobileNumber: new FormControl(''),
  });

  form5: FormGroup = new FormGroup({
    AccountIdCW: new FormControl(''),
    MobileNumber: new FormControl(''),
  });

  form2ndCW: FormGroup = new FormGroup({
    CustomerNameCW: new FormControl(''),
    AmountCW: new FormControl(''),
  });

  formCD3: FormGroup = new FormGroup({
    NameCD: new FormControl(''),
    AmountCD: new FormControl(''),
    name: new FormControl(''),    
  });

  formNewCard: FormGroup = new FormGroup({
    NameCD: new FormControl(''),
    Otp: new FormControl(''),
    name: new FormControl(''),
  });

  formCD: FormGroup = new FormGroup({
    AccountId: new FormControl(''),
    MobileNumber: new FormControl(''),
  });

  form6: FormGroup = new FormGroup({
    FirstOTP: new FormControl(''),
    SecondOTP: new FormControl(''),
    ThirdOTP: new FormControl(''),
    FourOTP: new FormControl(''),
  });

  formCD2: FormGroup = new FormGroup({
    FirstOTPCD: new FormControl(''),
    SecondOTPCD: new FormControl(''),
    ThirdOTPCD: new FormControl(''),
    FourOTPCD: new FormControl(''),
  });

  form7: FormGroup = new FormGroup({
    criteriaValueAL: new FormControl(''),
    MobileNumber: new FormControl(''),
  });

  form8: FormGroup = new FormGroup({
    CheaqueLeaf: new FormControl(''),
    CheaqueBook: new FormControl(''),
    CheaqueBookAddress: new FormControl(''),
    acceptTerms: new FormControl(''),
  });

  CPOTPform: FormGroup = new FormGroup({
    CPFirstOTP: new FormControl(''),
    CPSecondOTP: new FormControl(''),
    CPThirdOTP: new FormControl(''),
    CPFourthOTP: new FormControl(''),
  });

  form11: FormGroup = new FormGroup({
    criteriaValue: new FormControl(''),
    MobileNumber: new FormControl(''),
  });

  form12: FormGroup = new FormGroup({
    PPFirstOTP: new FormControl(''),
    PPSecondOTP: new FormControl(''),
    PPThirdOTP: new FormControl(''),
    PPFourthOTP: new FormControl(''),
  });

  form13: FormGroup = new FormGroup({
    BBcriteriaValue: new FormControl(''),
    criteriaValue: new FormControl(''),
    BenificiaryNamePP: new FormControl(''),
    PPacceptTerms: new FormControl(''),
  });

  formALradio: FormGroup = new FormGroup({
    transactionType1: new FormControl(''),
  });

  form15: FormGroup = new FormGroup({
    PNR: new FormControl(''),
    CustomerName: new FormControl(''),
    AccountId: new FormControl(''),
    transactionType1: new FormControl('')
  });

  form15Account: FormGroup = new FormGroup({
    CustomerNameALAcc: new FormControl(''),
    PNR: new FormControl(''),
  });

  formALAccount: FormGroup = new FormGroup({
    Airlines: new FormControl(''),
    PassengerName: new FormControl(''),
    amount: new FormControl(''),
    accountNumber: new FormControl(''),
  });

  FeedbackRadio: FormGroup = new FormGroup({
    transactionTypeFS: new FormControl(''),
  });

  labelValues: { [key: string]: string } = {};
  captions: any;

  ngOnInit(): void {
    // this.signalRService.messages$.subscribe((customers: any) => {
    //   this.customers = customers;  // Assign the received data to the customers array
    //   console.log("Customers received in component:", this.customers);
    //   if(customers["tokenId"]==this.TokenId){
    //   this.service.GetTokenDetail({TokenId:this.TokenId}).subscribe(data => {
    //     console.log("brijesh",data);
        
    //       if(this.TokenId==data["Table"][0].TokenId && data["Table"][0].StatusId=="130"){
    //         const test=document.querySelector("#exampleModal5 .modal-body")as HTMLElement;
    //         if (test) {
    //           test.style.backgroundColor = "green"; // Replace with the color you want
    //           console.log(test);
    //         } else {
    //           console.error("Element not found");
    //         }
    //       }
    //       else{
    //         const test=document.querySelector("#exampleModal5 .modal-body")as HTMLElement;
    //         if (test) {
    //           test.style.backgroundColor = "red"; // Replace with the color you want
    //           console.log(test);
    //         } else {
    //           console.error("Element not found");
    //         }
    //       }
    //     });
    //   }
    //   });
    // this.activatedRoute.queryParams.subscribe(params => {
    //   console.log('Query Params:', params);  
    // });
    this.showQrFeedback();
 this.activatedRoute.paramMap.subscribe(params =>{
  let branchid=params.get('id') || "";
  const secretKey="SmartBranchDae";
  branchid=decodeURIComponent(branchid)
  const decryptedBranchId = branchid 
    ? parseInt(CryptoJS.AES.decrypt(branchid, secretKey).toString(CryptoJS.enc.Utf8))
    : 0;
  let vals = {
    "BranchID" : decryptedBranchId 
  }
  
  this.service.GetApiUrl(vals).subscribe(data => {    
    if (data && data.length>0){
      this.service.APIURL = data[0]["APIURL"]
    }
    

    this.LanguageId = localStorage.getItem("LanguageId");
    this.BranchID = localStorage.getItem("BranchId");
    let val = {
      LanguageId: this.LanguageId
    }
    // fuunction To Get Branch Details
    this.getBranchDetails({ BranchId: this.BranchID });
    
    this.service.GetCaption(val).subscribe(data => {
 
      this.captions = data;
      this.captions?.forEach((item: any) => {
        this.labelValues[item.Caption] = item.Value;
      });
    })

    this.getParentServices();
  })

 

    
  })
    this.form = this.formBuilder.group(
      {
        columnName: [''],
        criteriaValue: ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]],
        operand: [''],
        MobileNumber: ['', Validators.required],
      }
    );

    this.formALradio = this.formBuilder.group({
      transactionType1: ['Cash', Validators.required] // Set default value to 'Cash'
    });

    this.formFT = this.formBuilderFT.group(
      {
        columnName: [''],
        criteriaValue: ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]],
        operand: [''],
        MobileNumber: ['', Validators.required],
      }
    );

    this.formPersonalInformation = this.formBuilderPersonalInformation.group(
      {
        fullName: ['', [Validators.required]],
        surName: ['', [Validators.required]],
        motherName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required]],
        gender: ['', [Validators.required]],
      }
    )


    this.formContactInformation = this.formBuilderContactInformation.group(
      {
        streetAddress: ['', [Validators.required]],
        country: [''],
        stateProvince: [''],
        city: [''],
        zipCode: [''],        
      }
    )

    this.formFinancialInformation = this.formBuilderFinancialInformation.group(
      {
        occupation: ['', [Validators.required]],
        currency: ['', [Validators.required]],
        initialDeposit: ['', [Validators.required]],
        monthlyIncome: ['', [Validators.required]],               
      }
    )
  
    this.formNC = this.formBuilderFT.group(
      {
        columnName: [''],
        criteriaValue: ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]],
        operand: [''],
      }
    );


    this.formFTOTP = this.formBuilderFTOTP.group(
      {
        FirstOTPFT: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
        SecondOTPFT: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
        ThirdOTPFT: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
        FourOTPFT: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
      }
    );
    this.formFt2 = this.formBuilderft2.group(
      {
        CreditAccountft1: ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]],
        CustomerName: [{ value: '', disabled: true }],
        // CreditAmountft1: [{ value: '', disabled: this.isFieldsDisabled }, [Validators.required, Validators.pattern('^[0-9]{1,10}$')]],
        // CreditNarrativeft1: [{ value: '', disabled: this.isFieldsDisabled }]
      }
    );
    this.formFt4 = this.formBuilderft4.group(
      {
        // CreditAmountft1: ['', Validators.required,{ value: '', disabled: this.isFieldsDisabled }],
        CreditAmountft1: ['', [Validators.required, Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$"), Validators.min(0.01)]],
        CreditNarrativeft1: [{ value: '', disabled: this.isFieldsDisabled }]
      }
    );

    this.formTelebirr = this.formBuilder.group({
      transactionTypeSelf: ['Self', Validators.required] // Set default value to 'Cash'
    });

    this.FeedbackRadio = this.formBuilder.group({
      transactionTypeFS: ['Feedback', Validators.required] // Set default value to 'Cash'
    });

    this.formTelebirr1 = this.formBuilderft2.group(
      {
        MobileNumberTB1: ['', Validators.required],
        CreditAccountTB1: ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]],
        CustomerNameTB: [{ value: '', disabled: true }],
      }
    );
    this.formTelebirr2 = this.formBuilderft4.group(
      {
        // MobileNumberTB2: ['', [Validators.required, Validators.pattern('^09[0-9]{08}$'),Validators.minLength(10)]],
        CreditAmountTB2: ['', [Validators.required, Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$"), Validators.min(0.01)]]
        // CreditAmountTB2: [{ value: '', disabled: this.isFieldsDisabled }, [Validators.required ]],
      }
    );
    this.formTelebirrOther = this.formBuilderTB4.group(
      {
        MobileNumberOtherTB: ['', [Validators.required]],
        CreditAccountOtherTB: ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]],
        CustomerNameOtherTB1: [{ value: '', disabled: true }],
      }
    );

    this.formTelebirrOther1 = this.formBuilderTB4.group(
      {
        MobileNumberOtherTB1: ['', Validators.required],
        CreditAmountTB3: ['', [Validators.required, Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$"), Validators.min(0.01)]],
        CustomerNameOtherTB2: [{ value: '', disabled: true }],
      }
    );
    this.form3 = this.formBuilder2.group(
      {
        FirstOtp: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
        SecondOtp: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
        ThirdOtp: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
        FourOtp: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
      }
    );

    this.ALOTPform = this.formBuilderAL.group(
      {
        ALFirstOtp: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
        ALSecondOtp: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
        ALThirdOtp: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
        ALFourOtp: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
      }
    );

    this.formALCash = this.fb.group({
      AirlinesName: [{ value: '', disabled: true }],
      Passenger: [{ value: '', disabled: true }],
      amount: [{ value: '', disabled: true }, [Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$"), Validators.min(0.01)]]
    });

    this.formALAccount = this.ALAccSumm.group({
      Airlines: [{ value: '', disabled: true }],
      amount: [{ value: '', disabled: true }, [Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$"), Validators.min(0.01)]],
      accountNumber: [{ value: '', disabled: true }],
      CustomerName: [{ value: '', disabled: true }],
      PassengerName: [{ value: '', disabled: true }],

    });

    this.form2 = this.formBuilder3.group(
      {
        CustomerName: [{ value: '', disabled: true }],
        CreditAmount: ['', [Validators.required, Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$"), Validators.min(0.01)]],
        CreditAccount: ['', Validators.required],
        DebitAccount: ['', Validators.required],
        CreditNarrative: ['', Validators.required]
      }
    );
    this.form4 = this.formBuilder4.group(
      {
        MobileNumber: ['', Validators.required],
      }
    );
    this.form5 = this.formBuilder5.group(
      {
        AccountIdCW: ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]],
        MobileNumber: ['', Validators.required],
      }
    );
    this.form2ndCW = this.formBuilder2ndCW.group(
      {
        CustomerNameCW: [{ value: 'test', disabled: true },],
        AmountCW: ['', [Validators.required, Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$"), Validators.min(0.01)]],
      }
    );

    this.formCD3 = this.formBuilderCD3.group(
      {
        NameCD: [{ value: 'test', disabled: true },],
        AmountCD: ['', [Validators.required, Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$"), Validators.min(0.01)]],
        // digitalTransactionCD: [false, Validators.requiredTrue,],
        name: [{ value: '', disabled: false },],
      }
    );

    this.formNewCard = this.formBuilderNewCard.group(
      {
        NameCD: [{ value: 'test', disabled: true },],
        Otp: ['', [Validators.required]],
        //digitalTransactionCD: [false, Validators.requiredTrue,],
        name: [{ value: '', disabled: false },],
      }
    );

    this.formCD = this.formBuilderCD.group(
      {
        AccountId: ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]],
        MobileNumber: ['', Validators.required],
      }
    );

    this.form6 = this.formBuilder6.group(
      {
        FirstOTP: ['', Validators.required],
        SecondOTP: ['', Validators.required],
        ThirdOTP: ['', Validators.required],
        FourOTP: ['', Validators.required]
      }
    );

    this.formCD2 = this.formBuilder6.group(
      {
        FirstOTPCD: ['', Validators.required],
        SecondOTPCD: ['', Validators.required],
        ThirdOTPCD: ['', Validators.required],
        FourOTPCD: ['', Validators.required]
      }
    );
    this.form7 = this.formBuilder7.group(
      {
        criteriaValueAL: ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]],
        MobileNumber: ['', Validators.required],
      }
    );
    this.CPOTPform = this.formBuilderCPOTP.group(
      {
        CPFirstOTP: ['', Validators.required],
        CPSecondOTP: ['', Validators.required],
        CPThirdOTP: ['', Validators.required],
        CPFourthOTP: ['', Validators.required],
      }
    );
    this.form8 = this.formBuilder8.group(
      {
        CheaqueLeaf: ['', Validators.required],
        CheaqueBook: ['', Validators.required],
        CheaqueBookAddress: [''],
        acceptTerms: [false, Validators.required],
      }
    );
    this.form11 = this.formBuilder11.group(
      {
        criteriaValue: ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]],
        MobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      }
    );
    this.form12 = this.formBuilder12.group(
      {
        PPFirstOTP: ['', Validators.required],
        PPSecondOTP: ['', Validators.required],
        PPThirdOTP: ['', Validators.required],
        PPFourthOTP: ['', Validators.required],
      }
    );
    this.form13 = this.formBuilder13.group(
      {
        BBcriteriaValue: ['', Validators.required],
        criteriaValue: ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]],
        BenificiaryNamePP: ['', Validators.required],
        PPacceptTerms: [false, Validators.required],
      }
    );
    this.form15 = this.formBuilder15.group({
      // PNR: ['', [Validators.required, Validators.pattern('^[A-Z0-9]{6}$')]],
      PNR: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9]{6}$")]],
      // CustomerName: ['',{  disabled: true }],
      CustomerName: ['', [Validators.required]],
      // accountNumber: ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]],
      AccountId: ['', this.showAccountDiv ? [Validators.required, Validators.pattern(/^[0-9]{13}$/)] : []],
      transactionType1: [''],
      // digitalTransaction: [false, Validators.required],
    });

    this.form15Account = this.formBuilder15Account.group({
      // PNR: ['', [Validators.required, Validators.pattern('^[A-Z0-9]{6}$')]],
      CustomerNameALAcc: [{ value: '', disabled: this.isFieldsDisabled }],
      PNR: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9]{6}$")]],
      // accountNumber: ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]],
      // AccountId:  ['', this.showAccountDiv ? [Validators.required, Validators.pattern(/^[0-9]{13}$/)] : []],
      // transactionType1: [''],
      // digitalTransaction: [false, Validators.required],
    });
  }

  

  getBranchDetails(BranchId: any) {
    this.service.BranchDetails(BranchId)
      .subscribe(
        (data) => {
          this.branchDetails = data.Table[0];
          if (this.branchDetails) {
            // Store BranchName in the variable
            this.BranchName = this.branchDetails.BranchName;
          }
          //
        },
        (error) => {
          this.errorMessage = error;
        }
      );
  }


  getValueForCaption(caption: string): string {
    return this.labelValues[caption] || '';
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  get fFT(): { [key: string]: AbstractControl } {
    return this.formFT.controls;
  }

  get fNC(): { [key: string]: AbstractControl } {
    return this.formNC.controls;
  }
  get fT(): { [key: string]: AbstractControl } {
    return this.formFT.controls;
  }
  get fT2(): { [key: string]: AbstractControl } {
    return this.formFTOTP.controls;
  }
  get fT3(): { [key: string]: AbstractControl } {
    return this.formFt2.controls;
  }
  get fT4(): { [key: string]: AbstractControl } {
    return this.formFt4.controls;
  }
  get TB1(): { [key: string]: AbstractControl } {
    return this.formTelebirr2.controls;
  }
  get TB2(): { [key: string]: AbstractControl } {
    return this.formTelebirr1.controls;
  }
  get TB3(): { [key: string]: AbstractControl } {
    return this.formTelebirrOther.controls;
  } get TB4(): { [key: string]: AbstractControl } {
    return this.formTelebirrOther1.controls;
  }
  get TB5(): { [key: string]: AbstractControl } {
    return this.formTelebirrOther1.controls;
  }
  get f2(): { [key: string]: AbstractControl } {
    return this.form2.controls;
  }
  get f3(): { [key: string]: AbstractControl } {
    return this.form3.controls;
  }
  get fAL(): { [key: string]: AbstractControl } {
    return this.ALOTPform.controls;
  }
  get f4(): { [key: string]: AbstractControl } {
    return this.form4.controls;
  }
  get f5(): { [key: string]: AbstractControl } {
    return this.form5.controls;
  }
  get f2ndCW(): { [key: string]: AbstractControl } {
    return this.form2ndCW.controls;
  }
  get fCD3(): { [key: string]: AbstractControl } {
    return this.formCD3.controls;
  }

  get fNewCard(): { [key: string]: AbstractControl } {
    return this.formNewCard.controls;
  }

  get fCD(): { [key: string]: AbstractControl } {
    return this.formCD.controls;
  }
  get f6(): { [key: string]: AbstractControl } {
    return this.form6.controls;
  }
  get fCD2(): { [key: string]: AbstractControl } {
    return this.formCD2.controls;
  }
  get f77(): { [key: string]: AbstractControl } {
    return this.form7.controls;
  }
  get f8(): { [key: string]: AbstractControl } {
    return this.form8.controls;
  }
  get f9(): { [key: string]: AbstractControl } {
    return this.CPOTPform.controls;
  }
  get f11(): { [key: string]: AbstractControl } {
    return this.form11.controls;
  }
  get f12(): { [key: string]: AbstractControl } {
    return this.form12.controls;
  }
  get f13(): { [key: string]: AbstractControl } {
    return this.form13.controls;
  }

  get f15(): { [key: string]: AbstractControl } {
    return this.form15.controls;
  }
  get f15Account(): { [key: string]: AbstractControl } {
    return this.form15Account.controls;
  }

  MSCustomerNameAcc: any;

  generateOTP() {
    this.hideInputCriteriaV('criteriaValue');
    // 
    if (this.form.invalid) {
      return;
    } else {
      this.showSpinner = true;
      this.ValidatePhoneNumberMS();
    }
  }

  getMinistatementdata() {
    // this.generateToken(this.SelectedServices)
    let val: any = {
      columnName: "ACCOUNT",
      criteriaValue: this.form.value.criteriaValue,
      operand: "EQ"
    }
    this.ministatementList = [
      {
        TXNREF: "TXN12345",
        DATE: "2024-12-01",
        DESC: "Grocery Purchase",
        CRAMT: 0.0,
        DRAMT: 100.0,
      },
      {
        TXNREF: "TXN12346",
        DATE: "2024-12-02",
        DESC: "Salary Credit",
        CRAMT: 5000.0,
        DRAMT: 0.0,
      },
      {
        TXNREF: "TXN12347",
        DATE: "2024-12-03",
        DESC: "Electricity Bill Payment",
        CRAMT: 0.0,
        DRAMT: 150.0,
      },
    ];
    this.failureStatus1 = false;
    hideFModal();
    showSecondModal();


    // this.service.Ministatement(val).subscribe(data => {

    //   if (data && data["MiniStatementResponse"] && data["MiniStatementResponse"]["EMMTMINISTMTType"] && data["MiniStatementResponse"]["EMMTMINISTMTType"]["gEMMTMINISTMTDetailType"]) {
    //     this.ministatementList = data["MiniStatementResponse"]["EMMTMINISTMTType"]["gEMMTMINISTMTDetailType"]["mEMMTMINISTMTDetailType"];
    //     this.failureStatus1 = false;
    //     hideFModal();
    //     showSecondModal();
    //     // 
    //   } else {
    //     const failureStatus = data["MiniStatementResponse"]["ESBStatus"]["Status"];
    //     this.failureStatus = failureStatus;
    //     this.failureStatus1 = true;
    //   }
    // }).add(() => {
    // });
  }

  getAccountBalanceMS() {
    // 
    this.criteriaValue = this.form.value.criteriaValue;
    // 
    let valAB: any = {
      columnName: "ACCOUNT.NUMBER",
      criteriaValue: this.form.value.criteriaValue,
      operand: "EQ",
    };

    this.CurrentBalanceMS = "15,534";
    // this.AccountId = data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["AccountBalance"][0]["accountId"];
    // 
    this.CurrentBalanceMS2 = this.CurrentBalanceMS + " birr";
    this.showSpinner = false;
    // 
    // this.service.AccountBalance(valAB).subscribe(data => {
    //   // 
    //   if (data["AccountBalanceResponse"]?.["ACCTBRANCHResponse"]?.["ACCTCOMPANYVIEWType"]?.[0]?.["gACCTBALCTSDetailType"]?.["mACCTBALCTSDetailType"]?.["WorkingBal"]) {
    //     this.CurrentBalanceMS = data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["ACCTCOMPANYVIEWType"][0]["gACCTBALCTSDetailType"]["mACCTBALCTSDetailType"]["WorkingBal"];
    //     this.CurrentBalanceMS = data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["ACCTCOMPANYVIEWType"][0]["gACCTBALCTSDetailType"]["mACCTBALCTSDetailType"]["WorkingBal"];
    //     // this.AccountId = data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["AccountBalance"][0]["accountId"];
    //     // 
    //     this.CurrentBalanceMS2 = this.CurrentBalanceMS + " birr";
    //   } else {
    //     this.errorMessagems = 'Something went wrong. Try again later';
    //   }
    // }).add(() => {
    //   this.showSpinner = false;
    // });
  }

  ValidatePhoneNumberMS() {

    let val: any = {
      AccountId: this.form.value.criteriaValue,
    };

    this.MSCustomerNameAcc = "Maasai Spirit";
    this.MobileNumber = "0912345678";
    this.AccountId = 1234567890865;
    // 
    // this.generateOTPAL2()
    // this.OTPSubmitAL()
    this.getAccountBalanceMS();
    this.getMinistatementdata();
    this.showSpinner = false;
    // this.service.CustomerInfo(val).subscribe(data => {

    //   if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {
    //     this.MSCustomerNameAcc = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"];
    //     this.MobileNumber = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerDetails"][0]["phoneNumbers"][0]["phoneNumber"];
    //     this.AccountId = data["CustomerInfoResponse"]["CustomerInfo"][0]["accountId"];
    //     // 
    //     // this.generateOTPAL2()
    //     // this.OTPSubmitAL()
    //     this.getAccountBalanceMS();
    //     this.getMinistatementdata();
    //   } else {
    //     this.errorMessageMS2 = 'Invalid account number. Please enter the correct account number.';
    //   }
    // },
    //   error => {
    //     this.showSpinner = false;
    //     this.errorMessagemS = 'Something went wrong. Try again later';
    //     console.error('An error occurred:', error);
    //     // Handle the error here, such as showing a toast message or displaying an error dialog.
    //   }
    // ).add(() => {
    //   this.showSpinner = false;
    // });

  }

  triggerTimeoutMS() {
    this.timeoutMS = setTimeout(() => {
      hideFModal();
      hideSecondModal();
      this.resetFormAndData();
    }, 30000);
  }
  // generateOTP() {

  //   this.hideInputCriteriaV('criteriaValue');
  //   if (this.form.invalid) {
  //     
  //     this.showOTP = false;
  //     return;

  //   } else {
  //     
  //     
  //     this.showOTP = true;
  //   }
  //   // this.showOTP=true;
  // }
  generateOTPAL() {
    this.hideInputCriteriaV('criteriaValue');
    // hideSecondBillpaymentModal();
    // showFourthBillpaymentModal();
    // this.showSpinner = false;
    // if (this.form7.invalid) {
    //   return;

    // } else {
      //this.showSpinner = true;
      this.ValidatePhoneNumberAL();
    // }
    // this.showOTP=true;
  }

  ValidatePhoneNumberAL() {
    let val: any = {
      AccountId: this.form7.value.criteriaValueAL,
    };
    this.AlCustomerNameAcc = "Rahul Gupta"
    this.PhoneNumberformAL ="09763426436"
    this.AccountId = "10978327544343"

    // this.generateOTPAL2()
    this.OTPSubmitAL()

    // this.getMinistatementdata();
    hideSecondBillpaymentModal();
    showFourthBillpaymentModal();
   // this.showSpinner = false;
    // let val: any = {
    //   AccountId: this.form7.value.criteriaValueAL,
    // };

    // this.service.CustomerInfo(val).subscribe(data => {

    //   if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {

    //     // if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {
    //     this.AlCustomerNameAcc = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"];
    //     this.PhoneNumberformAL = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerDetails"][0]["phoneNumbers"][0]["phoneNumber"];
    //     this.AccountId = data["CustomerInfoResponse"]["CustomerInfo"][0]["accountId"];

    //     // this.generateOTPAL2()
    //     this.OTPSubmitAL()

    //     // this.getMinistatementdata();
    //     hideSecondBillpaymentModal();
    //     showFourthBillpaymentModal();
    //   } else {
    //     this.showSpinner = false;
    //     this.errorMessageAL3 = 'Invalid account number. Please enter the correct account number.';
    //   }
    // },
    //   error => {
    //     this.showSpinner = false;
    //     this.errorMessageaL = 'Something went wrong. Try again later';
    //     console.error('An error occurred:', error);
    //     // Handle the error here, such as showing a toast message or displaying an error dialog.
    //   }
    // ).add(() => {
    //   this.showSpinner = false;
    // });

  }

  // generateOTPAL() {
  //   this.hideInputCriteriaV('criteriaValue');
  //   
  //   this.ValidatePhoneNumberAL();
  //   // if (this.form7.invalid) {
  //   //   
  //   //   this.showOTPAL = false;
  //   //   return;

  //   // } else {
  //   //   
  //   //   this.showOTPAL = true;
  //   // }

  //   // this.showOTP=true;
  // }

  // ValidatePhoneNumberAL(){
  //   
  //   let val: any = {
  //     AccountId: this.form7.value.criteriaValueAL,
  //   };

  //   this.service.CustomerInfo(val).subscribe(data => {
  //     
  //     if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {
  //       this.AlCustomerNameAcc = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"];
  //       this.PhoneNumberformAL = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerDetails"][0]["phoneNumbers"][0]["phoneNumber"];
  //       this.AccountId = data["CustomerInfoResponse"]["CustomerInfo"][0]["accountId"];
  //       
  //       
  //       this.generateOTPAL2()
  //     } else {


  //     }
  //   }).add(() => {
  //     this.showSpinner = false;
  //   });

  // }

  generateOTPAL2() {
    if (this.form7.invalid) {
      this.showOTPAL = false;
      return;
    }

    if (this.PhoneNumberformAL === this.form7.value.MobileNumber) {
      this.errorMessageAL2 = '';
      this.showOTPAL = true;
    } else {
      // 
      // alert("phone number is not registered with the bank");
      this.errorMessageAL2 = "phone number is not registered with the bank";
      this.showOTPAL = false;
      // Add code for the case when phone numbers are not equal
    }
  }
  resetErrorMessageAL2() {
    this.errorMessageAL2 = '';
  }

  // generateOTPFT() {
  //   this.hideInputCriteriaV('criteriaValue');
  //   
  //   this.ValidatePhoneNumberFT();
  //   // this.showOTP=true;
  // }
  // ValidatePhoneNumberFT() {
  // 
  //   let val: any = {
  //     AccountId: this.formFT.value.criteriaValue,
  //   };

  //   this.service.CustomerInfo(val).subscribe(data => {
  //     // 
  //     if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {
  //       // this.CustomerName = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"];
  //       this.PhoneNumberformFT = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerDetails"][0]["phoneNumbers"][0]["phoneNumber"];
  //       this.AccountId = data["CustomerInfoResponse"]["CustomerInfo"][0]["accountId"];
  //       // 
  //       
  //       this.generateOTPFT2()
  //     } else {


  //     }
  //   }).add(() => {
  //     this.showSpinner = false;
  //   });

  // }

  generateOTPFT() {
    this.hideInputCriteriaV('criteriaValue');

    // if (this.formFT.invalid) {
    //   return;
    // }
    // else {
      this.ValidatePhoneNumberFT();

      // hideFirstModalFT();
      // showSecondModalFT();
    // }
    // this.showOTP=true;
  }

  //Open An Account

  openContactInformation(){    
    this.submittedPersonalInformation = true;
    if(this.formPersonalInformation.invalid)
      {        
        return;
      }

    
    hideopenAnAccountModalPersonalInformation();
    showopenAnAccountModalContactInformation();
  }

  openFinancialInformation(){
    this.submittedContactInformation = true;

    if(this.formContactInformation.invalid){
      return;
    }

    
    hideopenAnAccountModalContactInformation();
    showopenAnAccountModalFinancialInfromation();
  }

  openSignaturePad(){
      
      this.submittedFinancialInformation = true;
      this.signaturePad.clear();      
      this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);

      if(this.formFinancialInformation.invalid){
        return;
      }
      hideopenAnAccountModalFinancialInfromation();
      showopenAnAccountModalSignaturePad();
      

  }
 

  BackToOpenAnAccountModalPersonalInformation(){
    showopenAnAccountModalPersonalInformation();
    hideopenAnAccountModalContactInformation();
  }

  BackToOpenAnAccountModalFinancialInformation(){
    showopenAnAccountModalContactInformation();
    hideopenAnAccountModalFinancialInfromation();
  }

  BackToOpenAnAccountModalFinancialInformation2(){
    hideopenAnAccountModalSignaturePad();
    showopenAnAccountModalFinancialInfromation();
  }



  
  startDrawing(event: Event) {
    // works in device not in browser
   }
 
  moved(event: Event) {
    // works in device not in browser
  }

  savePad() {
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
    this.signatureNeeded = this.signaturePad.isEmpty();
    if (!this.signatureNeeded) {

      //To download 
    // const blob = this.base64ToBlob(base64Data);    
    // const link = document.createElement('a');
    // link.href = URL.createObjectURL(blob);
    // link.download = 'signature.png'; 
    // document.body.appendChild(link);    
    // link.click();    
    // this.signatureNeeded = false;

    const blob = this.base64ToBlob(base64Data);    
    const formData = new FormData();
    formData.append('file', blob, 'signature.png');

    this.service.UploadSignature(formData).subscribe(data=>{
      
   //   console.log(data);
      alert('upload api called')
    })
    this.signatureNeeded = false;
    }
 }

 // Utility function to convert Base64 string to Blob
  base64ToBlob(base64: string) {
    const byteString = atob(base64.split(',')[1]);
    const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
    const buffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(buffer);

    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([buffer], { type: mimeString });
  }

  clearPad() {  
    this.signaturePad.clear();
  }

  OpneAccountSubmit(){

  const base64Data = this.signaturePad.toDataURL();
  this.signatureImg = base64Data;
  this.signatureNeeded = this.signaturePad.isEmpty();

  if (!this.signatureNeeded) {

    //To download 
  // const blob = this.base64ToBlob(base64Data);    
  // const link = document.createElement('a');
  // link.href = URL.createObjectURL(blob);
  // link.download = 'signature.png'; 
  // document.body.appendChild(link);    
  // link.click();    
  // this.signatureNeeded = false;

  

  //create Token
  let val: any = {
  ServiceName: this.SelectedServices,
  BranchID: this.BranchID,
  PriorityID: this.GPriorityID,
  LaguageID: this.LanguageId,
  TokenDetails: "",
  MsIsdnNo: "",
  MissionId: 1,
  ServiceID: this.SelectedServicesID,
  }

  this.service.GetTokenNo(val).subscribe(data => {

  if (data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]) {
    this.sendWhatApp(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"],this.formPersonalInformation.value.phone);
    //this.sendSms(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]);
    this.tokenData1 = data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"];
    this.currentDate=Date();
    //Get TOken ID;
    let val2: any = {
      TokenNo: this.tokenData1,
      ServiceId: this.SelectedServicesID
    }

    this.service.GetTokenId(val2).subscribe(data => {
      this.dataList = data;
      this.TokenId = this.dataList['Table'][0]['TokenId'];
      
      this.SelectedTokenID = this.SelectedService.TokenId;

      let jsonUserDetails = {
        fullName : this.formPersonalInformation.value.fullName,
        surname : this.formPersonalInformation.value.surName,
        motherName : this.formPersonalInformation.value.motherName,
        email : this.formPersonalInformation.value.email,
        phone : this.formPersonalInformation.value.phone,
        sex : this.formPersonalInformation.value.gender,
        streetAddress : this.formContactInformation.value.streetAddress,
        country : this.formContactInformation.value.country,
        state : this.formContactInformation.value.stateProvince,
        city : this.formContactInformation.value.city,
        zipCode : this.formContactInformation.value.zipCode,
        occupation : this.formFinancialInformation.value.occupation,
        accountCurrency : this.formFinancialInformation.value.currency,
        initialDeposit : this.formFinancialInformation.value.initialDeposit,
        monthlyIncome : this.formFinancialInformation.value.monthlyIncome,
        // branch: this.branchDetails
      }
      
      var userDetails = {
        TokenId : this.TokenId,
        BranchId : this.BranchID,
        ServiceId : this.SelectedServicesID,
        userDetails :  JSON.stringify(jsonUserDetails)
      }

      const blob = this.base64ToBlob(base64Data);    
      const formData = new FormData();
      formData.append('file', blob,  this.BranchID +'-'+ this.TokenId+'-signature.png');

      this.service.UploadSignature(formData).subscribe(data=>{
      })
      this.signatureNeeded = false;
      this.signaturePad.clear();      
      this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
      this.service.OpenAcAccount(userDetails).subscribe(data => {

          if(data.code && data.code == 100){

          //  this.showToken1 = true;                
            this.sla();
            hideopenAnAccountModalSignaturePad();
            //this.FeedbackStatus();

            // setTimeout(() => {
            //   hideopenAnAccountModalSignaturePad();
            //   this.showToken1 = false;
            //   if (this.FeedbackActive === "True") {                
            //     showFModalFb();
            //   }
            // }, 5000);

            this.submittedPersonalInformation = false;
            this.submittedContactInformation = false;
            this.submittedFinancialInformation = false
            let val:any={
              CurrentDate:this.currentDate,
              BranchName:this.BranchName,
              SelectedServices:this.SelectedServices,
              tokenData:this.tokenData1,
              AverageWait:this.AverageWait,
              TokenId:this.TokenId,
               BranchId:this.BranchID,
               SelectedServiceCaption:this.SelectedServiceCaption
            };
            sessionStorage.setItem("TokenDetails",JSON.stringify(val));
            this.router.navigate(['/signalToken']);
            // this.formPersonalInformation.reset();
            // this.formContactInformation.reset();
            // this.formFinancialInformation.reset();
          }              
      })    
    })
  }
  }

)
  }
  }

  //New Card
  getAccountDetails() {
    this.hideInputCriteriaV('criteriaValue');

    if (this.formNC.invalid) {
      return;
    }
    else {

      this.showSpinner = true;

      let val: any = {
        AccountId: this.formNC.value.criteriaValue,
      };

      // const value = this.formFT.get('criteriaValue')?.value;
      // this.form2.patchValue({ CustomerName: value });
      this.submittedFT2 = true;
      this.service.CustomerInfo(val).subscribe(data => {
        if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {

          // if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {
          // this.CustomerNameSenderFT = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"];
          this.CustomerNameCD = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"];
          this.PhoneNumberformFT = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerDetails"][0]["phoneNumbers"][0]["phoneNumber"];
          this.AccountId = data["CustomerInfoResponse"]["CustomerInfo"][0]["accountId"];
          this.lastTwoDigit = this.PhoneNumberformFT.slice(-2);
          // this.MobileNumber =
          //Generate and Send OTP

          this.sendOTP(this.PhoneNumberformFT);
          // this.getAccountBalanceFT();
          this.showSpinner = false;
          hideNewCardModal();
          showNewCardOTPModal();
          // this.generateOTPFT2()
        } else {
          this.showSpinner = false;
          this.errorMessageFT4 = 'Invalid account number. Please enter the correct account number.';

        }
      },
        error => {
          this.showSpinner = false;
          this.errorMessagefT1 = 'Something went wrong. Try again later';

          console.error('An error occurred:', error);
          // Handle the error here, such as showing a toast message or displaying an error dialog.
        }
      ).add(() => {
        //  this.showSpinner = false;
      });
    }
  }

  validateOtp() {

    this.submittedNewCard = true;
    this.newCardError = false;
    if (this.formNewCard.invalid) {
      return;
    }



    let val = {
      "Mobile": this.PhoneNumberformFT,
      "OTP": this.formNewCard.value.Otp
    }
    this.service.ValidateOTP(val).subscribe(data => {
      this.showSpinner = true;
      if (data.status_code == 100) {
        var CardProduct;
        if (this.SelectedService.ServiceName == "NewCard-AL") {
          CardProduct = 918;
        }
        else if (this.SelectedService.ServiceName == "NewCard-COV") {
          CardProduct = 900;
        }

        //Call New Card request
        // this.triggerTimeout1();
        let newCardVal = {
          "CardProduct": CardProduct,
          "AccountId": this.AccountId,
          "DeliveryBranchCode": "",
        }
        this.service.NewCardRequest(newCardVal).subscribe(data => {

          if (data && data["CardRequestResponse"] && data["CardRequestResponse"]["ESBStatus"] && data["CardRequestResponse"]["ESBStatus"]["Status"] == "Success") {
            hideNewCardOTPModal();
            showNewCardSuceessModal();
            this.triggerTimeoutNewCardSubmit();
            this.showSpinner = false;
          }
          else {
            this.addtokenTransactionNewCard();
            this.triggerTimeoutNewCard();
            this.showSpinner = false;
          }
        })
      }
      else {
        this.otpinvalid = true;
        this.showSpinner = false;
      }
    })
  }


  addtokenTransactionNewCard() {
    //create Token
    let val: any = {
      ServiceName: this.SelectedServices,
      BranchID: this.BranchID,
      PriorityID: this.GPriorityID,
      LaguageID: this.LanguageId,
      TokenDetails: "",
      MsIsdnNo: "",
      MissionId: 1,
      ServiceID: this.SelectedServicesID,
    }

    this.service.GetTokenNo(val).subscribe(data => {

      if (data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]) {
        // alert("Your Token Number is: " + data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"] );
         this.sendWhatApp(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]);
        //this.sendSms(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]);
        this.tokenData1 = data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"];

        this.currentDate = new Date();

        //Get TOken ID;
        let val2: any = {
          TokenNo: this.tokenData1,
          ServiceId: this.SelectedServicesID
        }

        this.service.GetTokenId(val2).subscribe(data => {
          this.dataList = data;
          this.TokenId = this.dataList['Table'][0]['TokenId'];
          this.SelectedTokenID = this.SelectedService.TokenId;

          var val3 = {
            ServiceId: this.SelectedServicesID,
            BranchId: this.BranchID,
            TokenId: this.TokenId,
            field_1: "New Card",
            field_2: this.AccountId,
            field_3: this.CustomerNameCD,
            field_4: this.formCD3.value.AmountCD,
            field_8: this.formCD.value.MobileNumber,
            field_12: this.formCD3.value.name,
          };

          this.service.AddtokenTransaction(val3).subscribe((data) => {


            let val:any={
              CurrentDate:this.currentDate,
              BranchName:this.BranchName,
              SelectedServices:this.SelectedServices,
              tokenData:this.tokenData1,
              AverageWait:this.AverageWait,
              TokenId:this.TokenId,
               BranchId:this.BranchID,
               SelectedServiceCaption:this.SelectedServiceCaption
            };
            
            sessionStorage.setItem("TokenDetails",JSON.stringify(val));
            this.router.navigate(['/signalToken']);

            // this.showToken1 = true;
            // this.FeedbackStatus();

            // setTimeout(() => {
            //   if (this.FeedbackActive === "True") {                
            //     showFModalFb();
            //   }
            // }, 5000);
            // this.ShowFeedback = true;
          });
        },)
      }
    },)
  }

  triggerTimeoutNewCard() {
    this.timeoutCD = setTimeout(() => {
      hideNewCardModal();
      hideNewCardOTPModal();
      hideNewCardSuceessModal();
      this.resetNewCard();
    }, 5000);

  }

  triggerTimeoutNewCardSubmit() {
    this.timeoutCD = setTimeout(() => {
      hideNewCardSuceessModal()
      this.resetNewCard();
    }, 5000);

  }

  resetNewCard(): void {
    clearTimeout(this.timeoutCD);
    this.errorMessagecd = '';
    this.errorMessagecd = '';
    this.formNewCard.reset();
    this.submittedNewCard = false;
    this.formFT.reset();
    this.formNC.reset();
    this.submittedFT = false;
    this.formCD.reset();
    this.formCD2.reset();
    this.formCD3.reset();
    this.submittedCD = false;
    this.submittedCD2 = false;
    this.submittedCD3 = false;
    this.AccountId = '';
    this.PhoneNumber = '';
    this.showOTPCashDeposit = false;
    this.MobileNumber = '';
    this.CustomerName = ''
    this.NameCD = '';
    this.CustomerNameCD = '',
      this.name = '',
      this.DepositerBy = '',
      this.OTPSubmitCD
    this.FirstOTP = '',
      this.SecondOTP = '',
      this.ThirdOTP = '',
      this.FourOTP = '',
      this.tokenData1 = '',
      this.showToken1 = false,
      this.AmountWithdrawlorDeposit = ''
  }

  ValidatePhoneNumberFT() {
    this.showSpinner = true;

    let val: any = {
      AccountId: this.formFT.value.criteriaValue,
    };

    const value = this.formFT.get('criteriaValue')?.value;
    this.form2.patchValue({ CustomerName: value });

    this.submittedFT2 = true;
    // if (this.formFTOTP.invalid) {
    //   //  
    //   this.errorMessage = 'Please enter a valid OTP. / እባክዎ የሚሰራ OTP ያስገቡ';
    //   return;
    // }
    // this.showSpinner = true;
    // this.getMinistatementdata();


    this.CustomerNameSenderFT="Mwangi King"
    this.PhoneNumberformFT="0943568312"
    this.AccountId="1234123754321"
   
    this.getAccountBalanceFT();

    // this.service.CustomerInfo(val).subscribe(data => {
    //   if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {

    //     // if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {
    //     this.CustomerNameSenderFT = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"];
    //     this.PhoneNumberformFT = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerDetails"][0]["phoneNumbers"][0]["phoneNumber"];
    //     this.AccountId = data["CustomerInfoResponse"]["CustomerInfo"][0]["accountId"];

    //     this.getAccountBalanceFT();
    //     // this.showSpinner=false;
    //     // this.generateOTPFT2()
    //   } else {
    //     this.showSpinner = false;
    //     this.errorMessageFT4 = 'Invalid account number. Please enter the correct account number.';

    //   }
    // },
    //   error => {
    //     this.showSpinner = false;
    //     this.errorMessagefT1 = 'Something went wrong. Try again later';

    //     console.error('An error occurred:', error);
    //     // Handle the error here, such as showing a toast message or displaying an error dialog.
    //   }
    // ).add(() => {
    //   //  this.showSpinner = false;
    // });

  }

  getAccountBalanceFT() {
    this.criteriaAmount = this.formFT.value.criteriaValue;

    let valAB: any = {
      columnName: "ACCOUNT.NUMBER",
      criteriaValue: this.formFT.value.criteriaValue,
      operand: "EQ",
    };


 
    this.CurrentBalanceFT="14,523";
    hideFirstModalFT();
    showSecondModalFT();
    this.showSpinner = false;
    // this.service.AccountBalance(valAB).subscribe(data => {

    //   if (data["AccountBalanceResponse"] && data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["ACCTCOMPANYVIEWType"][0]["gACCTBALCTSDetailType"]["mACCTBALCTSDetailType"] && data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["ACCTCOMPANYVIEWType"][0]["gACCTBALCTSDetailType"]["mACCTBALCTSDetailType"]["WorkingBal"]) {
    //     this.CurrentBalanceFT = data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["ACCTCOMPANYVIEWType"][0]["gACCTBALCTSDetailType"]["mACCTBALCTSDetailType"]["WorkingBal"];
    //     // this.AccountId = data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["AccountBalance"][0]["accountId"];
    //     hideFirstModalFT();
    //     showSecondModalFT();
    //     this.showSpinner = false;
    //   } else {
    //     this.errorMessagefT2 = 'Something went wrong. Try again later';
    //   }
    // },
    //   error => {
    //     this.showSpinner = false;
    //     this.errorMessagefT2 = 'Something went wrong. Try again later';
    //     console.error('An error occurred:', error);
    //     // Handle the error here, such as showing a toast message or displaying an error dialog.
    //   }
    // ).add(() => {
    //   this.showSpinner = false;
    // });
  }

  generateOTPFT2() {
    if (this.formFT.invalid) {
      this.showOTPFT = false;
      return;
    }

    if (this.PhoneNumberformFT === this.formFT.value.MobileNumber) {
      this.errorMessageFT2 = '';
      this.showOTPFT = true;
    } else {
      // 
      // alert("phone number is not registered with the bank");
      this.errorMessageFT2 = "phone number is not registered with the bank";
      this.showOTPFT = false;
      // Add code for the case when phone numbers are not equal
    }
  }
  resetErrorMessageFT2() {
    this.errorMessageFT2 = '';
  }

  generateOTPCashWithdrawl() {
    if (this.form5.invalid) {
      this.showOTPCashWithdrawl = false;
      return;
    } else {
      this.showOTPCashWithdrawl = true;
    }
  }

  generateOTPCashDeposit() {
    if (this.formCD.invalid) {
      this.showOTPCashDeposit = false;
      return;
    } else {
      this.showOTPCashDeposit = true;
    }
  }


  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
  }
  onSubmitFT(): void {
    this.submittedFT = true;

    if (this.formFT.invalid) {
      return;
    }
  }

  onSubmitCW(): void {
    this.submitted5 = true;
    if (this.form5.invalid) {
      return;
    }
  }

  onSubmitCD(): void {
    this.submittedCD = true;
    if (this.formCD.invalid) {
      return;
    }
  }

  // onSubmitFundTransfer(): void {
  //   this.submitted2 = true;
  //   if (this.form2.invalid) {
  //     return;
  //   }
  // }
  OnSubmitOTP(): void {
    this.submitted3 = true;
    if (this.form3.invalid) {
      // this.errorMessage = 'Please Enter Valid OTP / እባክዎ የሚሰራ OTP ያስገቡ / Mee OTP Sirrii Galchi';
      return;
    }
  }

  // OnSubmitOTPAL(): void {
  //   this.submitted7=true;

  //   if (this.form7.invalid) {
  //     
  //     this.errorMessage = 'Please Enter Valid OTP / እባክዎ የሚሰራ OTP ያስገቡ / Mee OTP Sirrii Galchi';
  //     return;
  //   }
  // }
  OnSubmitCashWithdrawlOTP(): void {
    this.submitted6 = true;
    if (this.form6.invalid) {
      this.errorMessage1 = 'Please Enter Valid OTP / እባክዎ የሚሰራ OTP ያስገቡ / Mee OTP Sirrii Galchi';
      return;
    }
  }

  OnSubmitCashDepositOTP(): void {
    this.submittedCD2 = true;
    if (this.formCD2.invalid) {
      this.errorMessage1 = 'Please Enter Valid OTP / እባክዎ የሚሰራ OTP ያስገቡ / Mee OTP Sirrii Galchi';
      return;
    }
  }

  onSubmitPC(): void {
    this.submitted4 = true;
    if (this.form4.invalid) {
      return;
    }
  }

  openModal() {
    if (this.showModalStatus == 'open-modal') {
      showModal();
    }
  }

  // hideInputCriteriaV(targetField: string) {
  //   const inputElement = document.getElementById(targetField) as HTMLInputElement;
  //   const inputValue = inputElement.value;

  //   if (inputValue.length === 13) {
  //     this.actualAccountNumber = inputValue; // Store the actual account number
  //     let maskedValue = '';
  //     for (let i = 0; i < inputValue.length - 5; i++) {
  //       maskedValue += '*';
  //     }
  //     maskedValue += inputValue.slice(-5);
  //     this.maskedAccountNumber = maskedValue; // Store the masked account number
  //     inputElement.value = maskedValue;
  //   } else {
  //     this.actualAccountNumber = ''; // Reset actualAccountNumber if not 13 digits
  //     this.maskedAccountNumber = ''; // Reset maskedAccountNumber if not 13 digits
  //   }
  // }

  hideAccountNumber: boolean = false; // Initially hide the account number

  hideInputCriteriaV(targetField: string) {
    this.hideAccountNumber = true; // Initially hide the account number
  }

  showAccountNumber: boolean = false;

  hideInputCriteria() {
    this.hideAccountNumber = !this.hideAccountNumber;

  }
  hideInputCriteria1() {
    this.hideAccountNumber = false;
  }
  showQrFeedback(){
    const modal=sessionStorage.getItem("Modal");
    console.log("modal",modal)
    if(modal=="true"){
      console.log("called1")
      showFModalFb();
    }
  }

  hideInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;

    if (inputValue.length === 13) {
      this.actualAccountNumber = inputValue; // Store the actual account number
      let maskedValue = '';
      for (let i = 0; i < inputValue.length - 5; i++) {
        maskedValue += '*';
      }
      maskedValue += inputValue.slice(-5);
      this.maskedAccountNumber = maskedValue; // Store the masked account number
      inputElement.value = maskedValue;
    } else {
      this.actualAccountNumber = ''; // Reset actualAccountNumber if not 13 digits
      this.maskedAccountNumber = ''; // Reset maskedAccountNumber if not 13 digits
    }
  }

  hideInput2(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;

    if (inputValue.length === 10) {
      this.actualMobileNumber = inputValue; // Store the actual account number
      let maskedValue = '';
      for (let i = 0; i < inputValue.length - 5; i++) {
        maskedValue += '*';
      }
      maskedValue += inputValue.slice(-5);
      this.maskedMobileNumber = maskedValue; // Store the masked account number
      inputElement.value = maskedValue;
    } else {
      this.actualMobileNumber = ''; // Reset actualAccountNumber if not 13 digits
      this.maskedMobileNumber = ''; // Reset maskedAccountNumber if not 13 digits
    }
  }

  hideInput3(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;

    if (inputValue.length === 13) {
      this.actualAccountNumber1 = inputValue; // Store the actual account number
      let maskedValue = '';
      for (let i = 0; i < inputValue.length - 5; i++) {
        maskedValue += '*';
      }
      maskedValue += inputValue.slice(-5);
      this.maskedAccountNumber1 = maskedValue; // Store the masked account number
      inputElement.value = maskedValue;
    } else {
      this.actualAccountNumber1 = ''; // Reset actualAccountNumber if not 13 digits
      this.maskedAccountNumber1 = ''; // Reset maskedAccountNumber if not 13 digits
    }
  }

  hideInput4(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;

    if (inputValue.length === 10) {
      this.actualMobileNumber1 = inputValue; // Store the actual account number
      let maskedValue = '';
      for (let i = 0; i < inputValue.length - 5; i++) {
        maskedValue += '*';
      }
      maskedValue += inputValue.slice(-5);
      this.maskedMobileNumber1 = maskedValue; // Store the masked account number
      inputElement.value = maskedValue;
    } else {
      this.actualMobileNumber1 = ''; // Reset actualAccountNumber if not 13 digits
      this.maskedMobileNumber1 = ''; // Reset maskedAccountNumber if not 13 digits
    }
  }

  focusNextInputs(inputField: HTMLInputElement, nextInputIndex: number | null) {
    if (inputField.value.length === 1 && nextInputIndex !== null) {

      const nextInput = document.querySelectorAll('.otp')[nextInputIndex - 1] as HTMLInputElement;
      nextInput.focus();
    }
  }
  focusNextInputs1(inputField: HTMLInputElement, nextInputIndex: number | null) {
    if (inputField.value.length === 1 && nextInputIndex !== null) {

      const nextInput = document.querySelectorAll('.otp')[nextInputIndex - 1] as HTMLInputElement;
      nextInput.focus();
    }
  }
  focusNextInputs2(inputField: HTMLInputElement, nextInputIndex: number | null) {
    if (inputField.value.length === 1 && nextInputIndex !== null) {

      const nextInput = document.querySelectorAll('.otp')[nextInputIndex - 1] as HTMLInputElement;
      nextInput.focus();
    }
  }
  handleBackspace(event: KeyboardEvent, inputField: HTMLInputElement) {
    if (event.key === 'Backspace' && inputField.value.length === 0) {

      const prevInput = inputField.previousElementSibling as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
        prevInput.value = '';
      }
    }
  }
  handleBackspaceCW(event: KeyboardEvent, inputField: HTMLInputElement) {
    if (event.key === 'Backspace' && inputField.value.length === 0) {

      const prevInput = inputField.previousElementSibling as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
        prevInput.value = '';
      }
    }
  }

  resetFormAndData(): void {
    clearTimeout(this.timeoutMS);
    this.errorMessagemS = '';
    this.errorMessageMS2 = '';
    this.form.reset();
    this.form3.reset();
    this.submitted = false;
    this.criteriaValue = '';
    this.MobileNumber = '';
    this.showOTP = false;
    this.otpValue = '';
    this.ministatementList = [];
    this.FirstOtp = '',
      this.SecondOtp = '',
      this.ThirdOtp = '',
      this.FourOtp = ''
  }

  resetFormChangePin(): void {
    clearTimeout(this.timeoutGT);
    this.form4.reset();
    this.submitted4 = false;
    this.MobileNumber = '';
    this.tokenData = [];
    this.showToken = false;
    this.errorMessageMP = '';
    this.router.navigate(['/Home']);
  }

  resetFormAndDataFT(): void {
    clearTimeout(this.timeoutFT);
    this.errorMessagefT1 = '';
    this.errorMessageFT5 = '';
    this.errorMessageFT4 = '';
    this.errorMessagefT2 = '';
    this.showSpinner = false;
    this.formFT.reset();
    this.formFt2.reset();
    this.formFt4.reset();
    this.formFTOTP.reset();
    this.submittedFT = false;
    this.criteriaValue = '';
    this.MobileNumber = '';
    this.showOTPFT = false;
    this.otpValue = '';
    this.FirstOTPFT = '',
      this.SecondOTPFT = '',
      this.ThirdOTPFT = '',
      this.FourOTPFT = '',
      this.form2.reset();
    this.CreditAmountft1 = '';


    this.CreditNarrativeft1 = '';
    this.GetNameFT
    this.transferft2
    this.transfer
    this.errorMessageFTA = '';
    this.MobileNumber = '';
    this.CustomerName = '';
    this.CreditAccount = '',
      this.CreditAmount = '';
    this.CreditNarrative = '';
    this.formFt2.reset();
    this.submittedFt3 = false;
    this.CreditAccountft1 = '';
    this.CreditNarrativeft1 = '';
    this.CreditAmountft1 = '';
    this.transactionDataft1 = [];
    this.showFTSuccess = false;
    this.submittedFt4 = false;

    this.form2.reset();
    this.submitted2 = false;
    this.CreditNarrative = '';
    this.DebitAccount = '';
    this.CreditAccount = '';
    this.CreditAmount = '';
    this.CustomerName = '';
    this.transactionData = [];
  }

  BackFT1() {
    showFirstModalFT();
    hideSecondModalFT();
    hideThirdModalFT()
  }
  BackFT2() {
    showSecondModalFT();
    hideFirstModalFT();
    hideThirdModalFT();
  }
  BackFT3() {
    showThirdModalFT();
    hideFirstModalFT();
    hideSecondModalFT()
  }

  BackNC1() {
    showNewCardModal();
    hideNewCardOTPModal();
  }



  resetFormAndDataCashWithdrawl(): void {
    clearTimeout(this.timeoutId);
    this.errorMessagecW = '';
    this.errorMessageCW = '';
    this.form5.reset();
    this.form6.reset();
    this.form2ndCW.reset(),
      this.form2ndCW.reset();
    this.showSpinner = false;
    this.submitted5 = false;
    this.submitted6 = false;
    this.submitted2ndCW = false;
    this.AccountId = '';
    this.MobileNumber = '';
    this.errorMessage9 = '';
    this.showOTPCashWithdrawl = false;
    this.CustomerName = '',
      this.CustomerNameCW = '',
      this.AmountCW = ''
    this.errorMessagecW2 = '',
      this.FirstOTP = '',
      this.SecondOTP = '',
      this.ThirdOTP = '',
      this.FourOTP = '',
      this.tokenData1 = '',
      this.showToken1 = false,
      this.onSubmitCW

    this.AmountWithdrawlorDeposit = ''
  }



  resetFormAndDataCashDeposit(): void {
    clearTimeout(this.timeoutCD);
    this.errorMessagecd = '';
    this.errorMessagecd = '';
    this.formCD.reset();
    this.formCD2.reset();
    this.formCD3.reset();
    this.submittedCD = false;
    this.submittedCD2 = false;
    this.submittedCD3 = false;
    this.AccountId = '';
    this.PhoneNumber = '';
    this.showOTPCashDeposit = false;
    this.MobileNumber = '';
    this.CustomerName = ''
    this.NameCD = '';
    this.CustomerNameCD = '',
      this.name = '',
      this.DepositerBy = '',
      this.OTPSubmitCD
    this.FirstOTP = '',
      this.SecondOTP = '',
      this.ThirdOTP = '',
      this.FourOTP = '',
      this.tokenData1 = '',
      this.showToken1 = false,
      this.AmountWithdrawlorDeposit = ''
  }

  BackCD1() {
    showFCashDModal();
    hideSecondCashDModal();
  }
  //   resetBillPayment() {

  //   this.form15.reset(),
  //     this.form7.reset(),
  //     this.ALOTPform.reset(),
  //     this.form15Account.reset(),
  //     this.formALradio.reset(),
  //     this.showSpinner=false;
  //     this.submitted15 = false,
  //     this.submitted15Account = false,
  //     this.submitted7 = false,

  //     this.PNR = '',
  //     this.CustomerName = '',
  //     this.AlCustomerNameAcc='',
  //     this.CustomerNameALAcc='',
  //     this.AccountId = '',
  //     this.tokenData2 = '',
  //     this.showAccountDiv = false,
  //     this.showToken3 = false,
  //     this.formALradio.patchValue({
  //       transactionType1: 'Cash'
  //     });
  //           // this.selectedTransactionType1 = ''
  //   this.errorMessage5 = '',
  //     this.errorMessageAL = '',


  //     this.ShowCashdiv = true,
  //     this.showOTPAL = false,
  //     this.showToken3 = false,
  //     this.formSubmittedAirline = false,
  //     this.showToken3Account = false,
  //     this.formsubmittedAl1 = false,
  //     this.showAccountDiv = false;
  //     this.generateOTPAL


  // }
  resetBillPayment() {
    clearTimeout(this.timeoutAL1);
    clearTimeout(this.timeoutAL2);
    this.errorMessageaL = '';
    this.errorMessageAL6 = '';
    this.errorMessageAL1 = '';
    this.AirlineNameACC = '';
    this.AirlineAmount1 = '';
    this.AirlineAmountCash = '';
    this.AirlineName = '';
    this.formALCash.reset(),
      this.errorMessagePNR = '';
    this.errorMessageAL3 = '';

    this.form15.reset(),
      this.form7.reset(),
      this.ALOTPform.reset(),
      this.form15Account.reset(),
      this.formALradio.reset(),
      this.showSpinner = false;
    this.submitted15 = false,
      this.submitted15Account = false,
      this.submitted7 = false,

      this.PNR = '',
      this.CustomerName = '',
      this.AlCustomerNameAcc = '',
      this.CustomerNameALAcc = '',
      this.AccountId = '',
      this.tokenData2 = '',
      this.showAccountDiv = false,
      this.showToken3 = false,
      this.formALradio.patchValue({ transactionType1: 'Cash' });

    // this.selectedTransactionType1 = ''
    this.errorMessage5 = '',
      this.errorMessageAL = '',
      this.ShowCashdiv = true,
      this.showOTPAL = false,
      this.showToken3 = false,
      this.formSubmittedAirline = false,
      this.showToken3Account = false,
      this.formsubmittedAl1 = false,
      this.showAccountDiv = false;
    this.generateOTPAL
    this.Airlines = '';
    this.Passenger = '';
    this.amount = '';
    this.AirlineAmount = '';
    this.AirlineName = '';


  }
  BackAirlineCash1() {
    showSecondBillpaymentModal();
    hideThirdBillpaymentModal();
  }

  BackAirlineAccount1() {
    showSecondBillpaymentModal();
    hideFourthBillpaymentModal();
  }


  BackAirlineAccount2() {
    // this.errorMessageAL1='';
    showFourthBillpaymentModal();
    hideFifthBillpaymentModal();
  }

  resetFormAndDataTB(): void {
    clearTimeout(this.timeoutTB1);
    clearTimeout(this.timeoutTB2);
    this.errorMessageTB3 = '';
    this.errorMessagetB2 = '';
    this.errorMessagetB = '';
    this.errorMessageTB2 = '';
    this.formTelebirrOther.reset();
    this.formTelebirrOther1.reset();
    this.errorMessageTB = '';
    this.errorMessageTB1 = '';
    this.submittedTB3 = false;

    this.MobileNumberOtherTB1 = '';
    this.CustomerNameOtherTB2 = '';
    this.CreditAmountTB3 = '';
    this.CreditAccountTB1 = '';
    this.MobileNumberTB1 = '';
    this.CustomerNameOtherTB1 = '';
    this.formTelebirr.reset();
    this.formTelebirr1.reset();
    this.CreditAccountTB1 = '';
    this.MobileNumberTB1 = '';
    this.CreditAmountTB2 = '';
    this.CustomerName = '';
    this.CustomerNameTB = '';
    this.GetNameTB
    this.GetNameOtherTB
    this.showTBSuccess = false;
    this.isFieldsDisabled = true;
    this.submittedTB5 = false;
    this.submittedTB1 = false;
    this.submittedTB4 = false;

    this.showTBSuccess1 = false;
    this.submittedTB2 = false;
    // this.transactionTypeSelf = 'Self',

    this.formTelebirr.patchValue({
      transactionTypeSelf: 'Self'
    });
    // this.selectedtransactionTypeSelf = ''
    this.formTelebirr2.reset();
    this.CreditAmountTB2 = '';
    this.CreditAmountTB2 = '';

    this.CustomerNameTB1 = '';
    this.errorMessageFT3 = '';
    this.ShowSelfdiv1 = true;
    this.showOtherDiv = false;

  }
  BackTeleBirrOther1() {
    hideSecondTelebirrModal();
    showFirstTelebirrModal();
  }
  transfer() {

    this.showSpinner = false;
    this.MobileNumber = this.formFT.value.MobileNumber;

    let val: any = {
      ServiceName: this.SelectedServices,
      BranchID: this.BranchID,
      PriorityID: this.GPriorityID,
      LaguageID: this.LanguageId,
      TokenDetails: "",
      MsIsdnNo: "",
      MissionId: 1,
      ServiceID: this.SelectedServicesID,
    }



    this.service.GetTokenNo(val).subscribe(data => {

      if (data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]) {
        // alert("Your Token Number is: " + data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"] );
        this.sendWhatApp(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"],this.formFT.value.MobileNumber);
       // this.sendSms(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]);
        this.tokenData2 = data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"];
        this.currentDate = new Date();

        this.sla();
        //Get TOken ID;
        let val2: any = {
          TokenNo: this.tokenData2,
          ServiceId: this.SelectedServicesID

        }


        this.service.GetTokenId(val2).subscribe(data => {
          this.dataList = data;


          this.TokenId = this.dataList['Table'][0]['TokenId'];
          this.SelectedTokenID = this.SelectedService.TokenId;

          var val3 = {
            ServiceId: this.SelectedServicesID,
            BranchId: this.BranchID,
            TokenId: this.TokenId,

            field_1: "FundTransfer",
            field_2: this.formFT.value.criteriaValue,
            field_3: this.CustomerNameSenderFT,
            field_4: this.formFt4.value.CreditAmountft1,
            field_8: this.formFT.value.MobileNumber,
            field_9: this.CustomerName,
            field_10: this.formFt2.value.CreditAccountft1
          };



          this.service.AddtokenTransaction(val3).subscribe((data) => {


           

            let val:any={
              CurrentDate:this.currentDate,
              BranchName:this.BranchName,
              SelectedServices:this.SelectedServices,
              tokenData:this.tokenData2,
              AverageWait:this.AverageWait,
              TokenId:this.TokenId,
              BranchId:this.BranchID,
              SelectedServiceCaption:this.SelectedServiceCaption
            };
            
            hideThirdModalFT();
            hideSecondModalFT();
            hideFirstModalFT();
            sessionStorage.setItem("TokenDetails",JSON.stringify(val));
            this.router.navigate(['/signalToken']);
            // this.showFTSuccess = true;

            // this.FeedbackStatus();


            // setTimeout(() => {
            //   if (this.FeedbackActive === "True") {
            //                     showFModalFb();
            //   }
            // }, 5000);
            
            // this.triggerTimeoutFT();

          });


        })
      }
    })



  }
  triggerTimeoutFT() {
    this.timeoutFT = setTimeout(() => {
      hideThirdModalFT();
      hideSecondModalFT();
      hideFirstModalFT();
      this.resetFormAndDataFT();
    }, 5000);
  }


  transferft2() {
    this.submittedFt4 = true;

    if (this.formFt2.invalid && this.formFt4.invalid) {
      return;
    }

    const creditAccountValue = this.formFt2.get('CreditAccountft1')?.value;
    const creditAmountValue = this.formFt4.get('CreditAmountft1')?.value;
    const creditNarrativeValue = this.formFt4.get('CreditNarrativeft1')?.value;

    // Patch values to form2
    this.form2.patchValue({ CreditAccount: creditAccountValue });
    this.form2.patchValue({ CreditAmount: creditAmountValue });
    this.form2.patchValue({ CreditNarrative: creditNarrativeValue });
    // hideSecondModalFT();
    // showThirdModalFT();

    this.formSubmitted = true;
    const currentBalanceInt = parseInt(this.CurrentBalanceFT.replace(/,/g, '').split('.')[0]);

    if (currentBalanceInt >= this.formFt4.value.CreditAmountft1) {

      hideSecondModalFT();
      showThirdModalFT();
      return;
    }
    else {
      this.errorMessageFTA = this.getValueForCaption('Amountisgreaterthanthecurrentbalance');
    }
  }

  OTPSubmit() {

    this.OnSubmitOTP();
    if (this.form3.invalid) {
      // 
      this.errorMessage = 'Please enter a valid OTP. / እባክዎ የሚሰራ OTP ያስገቡ';
      return;
    }

    this.showSpinner = true;
    this.getMinistatementdata();
    hideFModal();
    showSecondModal();
  }





  OTPSubmitAL() {

    const value = this.form7.get('criteriaValueAL')?.value;
    this.formALAccount.patchValue({ accountNumber: value });
    // this.OnSubmitOTPAL();
    this.submittedAL = true;
    this.formsubmittedAl1 = true;


    // if (this.ALOTPform.invalid) {
    //   
    //   this.errorMessageAL = 'Please enter a valid OTP. / እባክዎ የሚሰራ OTP ያስገቡ';
    //   return;
    // }
    // 
    // this.getMinistatementdata();
    // hideSecondBillpaymentModal();
    // showFourthBillpaymentModal();
  }

  OTPSubmitFT() {
    const value = this.formFT.get('criteriaValue')?.value;
    this.form2.patchValue({ CustomerName: value });

    this.submittedFT2 = true;
    if (this.formFTOTP.invalid) {
      //  
      this.errorMessage = 'Please enter a valid OTP. / እባክዎ የሚሰራ OTP ያስገቡ';
      return;
    }
    // this.showSpinner = true;
    // this.getMinistatementdata();
    hideFirstModalFT();
    showSecondModalFT();
    this.getAccountBalanceFT();

  }
  GetNameTB() {
   // this.submittedTB2 = true;


    // if (this.formTelebirr1.invalid) {
    //   return;
    // }
    //this.showSpinner = true;
    this.getAccountBalanceTB();


  }


  getCustomerinfoTB() {
    let val: any = {
      AccountId: this.formTelebirr1.value.CreditAccountTB1,

    };
    this.CustomerNameTB="Brijesh";
    this.AccountId="1234567890123"
    this.isFieldsDisabled = false;
    this.showSpinner = false;

    // this.service.CustomerInfo(val).subscribe(data => {

    //   if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {

    //     // if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {

    //     // if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {
    //     this.CustomerNameTB = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"];
    //     // this.PhoneNumber = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerDetails"][0]["phoneNumbers"][0]["phoneNumber"];
    //     this.AccountId = data["CustomerInfoResponse"]["CustomerInfo"][0]["accountId"];

    //     this.isFieldsDisabled = false;
    //     if (typeof this.CustomerName === 'undefined') {
    //       this.errorMessageTB = '';
    //       console.error("Error: CustomerName is undefined. Please provide a valid customer name.");
    //       this.errorMessage = "wrong account number"
    //     }
    //     else {
    //       this.errorMessageTB = '';
    //       this.errorMessage = '';
    //       this.isFieldsDisabled = false;
    //     }
    //     // 

    //   } else {

    //     this.errorMessageTB = 'Invalid account number. Please enter the correct account number.';


    //     this.isFieldsDisabled = true;
    //     // this.failureStatus2 = true;
    //     //   const failure = data["CustomerInfoResponse"]["ESBStatus"]["Status"];
    //     //   this.failure = failure;


    //   }
    // },
    //   error => {

    //     this.showSpinner = false;
    //     this.errorMessagetB = 'Something went wrong. Try again later';

    //     console.error('An error occurred:', error);
    //     // Handle the error here, such as showing a toast message or displaying an error dialog.
    //   }
    // ).add(() => {
    //   this.showSpinner = false;
    // });
  }

  GetNameOtherTB() {

    this.submittedTB3 = true;
    // this.getAccountBalanceTB();


    // if (this.formTelebirrOther.invalid) {

    //   return;

    // }

    this.showSpinner = true;


    let val: any = {
      AccountId: this.formTelebirrOther.value.CreditAccountOtherTB,

    };
    this.CustomerNameOtherTB1="Murtaza";
    this.AccountId="0987654321321";
    this.isFieldsDisabled = false;
    this.showSpinner = false;
    this.getAccountBalanceTB();
    // this.service.CustomerInfo(val).subscribe(data => {

    //   if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {

    //     // if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {
    //     this.CustomerNameOtherTB1 = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"];
    //     // this.PhoneNumber = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerDetails"][0]["phoneNumbers"][0]["phoneNumber"];
    //     this.AccountId = data["CustomerInfoResponse"]["CustomerInfo"][0]["accountId"];

    //     this.isFieldsDisabled = false;

    //     this.getAccountBalanceTB();
    //     if (typeof this.CustomerName === 'undefined') {
    //       this.errorMessageTB1 = '';

    //       console.error("Error: CustomerName is undefined. Please provide a valid customer name.");
    //       this.errorMessage = "wrong account number"
    //     }
    //     else {
    //       this.errorMessageTB1 = '';
    //       this.errorMessage = '';
    //       this.isFieldsDisabled = false;
    //     }
    //     // 

    //   } else {

    //     this.errorMessageTB1 = 'Invalid account number. Please enter the correct account number.';


    //     this.isFieldsDisabled = true;



    //     // this.failureStatus2 = true;
    //     //   const failure = data["CustomerInfoResponse"]["ESBStatus"]["Status"];
    //     //   this.failure = failure;


    //   }
    // },
    //   error => {

    //     this.showSpinner = false;
    //     this.errorMessagetB2 = 'Something went wrong. Try again later';

    //     console.error('An error occurred:', error);
    //     // Handle the error here, such as showing a toast message or displaying an error dialog.
    //   }).add(() => {
    //     this.showSpinner = false;
    //   });
  }



  GetNameFT() {

    this.fromAccountToAccoutError = false;
    this.showSpinner = true;

    this.submittedFt3 = true;
    // this.showSpinner = true;

    if (this.formFt2.invalid) {
      this.showSpinner = false;
      return;
    }

    if(this.formFt2.value.CreditAccountft1 == this.formFT.value.criteriaValue){      
      this.fromAccountToAccoutError = true;
      this.errorMessageFT5 = false;
      this.showSpinner = false;
      return;
    }

    let val: any = {
      AccountId: this.formFt2.value.CreditAccountft1,
    };


    this.CustomerName ="Nairobi Dreamer"
    // this.PhoneNumber = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerDetails"][0]["phoneNumbers"][0]["phoneNumber"];
    this.AccountId = 1234567890124;
   
    this.showSpinner = false;
    this.errorMessageFT5 = '';
          this.errorMessage = '';
          this.isFieldsDisabled = false;
    // this.service.CustomerInfo(val).subscribe(data => {

    //   if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {

    //     // if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {
    //     this.CustomerName = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"];
    //     // this.PhoneNumber = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerDetails"][0]["phoneNumbers"][0]["phoneNumber"];
    //     this.AccountId = data["CustomerInfoResponse"]["CustomerInfo"][0]["accountId"];

    //     if (typeof this.CustomerName === 'undefined') {

    //       console.error("Error: CustomerName is undefined. Please provide a valid customer name.");
    //       this.errorMessage = "wrong account number"
    //     } else {
    //       this.errorMessageFT5 = '';
    //       this.errorMessage = '';
    //       this.isFieldsDisabled = false;
    //     }
    //     // 

    //   } else {
    //     this.errorMessageFT5 = 'Invalid account number. Please enter the correct account number.';

    //     this.isFieldsDisabled = true;
    //     // this.failureStatus2 = true;
    //     //   const failure = data["CustomerInfoResponse"]["ESBStatus"]["Status"];
    //     //   this.failure = failure;

    //     // this.showSpinner = false;

    //   }
    // }).add(() => {
    //   this.showSpinner = false;
    // });
  }




  GetNameOtherTB1() {

    this.submittedTB4 = true;
    this.getAccountBalanceTB1();


    this.showSpinner = true;




    let val: any = {
      Identifier: this.formTelebirrOther1.value.MobileNumberOtherTB1,

    };
    this.FirstName="Vijay";
    this.MiddleName="Avdhut";
    this.LastName="wakle";
    this.formTelebirrOther1.patchValue({
      CustomerNameOtherTB2: `${this.FirstName} ${this.MiddleName} ${this.LastName}`
    });
    this.showSpinner = false;

    // this.service.TelebirrName(val).subscribe(data => {





    //   if (data["CustomerBriefInfoResponse"] && data["CustomerBriefInfoResponse"]["KYCData"] && data["CustomerBriefInfoResponse"]["KYCData"]) {

    //     // if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {
    //     this.FirstName = data["CustomerBriefInfoResponse"]["KYCData"]["KYC Documents to be Uploaded Business License"];
    //     // this.PhoneNumber = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerDetails"][0]["phoneNumbers"][0]["phoneNumber"];
    //     this.MiddleName = data["CustomerBriefInfoResponse"]["KYCData"]["accounKYC Customer Additional Info Apply Visa Pan FlagtId"];
    //     this.LastName = data["CustomerBriefInfoResponse"]["KYCData"]["accounKYC Customer Additional Info Apply Visa Pan FlagtId"];


    //     // 

    //   } else {
    //     this.errorMessageTB2 = 'Invalid Phone Number. Please enter the correct Phone number.';


    //     this.isFieldsDisabled = true;
    //     // this.failureStatus2 = true;
    //     //   const failure = data["CustomerInfoResponse"]["ESBStatus"]["Status"];
    //     //   this.failure = failure;


    //   }
    // }).add(() => {
    //   this.showSpinner = false;
    // });

  }



  OTPSubmit1() {


    // this.OnSubmitCashWithdrawlOTP();
    // if (this.form5.invalid) {
    //   // this.errorMessage1 = 'Please enter a valid OTP. / እባክዎ የሚሰራ OTP ያስገቡ / Mee OTP sirrii tae galchi';
    //   return;
    // }
    this.showSpinner = true;
    this.getCustomerinfo();


    // hideFCashWModal();
    // showSecondCashWModal();
    // this.showSpinner=false;
  }



  getCustomerinfo() {
    let val: any = {
      AccountId: this.form5.value.AccountIdCW,
    };
    this.CustomerNameCW = "Mombasa Wave";
    this.AccountId = 9087654321345;
    this.getAccountBalance();

    // this.service.CustomerInfo(val).subscribe(data => {

    //   if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {

    //     // if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {
    //     this.CustomerNameCW = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"];
    //     this.AccountId = data["CustomerInfoResponse"]["CustomerInfo"][0]["accountId"];

    //     this.getAccountBalance();

    //     //  this.showSpinner=false;

        
    //   } else {
    //     this.showSpinner = false;
    //     this.errorMessageCW = 'Invalid account number. Please enter the correct account number.';


    //   }
    // },
    //   error => {

    //     this.showSpinner = false;
    //     this.errorMessagecW = 'Something went wrong. Try again later';

    //     console.error('An error occurred:', error);
    //     // Handle the error here, such as showing a toast message or displaying an error dialog.
    //   }
    // ).add(() => {
    //   //this.showSpinner = false;
    // });
  }

  BackCW1() {
    showFCashWModal();
    hideSecondCashWModal();
  }
  OTPSubmitCD() {


    this.OnSubmitCashDepositOTP();
    if (this.formCD.invalid) {
      // this.errorMessage1 = 'Please enter a valid OTP. / እባክዎ የሚሰራ OTP ያስገቡ / Mee OTP sirrii tae galchi';

      return;
    }

    this.showSpinner = true;
    // hideFCashDModal();
    // showSecondCashDModal();
    // this.showSpinner = false;
    this.getCustomerinfoCD();

  }

  getCustomerinfoCD() {
    let val: any = {
      AccountId: this.formCD.value.AccountId,
    };
    this.CustomerNameCD = "Tenca Climbero"
    this.AccountId = 1234567890345
    this.showSpinner = false;
    hideFCashDModal();
         showSecondCashDModal();
           this.errorMessagecd = '';

    // this.service.CustomerInfo(val).subscribe(
    //   data => {
    //     if (data["CustomerInfoResponse"] && data["CustomerInfoResponse"]["CustomerInfo"] && data["CustomerInfoResponse"]["CustomerInfo"][0] && data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"]) {
    //       this.CustomerNameCD = data["CustomerInfoResponse"]["CustomerInfo"][0]["customerName"];
    //       this.AccountId = data["CustomerInfoResponse"]["CustomerInfo"][0]["accountId"];

    //       hideFCashDModal();
    //       showSecondCashDModal();
    //       this.errorMessagecd = '';
    //     } else {
    //       this.errorMessagecd = 'Invalid account number. Please enter the correct account number.';
    //     }
    //   },
    //   error => {

    //     this.errorMessagecd = 'Something went wrong. Try again later';
    //     // Handle the error here, such as showing a toast message or displaying an error dialog.
    //   }
    // ).add(() => {
    //   this.showSpinner = false;
    // });
  }


  // PaymentProcessmodal --------------------------------------------------------------------------------------------------->

  onSubmitPP(): void {
    this.submitted11 = true;
    if (this.form11.invalid) {

      return;
    }
  }

  onSubmitPP2(): void {
    this.submitted13 = true;
    if (this.form13.invalid) {

      return;
    }
  }

  generatePPOTP() {
    if (this.form11.invalid) {
      this.showPPOTP = false;
      return;
    } else {
      this.showPPOTP = true;
    }
  }

  PPmodel1() {
    this.form11.reset();
    this.form12.reset();
    this.form13.reset();
    this.showPPOTP = false;
    this.PPFirstOTP = '',
      this.PPSecondOTP = '',
      this.PPThirdOTP = '',
      this.PPFourthOTP = '';
    this.showPPToken = false;
    this.PaymentProcessTab = "Transfer To Other Bank";
    hidePaymentProcessModal1();
    showPaymentProcessModal2();

  }

  PPmodel2() {
    this.PaymentProcessTab = "CPO";
    hidePaymentProcessModal1();
    showPaymentProcessModal2();

  }

  PPmodel3() {
    this.OnSubmitPPOTP();
    if (this.form12.invalid) {
      // 
      this.errorMessage12 = 'Please enter a valid OTP. / እባክዎ የሚሰራ OTP ያስገቡ';
      return;
    }
    this.showSpinner = false;

    hidePaymentProcessModal2();
    showPaymentProcessModal3();
  }

  OnSubmitPPOTP(): void {
    this.submitted12 = true;
    if (this.form12.invalid) {
      this.errorMessage12 = 'Please Enter Valid OTP / እባክዎ የሚሰራ OTP ያስገቡ / Mee OTP Sirrii Galchi';
      return;
    }
  }

  resetFormPaymentProcess(): void {
    this.form11.reset();
    this.form12.reset();
    this.form13.reset();

    this.submitted11 = false;
    this.submitted12 = false;
    this.submitted13 = false;
    this.criteriaValue = '';
    // this.BBcriteriaValue = '';
    this.MobileNumber = '';
    this.errorMessagePP7 = '';

    this.showPPOTP = false;
    this.PPotpValue = '';
    this.PPFirstOTP = '',
      this.PPSecondOTP = '',
      this.PPThirdOTP = '',
      this.PPFourthOTP = '';
    this.criteriaValue = '';
    this.BBcriteriaValue = '';
    this.BenificiaryNamePP = '';
    this.showPPToken = false;
    this.tokenDataPP = ''
  }

  tokenTransactionPP() {
    if (
      this.form13 &&
      this.form13.get('criteriaValue')!.value &&
      this.form13.get('BenificiaryNamePP')!.value &&
      this.form13.get('PPacceptTerms') &&
      this.form13.get('PPacceptTerms')!.value
    ) {

      //create Token
      let val: any = {
        ServiceName: this.SelectedServices,
        BranchID: this.BranchID,
        PriorityID: this.GPriorityID,
        LaguageID: this.LanguageId,
        TokenDetails: "",
        MsIsdnNo: "",
        MissionId: 1,
        ServiceID: this.SelectedServicesID,
      }



      this.service.GetTokenNo(val).subscribe(data => {

        if (data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]) {
          // alert("Your Token Number is: " + data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"] );
           this.sendWhatApp(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]);
        //  this.sendSms(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]);
          this.tokenDataPP = data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"];



          //Get TOken ID;
          let val2: any = {
            TokenNo: this.tokenDataPP,
            ServiceId: this.SelectedServicesID
          }


          this.service.GetTokenId(val2).subscribe(data => {
            this.dataList = data;


            this.TokenId = this.dataList['Table'][0]['TokenId'];
            this.SelectedTokenID = this.SelectedService.TokenId;

            var val3 = {
              ServiceId: this.SelectedServicesID,
              BranchId: this.BranchID,
              TokenId: this.TokenId,
              field_1: this.PaymentProcessTab,
              field_2: this.actualAccountNumber,
              field_3: this.form13.value.BenificiaryNamePP,
              field_4: 1000,
              field_8: "Abyssina Bank",
              field_9: this.CustomerName,
            };



            this.service.AddtokenTransaction(val3).subscribe((data) => {

              this.showPPToken = true;
              // showChequeProcessModal4();

            });


          },)
        }
      },)
    }
    else {
      this.errorMessagePP7 = 'required fields are empty, or checkbox not checked.';

    }
  }

  //payment process ended------------------------------------------------------------------------------------------------------->

  //cheque process modal------------------------------------------------------------------------------------------------------------

  onSubmitCP(): void {
  //  this.submitted7 = true;
    // if (this.form7.invalid) {

    //   return;
    // }
  }



  resetFormChequeProcess3(): void {
    this.form8.reset();
    this.form7.reset();
    this.CPOTPform.reset();
    this.submitted7 = false;
    this.submitted9 = false;
    this.criteriaValue = '';
    this.MobileNumber = '';
    this.errorMessageCP7 = '';
    this.showCPOTP = false;
    this.CPotpValue = '';
    this.CPFirstOTP = '',
      this.CPSecondOTP = '',
      this.CPThirdOTP = '',
      this.CPFourthOTP = '';
    this.CheaqueLeaf = '';
    this.CheaqueBook = '';
    this.CheaqueBookAddress = '';
    this.showCPToken = false;
    this.tokenDataCP = ''
  }

  OnSubmitCPOTP(): void {
    this.submitted9 = true;
    if (this.CPOTPform.invalid) {
      this.errorMessage2 = 'Please Enter Valid OTP / እባክዎ የሚሰራ OTP ያስገቡ / Mee OTP Sirrii Galchi';
      return;
    }
  }

  generateCPOTP() {
    if (this.form7.invalid) {
      this.showCPOTP = false;
      return;
    } else {
      this.showCPOTP = true;
    }
  }

  CPModal3() {
    this.OnSubmitCPOTP();
    if (this.CPOTPform.invalid) {
      this.errorMessage2 = 'Please enter a valid OTP. / እባክዎ የሚሰራ OTP ያስገቡ / Mee OTP sirrii tae galchi';
      return;
    }
    this.showSpinner = false;


    hideChequeProcessModal2();
    showChequeProcessModal3();


  }
  CPModal2() {
    // this.OnSubmitCashWithdrawlOTP();
    // if (this.form6.invalid) {
    //   this.errorMessage1 = 'Please enter a valid OTP. / እባክዎ የሚሰራ OTP ያስገቡ / Mee OTP sirrii tae galchi';
    //   return;
    // }
    // this.showSpinner = true;

    // this.getCustomerinfo();
    this.form7.reset();
    this.form8.reset();
    this.CPOTPform.reset();

    this.showCPOTP = false;
    this.CPFirstOTP = '',
      this.CPSecondOTP = '',
      this.CPThirdOTP = '',
      this.CPFourthOTP = '';
    this.showCPToken = false;
    hideChequeProcessModal1();
    showChequeProcessModal2();

  }
  CPModal4() {
    // this.OnSubmitCashWithdrawlOTP();
    // if (this.form6.invalid) {
    //   this.errorMessage1 = 'Please enter a valid OTP. / እባክዎ የሚሰራ OTP ያስገቡ / Mee OTP sirrii tae galchi';
    //   return;
    // }
    // this.showSpinner = true;

    // this.getCustomerinfo();
    hideChequeProcessModal3();
    showChequeProcessModal4();
    // this.resetFormChequeProcess3();


  }
  GenerateTokenCP() {
   
    this.MobileNumber = this.form4.value.MobileNumber;
    //this.generateToken(this.SelectedService)
    this.sla();
    
    let val: any = {
      ServiceName: this.SelectedServices,
      BranchID: this.BranchID,
      PriorityID: this.GPriorityID,
      LaguageID: this.LanguageId,
      TokenDetails: "",
      MsIsdnNo: "",
      MissionId: 1,
      ServiceID: this.SelectedServicesID,
    }

    this.service.GetTokenNo(val).subscribe(data => {

      if (data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]) {
        // alert("Your Token Number is: " + data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"] );
        this.sendWhatApp(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]);
        //this.sendSms(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]);
        this.tokenData = data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"];

        //this.generateTokenID(this.SelectedService);
        this.currentDate = new Date();
       // this.showToken = true;

        this.FeedbackStatus();
        let val: any = {
          TokenNo: this.tokenData,
          ServiceId: this.SelectedServicesID
        }
        this.service.GetTokenId(val).subscribe(data => {
          this.dataList = data;
    
          this.TokenId = this.dataList['Table'][0]['TokenId'];
         
          this.SelectedTokenID = this.SelectedService.TokenId;
          // 
          let val:any={
            CurrentDate:this.currentDate,
            BranchName:this.BranchName,
            SelectedServices:this.SelectedServices,
            tokenData:this.tokenData,
            AverageWait:this.AverageWait,
            TokenId:this.TokenId,
             BranchId:this.BranchID, 
             SelectedServiceCaption:this.SelectedServiceCaption
          };
          //let encryptedTokenDetails=CryptoJS.AES.encrypt(JSON.stringify(val),"SmartBranchDae").toString()
          sessionStorage.setItem("TokenDetails",JSON.stringify(val));
          this.router.navigate(['/signalToken']);
          // this.updateToken(this.TokenId);
        },)

        // setTimeout(() => {
        //   if (this.FeedbackActive === "True") {
        //                 showFModalFb();
        //   }
        // }, 5000);
      }
      // setTimeout(() => {
      //   hideFirstModalCP();
      //   this.resetFormChangePin();
      // }, 10000);  
      // this.triggerTimeoutGT();
    },
      error => {
        // Handle the error here

        this.showSpinner = false;
        this.errorMessageMP = 'Something went wrong. Try again later';
      }
    );
   
  }

  tokenTransactionCP() {
    if (
      this.form8 &&
      this.form8.get('CheaqueLeaf')!.value &&
      this.form8.get('CheaqueBook')!.value &&
      this.form8.get('acceptTerms') &&
      this.form8.get('acceptTerms')!.value
    ) {

      //create Token
      let val: any = {
        ServiceName: this.SelectedServices,
        BranchID: this.BranchID,
        PriorityID: this.GPriorityID,
        LaguageID: this.LanguageId,
        TokenDetails: "",
        MsIsdnNo: "",
        MissionId: 1,
        ServiceID: this.SelectedServicesID,
      }



      this.service.GetTokenNo(val).subscribe(data => {

        if (data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]) {
          // alert("Your Token Number is: " + data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"] );
           this.sendWhatApp(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]);
          //this.sendSms(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]);
          this.tokenDataCP = data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"];



          //Get TOken ID;
          let val2: any = {
            TokenNo: this.tokenDataCP,
            ServiceId: this.SelectedServicesID
          }


          this.service.GetTokenId(val2).subscribe(data => {
            this.dataList = data;


            this.TokenId = this.dataList['Table'][0]['TokenId'];
            this.SelectedTokenID = this.SelectedService.TokenId;

            var val3 = {
              // criteriaValue:this.actualAccountNumber,
              ServiceId: this.SelectedServicesID,
              BranchId: this.BranchID,
              TokenId: this.TokenId,
              field_1: this.selectedTransactionType,
              field_2: this.actualAccountNumber,
              field_10: this.form8.value.CheaqueLeaf,
              field_11: this.form8.value.CheaqueBook,//amount
              field_12: this.form8.value.CheaqueBookAddress,
            };



            this.service.AddtokenTransaction(val3).subscribe((data) => {

              this.showCPToken = true;
              // showChequeProcessModal4();

            });


          },)
        }
      },)
    }
    else {
      this.errorMessageCP7 = 'required fields are empty, or checkbox not checked.';

    }
  }

  onInputChange(inputFieldName: string, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;

    // Limit the value to two digits
    if (inputValue.length > 2) {
      inputElement.value = inputValue.slice(0, 2);

      // Show error message based on the input field
      if (inputFieldName === 'CheaqueLeaf') {
        this.showLeafErrorMessage = true;
      } else if (inputFieldName === 'CheaqueBook') {
        this.showBookErrorMessage = true;
      }
    } else {
      // Hide error message when input is valid
      if (inputFieldName === 'CheaqueLeaf') {
        this.showLeafErrorMessage = false;
      } else if (inputFieldName === 'CheaqueBook') {
        this.showBookErrorMessage = false;
      }
    }
  }
  //cheque process ended------------------------------------------------------------------------------------------


  data2() {
    this.generateToken(this.SelectedServices)
    let val: any = {
      CreditNarrative: this.form2.value.CreditNarrative,
      DebitAccount: this.form2.value.DebitAccount,
      CreditAccount: this.form2.value.CreditAccount,
      CreditAmount: this.form2.value.CreditAmount,
    };

    this.service.FundTransfer(val).subscribe(
      data => {
        this.updateToken(this.TokenId);
        if (data && data["FundTransferResponse"] && data["FundTransferResponse"]["FUNDSTRANSFERType"]) {
          this.transactionData = data["FundTransferResponse"]["FUNDSTRANSFERType"];
          this.failureStatus2 = false;

        }
        else {
          this.failureStatus2 = true;
          const failure = data["FundTransferResponse"]["ESBStatus"]["Status"];
          this.failure = failure;


        }
      }).add(() => {
        this.showSpinner = false;
      });
  }


  getParentServices() {

    let val = {
      ParentService: "",
      IsBack: true,
      BranchID: this.BranchID,
      LaguageID: this.LanguageId
    }

    this.service.GetChildServices(val).subscribe(data => {


      if (data["Body"]["GetChildServicesResult"]["GetChildServices"]["Service"]) {
        this.showLanguage = false;
        var Services = data["Body"]["GetChildServicesResult"]["GetChildServices"]["Service"];
        this.Services = this.modifyPropertyNames(Services);

        this.updateServices();
      }
    })

  }

  getChildServices() {

    let val = {
      ParentService: this.SelectedServices,
      IsBack: false,
      BranchID: this.BranchID,
      LaguageID: this.LanguageId
    }

    this.service.GetChildServices(val).subscribe(data => {


      if (data["Body"]["GetChildServicesResult"]["GetChildServices"]["Service"]) {
        this.showLanguage = false;
        var Services = data["Body"]["GetChildServicesResult"]["GetChildServices"]["Service"];
        this.Services = this.modifyPropertyNames(Services);

        this.updateServices();
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
  ParentserviceClick(service: any) {
    this.SelectedService = service;
    this.SelectedServices = service.ServiceName;
    this.SelectedServicesID = service.ServiceId;

    if (service.ServiceName == "Coop Alhuda") {

      this.getChildServices();
    }
    else if (service.ServiceName == "Conventional") {
      this.getChildServices();
    }
    else {
      this.SelectedService = service;

    }

  }

  // serviceClick(service: any) {
  //   this.SelectedService = service;
  //   this.SelectedServices = service.ServiceName;
  //   this.SelectedServicesID = service.ServiceId;

  //   if (service.ServiceName == "Coop Alhuda") {

  //     this.getChildServices();
  //     this.isParentServiceClicked = true;
  //   }
  //   else if (service.ServiceName == "Conventional") {
  //     this.getChildServices();
  //     this.isParentServiceClicked = true;
  //   }
  //   else if (service.ServiceName == "Statement/AccBalance-AL" || service.ServiceName == "Statement/AccBalance-COV") {
  //     showFModal();

  //   }
  //   else if (service.ServiceName == "FundTransfer-AL" || service.ServiceName == "FundTransfer-COV") {
  //     showFirstModalFT();
  //   }
  //   else if (service.ServiceName == "Feedback-AL" || service.ServiceName == "Feedback-COV") {
  //     showFModalFb();
  //   }
  //   else if (service.ServiceName == "PaymentProcess") {
  //     showPaymentProcessModal1();
  //   }
  //   else if (service.ServiceName == "CashDeposit-AL" || service.ServiceName == "CashDeposit-COV") {
  //     showFCashDModal();
  //   }
  //   else if (service.ServiceName == "CashWithdrawal-AL" || service.ServiceName == "CashWithdrawal-COV") {
  //     showFCashWModal();
  //   }
  //   else if (service.ServiceName == "ChequeProcess") {
  //     showChequeProcessModal1();
  //   }
  //   else if (service.ServiceName == "Airlines-AL" || service.ServiceName == "Airlines-COV") {
  //     showSecondBillpaymentModal();
  //   }
  //   else if (service.ServiceName == "MobileWallet") {
  //     showFMobileWalletModal();
  //   }
  //   else if (service.ServiceName == "Telebirr-AL" || service.ServiceName == "Telebirr-COV") {
  //     showFirstTelebirrModal();
  //   }
  //   else if (service.ServiceName == "NewCard-AL" || service.ServiceName == "NewCard-COV") {
  //     showNewCardModal();
  //     //alert('new card click');
  //   }
  //   else if (service.ServiceName == "OpenAnAccount-AL" || service.ServiceName == "OpenAnAccount-COV") {
  //     showopenAnAccountModalPersonalInformation();      
  //   }
  //   else {
  //     this.SelectedService = service;
  //     showFirstModalCP(); //MPesa,Ethiotelecom,
  //   }
  //   // else{
  //   //   //generate token
  //   //   this.generateToken(service)
  //   // }
  // }
  // serviceClick(service: any) {
  //   console.log("services",service)
  //   this.SelectedService = service;
  //   this.SelectedServices = service.ServiceName;
  //   this.SelectedServicesID = service.ServiceId;

  //   if (service.IsGroup == "True" && service.ServiceName != "Heroes Service") {

  //     this.getChildServices();
  //     this.isParentServiceClicked = true;
  //   }
  //   else if(service.ServiceName == "Heroes Service"){
  //     //showopenModalHeroServices();
      
  //   }
  //   else {
  //     this.SelectedService = service;
  //     showFirstModalCP(); //MPesa,Ethiotelecom,
  //   }
  //   // else{
  //   //   //generate token
  //   //   this.generateToken(service)
  //   // }
  // }
  serviceClick(service: any) {
    this.SelectedService = service;
    this.SelectedServices = service.ServiceName;
    this.SelectedServicesID = service.ServiceId;
    this.SelectedServiceCaption=service.ServiceCaption;
    if (service.IsGroup == "True" ) {

          this.getChildServices();
          this.isParentServiceClicked = true;
    }
    else if (service.ServiceName == "Statement/AccBalance-AL" || service.ServiceName == "Statement/AccBalance-COV") {
      showFModal();

    }
    else if (service.ServiceName == "FundTransfer-AL" || service.ServiceName == "FundTransfer-COV") {
      showFirstModalFT();
    }
    else if (service.ServiceName == "Feedback-AL" || service.ServiceName == "Feedback-COV") {
      showFModalFb();
    }
    else if (service.ServiceName == "PaymentProcess") {
      showPaymentProcessModal1();
    }
    else if (service.ServiceName == "CashDeposit-AL" || service.ServiceName == "CashDeposit-COV") {
      showFCashDModal();
    }
    else if (service.ServiceName == "CashWithdrawal-AL" || service.ServiceName == "CashWithdrawal-COV") {
      showFCashWModal();
    }
    else if (service.ServiceName == "ChequeProcess") {
      showChequeProcessModal1();
    }
    else if (service.ServiceName == "Airlines-AL" || service.ServiceName == "Airlines-COV") {
      showSecondBillpaymentModal();
    }
    else if (service.ServiceName == "MobileWallet") {
      showFMobileWalletModal();
    }
    else if (service.ServiceName == "Telebirr-AL" || service.ServiceName == "Telebirr-COV") {
      showFirstTelebirrModal();
    }
    else if (service.ServiceName == "NewCard-AL" || service.ServiceName == "NewCard-COV") {
      showNewCardModal();
      //alert('new card click');
    }
    else if (service.ServiceName == "OpenAnAccount-AL" || service.ServiceName == "OpenAnAccount-COV") {
      showopenAnAccountModalPersonalInformation();      
    }
    else {
      this.SelectedService = service;
      showFirstModalCP(); //MPesa,Ethiotelecom,
    }
    // else{
    //   //generate token
    //   this.generateToken(service)
    // }
  }
  updateServices() {

    let HomeServices = this.Services;

    this.service.changeHomeServices(HomeServices);
  }

  currentDate: any;
  generateToken(service: any) {


    let val: any = {
      ServiceName: this.SelectedServices,
      BranchID: this.BranchID,
      PriorityID: this.GPriorityID,
      LaguageID: this.LanguageId,
      TokenDetails: "",
      MsIsdnNo: "",
      MissionId: 1,
      ServiceID: this.SelectedServicesID,
    }

    this.service.GetTokenNo(val).subscribe(data => {

      if (data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]) {
        // alert("Your Token Number is: " + data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"] );
        this.sendWhatApp(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]);
       // this.sendSms(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]);
        this.tokenData = data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"];

        this.generateTokenID(this.SelectedService);
        this.currentDate = new Date();
        this.showToken = true;

        this.FeedbackStatus();


        // setTimeout(() => {
        //   if (this.FeedbackActive === "True") {
        //                 showFModalFb();
        //   }
        // }, 5000);
      }
      // setTimeout(() => {
      //   hideFirstModalCP();
      //   this.resetFormChangePin();
      // }, 10000);





      // this.triggerTimeoutGT();
    },
      error => {
        // Handle the error here

        this.showSpinner = false;
        this.errorMessageMP = 'Something went wrong. Try again later';
      }
    );
  }
  triggerTimeoutGT() {
    this.timeoutGT = setTimeout(() => {
      hideFirstModalCP();
      this.resetFormChangePin();
    }, 5000);
  }


  generateTokenID(service: any) {
    let val: any = {
      TokenNo: this.tokenData,
      ServiceId: this.SelectedServicesID
    }
    this.service.GetTokenId(val).subscribe(data => {
      this.dataList = data;

      this.TokenId = this.dataList['Table'][0]['TokenId'];
      this.SelectedTokenID = service.TokenId;
      // 

      // this.updateToken(this.TokenId);
    },)
  }

  updateToken(TokenId: any) {
    let val: any = {
      TokenNo: this.tokenData,
      TokenId: TokenId,
      StatusId: 128,
      CounterId: this.CounterId,
      UserId: this.UserID,
      BranchId: this.BranchID,
      TimeRequired: 100,
    }
    this.service.UpdateTokenNo(val).subscribe(data => {
      if (data) {


      }
    },)
  }



  sendWhatApp(Token:any,Number?:any){

    const formattedDate1 = new Date(new Date().setHours(new Date().getHours())).toLocaleString();
    const formattedDate = new Date(new Date().setHours(new Date().getHours() + 1)).toLocaleString();

    let val = {
      to : Number?Number:this.form4.value.MobileNumber,
      message : `
Greetings!

Your service request has been successfully registered. 

Here are your details:

*Branch*: ${this.BranchName}
*Date & Time*: ${formattedDate1}
*Token Number*: ${Token}
*Service Requested*: ${this.SelectedServices}
*Visiting Time*: ${formattedDate}

Kindly visit the branch 15 minutes before your requested time.

Please wait for your turn, you will be notified when your token is called.

Thank you for using Automate

*_You are eligible for a life time free international credit card, please contact the bank for  more details_*

Smart Branch Team
Innovate FZC LLC
www.we-innovate.co `
}
     
    this.service.SetWhatsapp(val).subscribe(data => { 
     })
   // console.log("sendWhatApp",val)
  }
  sendSms(Token: any) {
    let val = {
      Mobile: this.MobileNumber,

      // Mobile: '+251931653136',
      Text: "Hello, Your token number is " + Token + ". You will be served shortly. Thank you!"
    }

    // 
    this.service.SetSms(val).subscribe(data => {
    })
  }


  sendOTP(mobileNo: any) {
    let val = {
      Mobile: mobileNo,
    }

    this.service.SendOTP(val).subscribe(data => {
    })
  }


  goBack() {
    this.router.navigate(['/Language']);
  }


  feedbackForm!: FormGroup;

  // Create a form control for the emoji rating
  emojiRating = this.fb.control('', Validators.required);

  setRating(rating: number) {
    this.selectedRating = rating;
  }


  createForm() {
    this.feedbackForm = this.fb.group({
      feedback: ['', Validators.required],
      name: [''],
      // Include the emoji rating control in the form group
      emojiRating: this.emojiRating
    });
  }

  SubmitRate() {


    this.SendFeedbackComplains();
    if (this.feedbackForm.valid) {
      // Perform actions such as hiding the modal or submitting the form
      this.SendFeedbackComplains();
    } else {
      // Mark form controls as touched to display validation messages
      // alert("form invalid");
      this.markFormGroupTouched(this.feedbackForm);
    }
    // setTimeout(() => {
    //   hideFModalFb();
    //   hideSecondModalFb();

    //   this.resetFeedback();
    // }, 10000);
  }
  SubmitRate1() {

    if (this.feedbackForm.valid) {
      this.showSuggetion1 = true;

      // Perform actions such as hiding the modal or submitting the form
      this.SendFeedbackComplains1();
    } else {
      // Mark form controls as touched to display validation messages
      // alert("form invalid");
      this.markFormGroupTouched1(this.feedbackForm);
    }
    // setTimeout(() => {
    //   hideFModalFb();
    //   hideSecondModalFb();

    //   this.resetFeedback();
    // }, 10000);
  }
  resetFeedback() {

    // Reset the form if needed
    this.feedbackForm.reset();
    this.FeedbackRadio.reset();
    this.MobileNumber = '';
    this.feedback = '';
    this.name = '';
    sessionStorage.removeItem('Modal');
    this.FeedbackRadio.patchValue({
      transactionTypeFS: 'Feedback'// set as default radiobtn
    })

    this.ShowFeedbackdiv1 = true;
    this.showSuggetionDiv1 = false;
    this.showSuggetion1 = false;
  }

  private SendFeedbackComplains() {

    var val4 = {
      Name: this.feedbackForm.value.name,
      BranchID: this.BranchID,
      Details: this.feedbackForm.value.feedback,
      Type: this.FeedbackRadio.value.transactionTypeFS,
      Rating: this.feedbackForm.value.emojiRating,

    };
    sessionStorage.removeItem('Modal');
    this.service.SendFeedback(val4).subscribe((data) => {

      this.dataList = data;
      this.FeedbackResponse = this.dataList['status_code'];

      if (this.FeedbackResponse == 100) {



        // this.showToken1 = true;
        hideFModalFb();
        showSecondModalFb();
      }
      else {
        alert("inalid form");
      }

    },
      error => {
        this.showSpinner = false;
        this.errorMessageFB = 'Something went wrong. Try again later';
      }
    );

  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
  private SendFeedbackComplains1() {

    var val5 = {

      Name: this.feedbackForm.value.name,
      BranchID: this.BranchID,
      Details: this.feedbackForm.value.feedback,
      Type: this.FeedbackRadio.value.transactionTypeFS,
      Rating: this.feedbackForm.value.emojiRating,

    };

    this.service.SendFeedback(val5).subscribe((data) => {

      this.dataList = data;
      this.FeedbackResponse = this.dataList['status_code'];

      if (this.FeedbackResponse == 100) {



        //  this.showToken1 = true;


      }
      else {
        alert("inalid form");
      }

    });

  }
  markFormGroupTouched1(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched1(control);
      }
    });
  }

  validate2ndCW() {

    this.submitted2ndCW = true;

    // if (this.form2ndCW.invalid) {

    //   return;
    // }
    // else {


    // }

    const currentBalanceInt = parseInt(this.CurrentBalanceCW.replace(/,/g, '').split('.')[0]);



    // if (currentBalanceInt >= this.form2ndCW.value.AmountCW) {
      this.addtokenTransactionCW();
      this.MobileNumber = this.form5.value.MobileNumber;

    //   return;
    // }
    // else {
    //   this.errorMessage9 = 'Amount is greater than the current balance.';

    // }

  }

  addtokenTransactionCW() {

    //create Token
    let val: any = {
      ServiceName: this.SelectedServices,
      BranchID: this.BranchID,
      PriorityID: this.GPriorityID,
      LaguageID: this.LanguageId,
      TokenDetails: "",
      MsIsdnNo: "",
      MissionId: 1,
      ServiceID: this.SelectedServicesID,
    }



    this.service.GetTokenNo(val).subscribe(data => {

      if (data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]) {
        // alert("Your Token Number is: " + data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"] );
        this.sendWhatApp(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"],this.form5.value.MobileNumber);
        ///this.sendSms(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]);
        this.tokenData1 = data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"];


        this.currentDate = new Date();
        //Get TOken ID;
        let val2: any = {
          TokenNo: this.tokenData1,
          ServiceId: this.SelectedServicesID
        }


        this.service.GetTokenId(val2).subscribe(data => {
          this.dataList = data;


          this.TokenId = this.dataList['Table'][0]['TokenId'];
          this.SelectedTokenID = this.SelectedService.TokenId;

          var val3 = {
            ServiceId: this.SelectedServicesID,
            BranchId: this.BranchID,
            TokenId: this.TokenId,
            field_1: "Cash Withdrawal",
            field_2: this.form5.value.AccountIdCW,
            field_3: this.CustomerNameCW,
            field_4: this.form2ndCW.value.AmountCW,
            field_8: this.form5.value.MobileNumber,

          };



          this.service.AddtokenTransaction(val3).subscribe((data) => {


            


            let val:any={
              CurrentDate:this.currentDate,
              BranchName:this.BranchName,
              SelectedServices:this.SelectedServices,
              tokenData:this.tokenData1,
              AverageWait:this.AverageWait,
              TokenId:this.TokenId,
               BranchId:this.BranchID,
               SelectedServiceCaption:this.SelectedServiceCaption
            };
            
            hideFCashWModal();
            hideSecondCashWModal();
            sessionStorage.setItem("TokenDetails",JSON.stringify(val));
            this.router.navigate(['/signalToken']);

            

            // this.showToken1 = true;

            // this.FeedbackStatus();


            // setTimeout(() => {
            //   if (this.FeedbackActive === "True") {
            //                     showFModalFb();
            //   }
            // }, 5000);
            // // setTimeout(() => {
            // //   hideFCashWModal();
            // //   hideSecondCashWModal();
            // //   this.resetFormAndDataCashWithdrawl();
            // // }, 10000);
            // this.triggerTimeout();

          });
        },)
      }
    },)
  }
  triggerTimeout() {
    this.timeoutId = setTimeout(() => {
      hideFCashWModal();
      hideSecondCashWModal();
      this.resetFormAndDataCashWithdrawl();
    }, 5000);
  }

  validateCD3() {

    this.submittedCD3 = true;

    if (this.formCD3.invalid) {
      return;
    }

    else {
      this.addtokenTransactionCD();
      this.MobileNumber = this.formCD.value.MobileNumber;
    }

    //this.triggerTimeout1();

    // setTimeout(() => {
    //   hideFCashDModal();
    //   hideSecondCashDModal();

    //   this.resetFormAndDataCashDeposit();
    // }, 10000);
  }





  addtokenTransactionCD() {

    this.sla();
    //create Token
    let val: any = {
      ServiceName: this.SelectedServices,
      BranchID: this.BranchID,
      PriorityID: this.GPriorityID,
      LaguageID: this.LanguageId,
      TokenDetails: "",
      MsIsdnNo: "",
      MissionId: 1,
      ServiceID: this.SelectedServicesID,
    }



    this.service.GetTokenNo(val).subscribe(data => {

      if (data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]) {
        // alert("Your Token Number is: " + data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"] );
        //this.sendWhatApp(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"],this.formCD.value.MobileNumber);

       // this.sendSms(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]);
        this.tokenData1 = data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"];


        this.currentDate = new Date();
        //Get TOken ID;
        let val2: any = {
          TokenNo: this.tokenData1,
          ServiceId: this.SelectedServicesID
        }


        this.service.GetTokenId(val2).subscribe(data => {
          this.dataList = data;


          this.TokenId = this.dataList['Table'][0]['TokenId'];
          this.SelectedTokenID = this.SelectedService.TokenId;

          var val3 = {
            ServiceId: this.SelectedServicesID,
            BranchId: this.BranchID,
            TokenId: this.TokenId,
            field_1: "Cash Deposit",
            field_2: this.AccountId,
            field_3: this.CustomerNameCD,
            field_4: this.formCD3.value.AmountCD,
            field_8: this.formCD.value.MobileNumber,
            field_12: this.formCD3.value.name,
          };

          


          this.service.AddtokenTransaction(val3).subscribe((data) => {


            let val:any={
              CurrentDate:this.currentDate,
              BranchName:this.BranchName,
              SelectedServices:this.SelectedServices,
              tokenData:this.tokenData1,
              AverageWait:this.AverageWait,
              TokenId:this.TokenId,
               BranchId:this.BranchID, 
               SelectedServiceCaption:this.SelectedServiceCaption
            };
            
            hideFCashDModal();
            hideSecondCashDModal();
            sessionStorage.setItem("TokenDetails",JSON.stringify(val));
            this.router.navigate(['/signalToken']);
            
            // this.showToken1 = true;

            // this.FeedbackStatus();

            // setTimeout(() => {
            //   if (this.FeedbackActive === "True") {
            //                     showFModalFb();
            //   }
            // }, 5000);
            

          });
        },)
      }
    },)
  }
  triggerTimeout1() {
    this.timeoutCD = setTimeout(() => {
      hideFCashDModal();
      hideSecondCashDModal();
      this.resetFormAndDataCashDeposit();
    }, 5000);

  }




  addTokenTransactionForPaymentProcess() {


    //create Token
    let val: any = {
      ServiceName: this.SelectedServices,
      BranchID: this.BranchID,
      PriorityID: this.GPriorityID,
      LaguageID: this.LanguageId,
      TokenDetails: "",
      MsIsdnNo: "",
      MissionId: 1,
      ServiceID: this.SelectedServicesID,
    }



    this.service.GetTokenNo(val).subscribe(data => {

      if (data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]) {
        // alert("Your Token Number is: " + data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"] );
        this.sendWhatApp(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]);
       // this.sendSms(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]);
        this.tokenData1 = data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"];



        //Get Token ID;
        let val2: any = {
          TokenNo: this.tokenData1,
          ServiceId: this.SelectedServicesID
        }


        this.service.GetTokenId(val2).subscribe(data => {
          this.dataList = data;


          this.TokenId = this.dataList['Table'][0]['TokenId'];
          this.SelectedTokenID = this.SelectedService.TokenId;

          var val3 = {
            ServiceId: this.SelectedServicesID,
            BranchId: this.BranchID,
            TokenId: this.TokenId,
            field_1: this.PaymentProcessTab,
            field_2: this.actualAccountNumber,
            field_3: this.BenificiaryNamePP,
            field_4: 1000,
            field_8: "Abyssina Bank",
            field_9: this.CustomerName,
          };



          this.service.AddtokenTransaction(val3).subscribe((data) => {

            this.showToken1 = true;
            showPaymentProcessModal4();
          });


        },)
      }
    },)
  }




  // Bill Payment
  AirlinesClick() {
    hideSecondBillpaymentModal();
    showFourthBillpaymentModal();
    this.form15.reset();


  }

  accountNumber: string = '';

  handleRadioButtonClick2(value: string) {

    if (value === 'account') {
      this.showAccountDiv = true;
      this.ShowCashdiv = false;
    }
    else {
      this.showAccountDiv = false;
      this.ShowCashdiv = false;
    }
  }

  handleRadioButtonClick(value: string) {

    if (value === 'cash') {
      this.ShowCashdiv = true;
      this.showAccountDiv = false;
    }
    else {
      this.ShowCashdiv = false;
      this.showAccountDiv = false;
    }
  }






  addBill() {
    const value="Niket Pawar";
    this.formALCash.patchValue({ Passenger: value });
    this.formALCash.patchValue({ AirlinesName: "Vistara" });
    this.formALCash.patchValue({ amount: "2000" });

    this.submitted15 = true;
    this.formSubmittedAirline = true;
    this.showSpinner = true;
    // const value = this.form15.get('CustomerName')?.value;
    // this.formALCash.patchValue({ Passenger: value });

    // this.submitted15 = true;
    // this.formSubmittedAirline = true;


    // // Check if the form fields are blank
    // if (
    //   !this.form15.value.CustomerName ||
    //   !this.form15.value.PNR
    //   //||!this.form15.value.AccountId
    // ) {
    //   this.errorMessageAL5 = 'PNR or Name is not filled.';
    //   return;
    // }


    // if (this.form15.invalid) {
    //   this.errorMessage5 = 'Invalid form. Please check the entered values.';
    //   return;
    // }


    // this.errorMessage5 = '';


    // this.showSpinner = true;

    this.getAirlineOrderdetailCash();

    // this.getAirlineOrderdetail();


  }

  getAirlineOrderdetailCash() {
   // alert(this.SelectedServices);
    // this.generateToken(this.SelectedServices)

    let val: any = {
      orderId: this.form15.value.PNR,
      merchantCode: "526341",
      // criteriaValue: this.actualAccountNumber,


    }
    this.AirlineAmountCash = "2000"
    this.AirlineName = "Vistara"


    this.failureStatus1 = false;

    hideSecondBillpaymentModal();
    showThirdBillpaymentModal();
    this.showSpinner = false;

    // this.service.AirLines(val).subscribe(data => {

    //   // this.updateToken(this.TokenId);
    //   if (data && data["GetOrderResponse"] && data["GetOrderResponse"]["GetOrder"] && data["GetOrderResponse"]["ESBStatus"]) {
    //     // this.AirlineOrderdetail = data["GetOrderResponse"]["GetOrder"]["paymentInquiry"];
    //     this.AirlineAmountCash = data["GetOrderResponse"]["GetOrder"]["amount"]
    //     this.AirlineName = data["GetOrderResponse"]["GetOrder"]["utilityName"]


    //     this.failureStatus1 = false;

    //     hideSecondBillpaymentModal();
    //     showThirdBillpaymentModal();

    //     // 
    //   } else {
    //     this.errorMessagePNR = "Please Enter a Valid PNR"
    //     const failureStatus1AL: any = data["GetOrderResponse"]?.["ESBStatus"]?.["errorDescription"];
    //     // const failureStatus2AL: any = data["GetOrderResponse"]["ESBStatus"]["Status"];
    //     // Check if GetOrderResponse and ESBStatus are defined before accessing Status
    //     const failureStatus2AL: any = data["GetOrderResponse"] && data["GetOrderResponse"]["ESBStatus"] && data["GetOrderResponse"]["ESBStatus"]["Status"];



    //     this.failureStatus1AL = failureStatus1AL;
    //     this.failureStatus2AL = failureStatus2AL;
    //     this.failureStatus1 = true;
    //     this.failureStatus2AL = true;

    //   }
    // },).add(() => {
    //   this.showSpinner = false;
    // });
  }

  addBill2() {


    this.submitted15Account = true;
    this.formsubmittedAl1 = true;
    this.formALAccount.patchValue({ PassengerName: "Niket Pawar" });


    // Check if the form fields are blank
    // if (
    //   !this.AlCustomerNameAcc ||
    //   // !this.form15Account.value.AlCustomerNameAcc ||
    //   !this.form15Account.value.PNR
    //   //||!this.form15.value.AccountId

    // ) {
    //   return;
    // }


    // if (this.form15Account.invalid) {
    //   this.errorMessage5 = 'Invalid form. Please check the entered values.';
    //   return;
    // }
     this.errorMessage5 = '';


    this.showSpinner = true;
    this.getAirlineOrderdetailAccount();


    // hideFourthBillpaymentModal();
    // showFifthBillpaymentModal();
    // this.showSpinner = false;
  }

  getAirlineOrderdetailAccount() {
    // alert(this.SelectedServices);
    // this.generateToken(this.SelectedServices)

    let val: any = {
      orderId: this.form15Account.value.PNR,

      // criteriaValue: this.actualAccountNumber,
      merchantCode: "526341",

    }
    this.AirlineAmount1 = "40000"
    this.AirlineNameACC = "Vistara"

    this.showSpinner = false;

    this.failureStatus1 = false;

   

    this.getAccountBalanceAL();

    // this.service.AirLines(val).subscribe(data => {

    //   // this.updateToken(this.TokenId);
    //   if (data && data["GetOrderResponse"] && data["GetOrderResponse"]["GetOrder"] && data["GetOrderResponse"]["ESBStatus"]) {
    //     // this.AirlineOrderdetail = data["GetOrderResponse"]["GetOrder"]["paymentInquiry"];
    //     this.AirlineAmount1 = data["GetOrderResponse"]["GetOrder"]["amount"]
    //     this.AirlineNameACC = data["GetOrderResponse"]["GetOrder"]["utilityName"]



    //     this.failureStatus1 = false;

    //     // hideSecondBillpaymentModal();
    //     // showThirdBillpaymentModal();

    //     this.getAccountBalanceAL();


    //     // 
    //   } else {
    //     this.errorMessageAL6 = 'Please Enter Valid PNR';

    //     const failureStatus1AL: any = data["GetOrderResponse"]["ESBStatus"]["errorDescription"];
    //     const failureStatus2AL: any = data["GetOrderResponse"]["ESBStatus"]["Status"];


    //     this.failureStatus1AL = failureStatus1AL;
    //     this.failureStatus2AL = failureStatus2AL;
    //     this.failureStatus1 = true;
    //     this.failureStatus2AL = true;

    //   }
    // },).add(() => {
    //   this.showSpinner = false;
    // });
  }

  showsummarymodal() {
    // this.getAirlineOrderdetail();
    const currentBalanceInt = parseInt(this.CurrentBalanceAL.replace(/,/g, '').split('.')[0]);


    // 
    if (currentBalanceInt > this.AirlineAmount1) {

      hideFourthBillpaymentModal();
      showFifthBillpaymentModal();
      return;

    }
    else {
      this.errorMessageAL1 = this.getValueForCaption('Amountisgreaterthanthecurrentbalance');
    }

  }

  addAccountBill() {
    this.submitted15 = true;

    // Check if the form fields are blank
    // if (
    //   !this.form15.value.CustomerName ||
    //   !this.form15.value.PNR
    //   //||!this.form15.value.AccountId
    // ) {
    //   this.errorMessage5 = 'PNR or Name is not filled.';
    //   return;
    // }

    // Check if the checkbox is not checked
    // if (!this.form15.value.digitalTransaction) {
    //   this.errorMessage5 = 'Please accept to do the transaction digitally.';
    //   return;
    // }

    // Check if the form is invalid
    // if (this.form15.invalid) {
    //   this.errorMessage5 = 'Invalid form. Please check the entered values.';
    //   return;
    // }

    // Clear any previous error messages
    this.errorMessage5 = '';

    // Log the selected transaction type



    // Show spinner and perform other actions
    // this.showSpinner = true;

    // Hide and show modals (you might want to define these functions)
    hideFourthBillpaymentModal();
    showThirdBillpaymentModal();

    // Get customer information (you might want to define this function)
    this.getCustomerinfo();
  }



  Confirmclick() {


  }
  onSubmit1(): void {
    this.submitted15 = true;
    alert("Q")
    if (this.form15.invalid) {
      return;
    }
    alert("x")
  }
  addtokenTransactionbillpayment() {
    //create Token
    let val: any = {
      ServiceName: this.SelectedServices,
      BranchID: this.BranchID,
      PriorityID: this.GPriorityID,
      LaguageID: this.LanguageId,
      TokenDetails: "",
      MsIsdnNo: "",
      MissionId: 1,
      ServiceID: this.SelectedServicesID,
    }



    this.service.GetTokenNo(val).subscribe(data => {

      if (data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]) {
        // alert("Your Token Number is: " + data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"] );
       // this.sendWhatApp(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]);
       // this.sendSms(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]);
        this.tokenData2 = data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"];
        this.currentDate=Date();


        //Get TOken ID;
        let val2: any = {
          TokenNo: this.tokenData2,
          ServiceId: this.SelectedServicesID
        }


        this.service.GetTokenId(val2).subscribe(data => {
          this.dataList = data;


          this.TokenId = this.dataList['Table'][0]['TokenId'];
          this.SelectedTokenID = this.SelectedService.TokenId;

          var val3 = {
            ServiceId: this.SelectedServicesID,
            BranchId: this.BranchID,
            TokenId: this.TokenId,
            field_1: this.AirlineName,
            // field_2: this.actualAccountNumber1,
            // field_3: this.form15.value.CustomerName,
            field_4: this.AirlineAmountCash,
            field_5: this.form15.value.PNR,
            field_6: this.formALCash.value.Passenger,
            field_7: "Cash",
          };



          this.service.AddtokenTransaction(val3).subscribe((data) => {

          //  this.showToken3 = true;

           // this.FeedbackStatus();
           hideSecondBillpaymentModal();
           hideThirdBillpaymentModal();
          // this.resetBillPayment();
           let val:any={
            CurrentDate:this.currentDate,
            BranchName:this.BranchName,
            SelectedServices:this.SelectedServices,
            tokenData:this.tokenData2,
            AverageWait:this.AverageWait,
            TokenId:this.TokenId,
             BranchId:this.BranchID,
             SelectedServiceCaption:this.SelectedServiceCaption
          };
          sessionStorage.setItem("TokenDetails",JSON.stringify(val));
          this.router.navigate(['/signalToken']);
          

            // setTimeout(() => {
            //   if (this.FeedbackActive === "True") {
            //                     showFModalFb();
            //   }
            // }, 5000);
            // setTimeout(() => {
            //   // hideFBillpaymentModal();
            //   hideSecondBillpaymentModal();
            //   hideThirdBillpaymentModal();
            //   this.resetBillPayment();
            // }, 10000);
           // this.triggerTimeoutAL1();

          });


        })
      }
    })
  }

  triggerTimeoutAL1() {
    this.timeoutAL1 = setTimeout(() => {
      hideSecondBillpaymentModal();
      hideThirdBillpaymentModal();
      this.resetBillPayment();
    }, 5000);
  }


  addAccountTransactionbillpayment() {

    this.MobileNumber = this.form7.value.MobileNumber;
    let val: any = {
      ServiceName: this.SelectedServices,
      BranchID: this.BranchID,
      PriorityID: this.GPriorityID,
      LaguageID: this.LanguageId,
      TokenDetails: "",
      MsIsdnNo: "",
      MissionId: 1,
      ServiceID: this.SelectedServicesID,
    }



    this.service.GetTokenNo(val).subscribe(data => {

      if (data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]) {
        // alert("Your Token Number is: " + data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"] );
        this.sendWhatApp(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"],this.form7.value.MobileNumber);

        //this.sendSms(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]);
        this.tokenData2 = data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"];
        this.currentDate=Date();


        //Get TOken ID;
        let val2: any = {
          TokenNo: this.tokenData2,
          ServiceId: this.SelectedServicesID
        }


        this.service.GetTokenId(val2).subscribe(data => {
          this.dataList = data;


          this.TokenId = this.dataList['Table'][0]['TokenId'];
          this.SelectedTokenID = this.SelectedService.TokenId;

          // 
          // 
          // 


          var val3 = {
            ServiceId: this.SelectedServicesID,
            BranchId: this.BranchID,
            TokenId: this.TokenId,
            field_1: this.AirlineNameACC,
            field_2: this.form7.value.criteriaValueAL,
            field_3: this.AlCustomerNameAcc,
            field_4: this.AirlineAmount1,
            field_5: this.form15Account.value.PNR,
            field_6: this.formALAccount.value.PassengerName,
            field_7: "Account",
            field_8: this.form7.value.MobileNumber,
          };



          this.service.AddtokenTransaction(val3).subscribe((data) => {

           // this.showToken3Account = true;

           // this.FeedbackStatus();

        
            hideSecondBillpaymentModal();
            hideThirdBillpaymentModal();
            hideFourthBillpaymentModal();
            hideFifthBillpaymentModal();
            let val:any={
              CurrentDate:this.currentDate,
              BranchName:this.BranchName,
              SelectedServices:this.SelectedServices,
              tokenData:this.tokenData2,
              AverageWait:this.AverageWait,
              TokenId:this.TokenId,
               BranchId:this.BranchID,
               SelectedServiceCaption:this.SelectedServiceCaption
            };
            sessionStorage.setItem("TokenDetails",JSON.stringify(val));
            this.router.navigate(['/signalToken']);

            // setTimeout(() => {
            //   if (this.FeedbackActive === "True") 
            //   {
            //      showFModalFb();
            //   }
            // }, 5000);
            // setTimeout(() => {
            //   // hideFBillpaymentModal();
            //   hideSecondBillpaymentModal();
            //   hideThirdBillpaymentModal();
            //   hideFourthBillpaymentModal();
            //   hideFifthBillpaymentModal();
            //   this.resetBillPayment();
            // }, 10000);
           // this.triggerTimeoutAL2();

          });


        })
      }
    })


  }
  triggerTimeoutAL2() {
    this.timeoutAL2 = setTimeout(() => {
      hideSecondBillpaymentModal();
      hideThirdBillpaymentModal();
      hideFourthBillpaymentModal();
      hideFifthBillpaymentModal();
      this.resetBillPayment();
    }, 5000);
  }


  getAccountBalance() {



    this.criteriaValue = this.form5.value.AccountIdCW;




    let valAB: any = {
      columnName: "ACCOUNT.NUMBER",
      criteriaValue: this.form5.value.AccountIdCW,
      operand: "EQ",
    };
    this.CurrentBalanceCW="13,549"
    hideFCashWModal();
    showSecondCashWModal();
    this.showSpinner = false;

    // this.service.AccountBalance(valAB).subscribe(data => {

    //   // if (data &&

    //   // data["AccountBalanceResponse"] && 
    //   //   data["AccountBalanceResponse"]["ACCTBRANCHResponse"] && 
    //   //   data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["ACCTCOMPANYVIEWType"] && 
    //   //   data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["ACCTCOMPANYVIEWType"][0] && 
    //   //   data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["ACCTCOMPANYVIEWType"][0]["gACCTBALCTSDetailType"] && 
    //   //   data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["ACCTCOMPANYVIEWType"][0]["gACCTBALCTSDetailType"]["mACCTBALCTSDetailType"] && 
    //   //   data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["ACCTCOMPANYVIEWType"][0]["gACCTBALCTSDetailType"]["mACCTBALCTSDetailType"]["WorkingBal"]) 

    //   if (data["AccountBalanceResponse"]?.["ACCTBRANCHResponse"]?.["ACCTCOMPANYVIEWType"]?.[0]?.["gACCTBALCTSDetailType"]?.["mACCTBALCTSDetailType"]?.["WorkingBal"]) {

    //     // if (data["AccountBalanceResponse"] && data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["ACCTCOMPANYVIEWType"][0]["gACCTBALCTSDetailType"]["mACCTBALCTSDetailType"] && data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["ACCTCOMPANYVIEWType"][0]["gACCTBALCTSDetailType"]["mACCTBALCTSDetailType"]["WorkingBal"]) {
    //     this.CurrentBalanceCW = data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["ACCTCOMPANYVIEWType"][0]["gACCTBALCTSDetailType"]["mACCTBALCTSDetailType"]["WorkingBal"];
    //     // this.AccountId = data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["AccountBalance"][0]["accountId"];

    //     hideFCashWModal();
    //     showSecondCashWModal();

    //             // this.showSpinner = false;
    //   } else {
    //     // Handle the case where one or more properties are undefined
    //     this.errorMessagecW2 = 'Something went wrong. Try again later';
    //   }

    // },

    //   error => {

    //     this.showSpinner = false;
    //     this.errorMessagecW2 = 'Something went wrong. Try again later';

    //     console.error('An error occurred:', error);
    //     // Handle the error here, such as showing a toast message or displaying an error dialog.
    //   }
    // ).add(() => {
    //   this.showSpinner = false;
    // });
  }

  // test() {
  //   hideFBillpaymentModal();
  //   hideFMobileWalletModal();
  //   showFTelebirrModal();

  // }

  showSuggetionDiv1 = false;
  ShowFeedbackdiv1 = true;
  handleRadioButtonClick3(value: string) {

    if (value === 'Feedback') {
      this.showSuggetionDiv1 = false;
      this.ShowFeedbackdiv1 = true;
    }
    else {
      this.showSuggetionDiv1 = false;
      this.ShowFeedbackdiv1 = false;
    }
  }

  handleRadioButtonClick4(value: string) {

    if (value === 'Suggetion') {
      this.ShowFeedbackdiv1 = false;
      this.showSuggetionDiv1 = true;
    }
    else {
      this.ShowFeedbackdiv1 = false;
      this.showSuggetionDiv1 = false;
    }
  }

  showOtherDiv = false;
  ShowSelfdiv1 = true;

  handleRadioButtonClickTeleBirrSelf(value: string) {

    if (value === 'Self') {
      this.showOtherDiv = false;
      this.ShowSelfdiv1 = true;
    }
    else {
      this.showOtherDiv = false;
      this.ShowSelfdiv1 = false;
    }
  }


  handleRadioButtonClickTelebirrOther(value: string) {

    if (value === 'Other') {
      this.ShowSelfdiv1 = false;
      this.showOtherDiv = true;
    }
    else {
      this.ShowSelfdiv1 = false;
      this.showOtherDiv = false;
    }
  }


  getAccountBalanceAL() {


    this.criteriaValue = this.form7.value.criteriaValueAL;




    // let valAB: any = {
    //   columnName: "ACCOUNT.NUMBER",
    //   criteriaValue: this.form7.value.criteriaValueAL,
    //   operand: "EQ",
    // };
    let valAB: any = {
      columnName: "ACCOUNT.NUMBER",
      criteriaValue: this.form7.value.criteriaValueAL,
      operand: "EQ",
    };
    this.CurrentBalanceAL ="100000000";
    this.showSpinner = false;
    this.showsummarymodal();

    // this.service.AccountBalance(valAB).subscribe(data => {

    //   if (data["AccountBalanceResponse"]?.["ACCTBRANCHResponse"]?.["ACCTCOMPANYVIEWType"]?.[0]?.["gACCTBALCTSDetailType"]?.["mACCTBALCTSDetailType"]?.["WorkingBal"]) {
    //     this.CurrentBalanceAL = data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["ACCTCOMPANYVIEWType"][0]["gACCTBALCTSDetailType"]["mACCTBALCTSDetailType"]["WorkingBal"];
    //     // this.AccountId = data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["AccountBalance"][0]["accountId"];

    //     this.showsummarymodal();
    //   } else {
    //     this.errorMessagecAl1 = 'Something went wrong. Try again later';


    //   }
    // },

    //   error => {

    //     this.showSpinner = false;
    //     this.errorMessagecAl1 = 'Something went wrong. Try again later';

    //     console.error('An error occurred:', error);
    //     // Handle the error here, such as showing a toast message or displaying an error dialog.
    //   }
    // )
    //   .add(() => {
    //     this.showSpinner = false;
    //   });
  }


  // transferTB1(){
  //   this.showSpinner = false;
  //   // this.data2();

  //   let val: any = {
  //     ServiceName: this.SelectedServices,
  //     BranchID: this.BranchID,
  //     PriorityID: 313,
  //     LaguageID: this.LanguageId,
  //     TokenDetails: "",
  //     MsIsdnNo: "",
  //     MissionId: 1,
  //     ServiceID: this.SelectedServicesID,
  //   }

  //   

  //   this.service.GetTokenNo(val).subscribe(data => {
  //     
  //     if (data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]) {
  //       // alert("Your Token Number is: " + data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"] );
  //       // this.sendWhatApp(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]);
  //       this.sendSms(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]);
  //       this.tokenData2 = data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"];

  //       

  //       //Get TOken ID;
  //       let val2: any = {
  //         TokenNo: this.tokenData2,
  //         ServiceId: this.SelectedServicesID
  //       }
  //       

  //       this.service.GetTokenId(val2).subscribe(data => {
  //         this.dataList = data;
  //         

  //         this.TokenId = this.dataList['Table'][0]['TokenId'];
  //         this.SelectedTokenID = this.SelectedService.TokenId;

  //         var val3 = {
  //           ServiceId: this.SelectedServicesID,
  //           BranchId: this.BranchID,
  //           TokenId: this.TokenId,

  //           field_2: this.actualAccountNumber1,
  //           field_3: this.CustomerName,

  //           field_5: this.form15.value.PNR,
  //           field_6: this.CustomerName,
  //           field_7: this.form15.value.transactionType1,
  //         };

  //         

  //         this.service.AddtokenTransaction(val3).subscribe((data) => {
  //           
  //           this.showTBSuccess = true;
  //           setTimeout(() => {
  //             hideFirstTelebirrModal();
  //             this.resetFormAndDataTB();
  //           }, 10000);
  //         });


  //       })
  //     }
  //   })



  // }


  transferTB1() {


    this.showSpinner = false;
    this.submittedTB1 = true;

    // this.data2();

    // if (this.formTelebirr2.invalid) {


    //   // this.errorMessage5 = 'FORM INVALID';

    //   return;
    // }
    // else {



    // }

    const currentBalanceInt = parseInt(this.CurrentBalanceTB.replace(/,/g, '').split('.')[0]);




    // if (currentBalanceInt >= this.formTelebirr2.value.CreditAmountTB2) {

      this.getCustomerinfoTelebirr();
    //   return;
    // }
    // else {


    //   this.errorMessageFT3 = 'Amount is greater than the current balance.';



    // }

  }
  getCustomerinfoTelebirr() {
    this.MobileNumber = this.formTelebirr1.value.MobileNumberTB1;

    let val: any = {
      ServiceName: this.SelectedServices,
      BranchID: this.BranchID,
      PriorityID: this.GPriorityID,
      LaguageID: this.LanguageId,
      TokenDetails: "",
      MsIsdnNo: "",
      MissionId: 1,
      ServiceID: this.SelectedServicesID,
    }



    this.service.GetTokenNo(val).subscribe(data => {

      if (data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]) {
        // alert("Your Token Number is: " + data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"] );
        this.sendWhatApp(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"],this.formTelebirr1.value.MobileNumberTB1);
        //this.sendSms(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]);
        this.tokenData2 = data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"];
        this.currentDate = new Date();


        //Get TOken ID;
        let val2: any = {
          TokenNo: this.tokenData2,
          ServiceId: this.SelectedServicesID
        }


        this.service.GetTokenId(val2).subscribe(data => {
          this.dataList = data;


          this.TokenId = this.dataList['Table'][0]['TokenId'];
          this.SelectedTokenID = this.SelectedService.TokenId;

          var val3 = {
            ServiceId: this.SelectedServicesID,
            BranchId: this.BranchID,
            TokenId: this.TokenId,

            field_1: "Telebirr_Self",
            field_2: this.formTelebirr1.value.CreditAccountTB1,
            field_3: this.CustomerNameTB,
            field_4: this.formTelebirr2.value.CreditAmountTB2,
            field_8: this.formTelebirr1.value.MobileNumberTB1
            // field_6: this.CustomerName,
            // field_7: this.form15.value.transactionType1,
          };



          this.service.AddtokenTransaction(val3).subscribe((data) => {

           // this.showTBSuccess = true;

            // this.FeedbackStatus();
            let val:any={
              CurrentDate:this.currentDate,
              BranchName:this.BranchName,
              SelectedServices:this.SelectedServices,
              tokenData:this.tokenData2,
              AverageWait:this.AverageWait,
              TokenId:this.TokenId,
               BranchId:this.BranchID,
               SelectedServiceCaption:this.SelectedServiceCaption
            };
            sessionStorage.setItem("TokenDetails",JSON.stringify(val));
            this.router.navigate(['/signalToken']);
            hideFirstTelebirrModal();
            this.resetFormAndDataTB();
            // setTimeout(() => {
            //   if (this.FeedbackActive === "True") {
            //                     showFModalFb();
            //   }
            // }, 5000);

            // this.triggerTimeoutTB1();

          });


        })
      }
    })



  }
  triggerTimeoutTB1() {
    this.timeoutTB1 = setTimeout(() => {
      hideFirstTelebirrModal();
      this.resetFormAndDataTB();
    }, 5000);
  }



  getAccountBalanceTB() {


    // this.criteriaAmount = this.formTelebirr1.value.CreditAccountTB1;




    // let valAB: any = {
    //   columnName: "ACCOUNT.NUMBER",
    //   criteriaValue: this.formTelebirr1.value.CreditAccountTB1,
    //   operand: "EQ",
    // };  
    this.criteriaAmount="0987654321121";


    let valAB: any = {
      columnName: "ACCOUNT.NUMBER",
      criteriaValue: this.formTelebirr1.value.CreditAccountTB1,
      operand: "EQ",
    };
    this.CurrentBalanceTB="40000"
    this.getCustomerinfoTB();

    // this.service.AccountBalance(valAB).subscribe(data => {

    //   if (data["AccountBalanceResponse"]?.["ACCTBRANCHResponse"]?.["ACCTCOMPANYVIEWType"]?.[0]?.["gACCTBALCTSDetailType"]?.["mACCTBALCTSDetailType"]?.["WorkingBal"]) {
    //     // if (data["AccountBalanceResponse"] && data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["ACCTCOMPANYVIEWType"][0]["gACCTBALCTSDetailType"]["mACCTBALCTSDetailType"] && data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["ACCTCOMPANYVIEWType"][0]["gACCTBALCTSDetailType"]["mACCTBALCTSDetailType"]["WorkingBal"]) {
    //     this.CurrentBalanceTB = data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["ACCTCOMPANYVIEWType"][0]["gACCTBALCTSDetailType"]["mACCTBALCTSDetailType"]["WorkingBal"];
    //     // this.AccountId = data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["AccountBalance"][0]["accountId"];

    //     this.getCustomerinfoTB()
    //   } else {

    //     // this.errorMessagecTB1 = 'Something went wrong. Try again later';

    //   }
    // },

    //   error => {

    //     this.showSpinner = false;
    //     this.errorMessageTB3 = 'Something went wrong. Try again later';

    //     console.error('An error occurred:', error);
    //     // Handle the error here, such as showing a toast message or displaying an error dialog.
    //   }
    // ).add(() => {
    //   this.showSpinner = false;
    // });
  }






  TransferTB() {

    // if (this.formTelebirrOther.invalid) {
    //   return;
    // }

    hideFirstTelebirrModal();
    showSecondTelebirrModal();
  }

  transferTB3() {

    this.submittedTB5 = true;






    // if (this.formTelebirrOther1.invalid) {


    //   // this.errorMessage5 = 'FORM INVALID';

    //   return;
    // }
    // else {

    // }


    const currentBalanceInt = parseInt(this.CurrentBalanceTB1.replace(/,/g, '').split('.')[0]);


    // if (currentBalanceInt >= this.formTelebirrOther1.value.CreditAmountTB3) {

      // this.addtokenTransaction();
      this.getCustomerinfoTelebirr2();




    //   return;
    // }

    // else {
    //   this.errorMessageFT3 = 'Amount is greater than the current balance.';

    // }



  }
  getCustomerinfoTelebirr2() {
    this.MobileNumber = this.formTelebirrOther.value.MobileNumberOtherTB;

    let val: any = {
      ServiceName: this.SelectedServices,
      BranchID: this.BranchID,
      PriorityID: this.GPriorityID,
      LaguageID: this.LanguageId,
      TokenDetails: "",
      MsIsdnNo: "",
      MissionId: 1,
      ServiceID: this.SelectedServicesID,
    }



    this.service.GetTokenNo(val).subscribe(data => {

      if (data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]) {
        // alert("Your Token Number is: " + data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"] );
        this.sendWhatApp(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"],this.formTelebirrOther.value.MobileNumberOtherTB);
       // this.sendSms(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]);
        this.tokenData2 = data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"];
        this.currentDate = new Date();


        //Get TOken ID;
        let val2: any = {
          TokenNo: this.tokenData2,
          ServiceId: this.SelectedServicesID
        }

        this.service.GetTokenId(val2).subscribe(data => {
          this.dataList = data;
          this.TokenId = this.dataList['Table'][0]['TokenId'];
          this.SelectedTokenID = this.SelectedService.TokenId;

          var val3 = {
            ServiceId: this.SelectedServicesID,
            BranchId: this.BranchID,
            TokenId: this.TokenId,
            field_1: "Telebirr_Other",
            field_2: this.formTelebirrOther.value.CreditAccountOtherTB,
            field_3: this.CustomerNameOtherTB1,
            field_4: this.formTelebirrOther1.value.CreditAmountTB3,
            field_8: this.formTelebirrOther.value.MobileNumberOtherTB,
            field_11: this.formTelebirrOther1.value.MobileNumberOtherTB1,
          };

          this.service.AddtokenTransaction(val3).subscribe((data) => {
            hideFirstTelebirrModal();
            hideSecondTelebirrModal();
            this.resetFormAndDataTB();
            let val:any={
              CurrentDate:this.currentDate,
              BranchName:this.BranchName,
              SelectedServices:this.SelectedServices,
              tokenData:this.tokenData2,
              AverageWait:this.AverageWait,
              TokenId:this.TokenId,
               BranchId:this.BranchID,
               SelectedServiceCaption:this.SelectedServiceCaption
            };
            sessionStorage.setItem("TokenDetails",JSON.stringify(val));
            this.router.navigate(['/signalToken']);
           // this.showTBSuccess1 = true;
            // setTimeout(() => {
            //   hideFirstTelebirrModal();
            //   hideSecondTelebirrModal();
            //   this.resetFormAndDataTB();
            // }, 10000);
           // this.triggerTimeoutTB2();

          });
        })
      }
    })

  }
  triggerTimeoutTB2() {
    this.timeoutTB2 = setTimeout(() => {
      hideFirstTelebirrModal();
      hideSecondTelebirrModal();
      this.resetFormAndDataTB();
    }, 10000);
  }

  getCustomerinfoTelebirr1() {

    let val: any = {
      ServiceName: this.SelectedServices,
      BranchID: this.BranchID,
      PriorityID: this.GPriorityID,
      LaguageID: this.LanguageId,
      TokenDetails: "",
      MsIsdnNo: "",
      MissionId: 1,
      ServiceID: this.SelectedServicesID,
    }

    this.service.GetTokenNo(val).subscribe(data => {

      if (data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]) {
        // alert("Your Token Number is: " + data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"] );
        this.sendWhatApp(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]);
       // this.sendSms(data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"]);
        this.tokenData2 = data["Body"]["GetTokenNoResult"]["GetTokenNoDetails"]["ServiceTokenNo"]["@TokenNo"];

        //Get TOken ID;
        let val2: any = {
          TokenNo: this.tokenData2,
          ServiceId: this.SelectedServicesID
        }

        this.service.GetTokenId(val2).subscribe(data => {
          this.dataList = data;


          this.TokenId = this.dataList['Table'][0]['TokenId'];
          this.SelectedTokenID = this.SelectedService.TokenId;

          var val3 = {
            ServiceId: this.SelectedServicesID,
            BranchId: this.BranchID,
            TokenId: this.TokenId,
            field_1: "Telebirr_Self",
            field_2: this.formTelebirr1.value.CreditAccountTB1,
            field_3: this.CustomerNameTB,
            field_4: this.formTelebirr2.value.CreditAmountTB2,

          };
          this.service.AddtokenTransaction(val3).subscribe((data) => {

            this.showTBSuccess1 = true;
            setTimeout(() => {
              hideFirstTelebirrModal();
              hideSecondTelebirrModal();
              this.resetFormAndDataTB();
            }, 10000);
          });
        })
      }
    })
  }

  getAccountBalanceTB1() {
    this.criteriaAmount = this.formTelebirrOther1.value.MobileNumberOtherTB1;

    let valAB: any = {
      columnName: "ACCOUNT.NUMBER",
      criteriaValue: this.formTelebirrOther1.value.MobileNumberOtherTB1,
      operand: "EQ",
    };
    this.CurrentBalanceTB1 ="40000";
    this.showSpinner = false;

    // this.service.AccountBalance(valAB).subscribe(data => {

    //   if (data["AccountBalanceResponse"]?.["ACCTBRANCHResponse"]?.["ACCTCOMPANYVIEWType"]?.[0]?.["gACCTBALCTSDetailType"]?.["mACCTBALCTSDetailType"]?.["WorkingBal"]) {
    //     // if (data["AccountBalanceResponse"] && data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["ACCTCOMPANYVIEWType"][0]["gACCTBALCTSDetailType"]["mACCTBALCTSDetailType"] && data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["ACCTCOMPANYVIEWType"][0]["gACCTBALCTSDetailType"]["mACCTBALCTSDetailType"]["WorkingBal"]) {
    //     this.CurrentBalanceTB1 = data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["ACCTCOMPANYVIEWType"][0]["gACCTBALCTSDetailType"]["mACCTBALCTSDetailType"]["WorkingBal"];
    //     // this.AccountId = data["AccountBalanceResponse"]["ACCTBRANCHResponse"]["AccountBalance"][0]["accountId"];
    //   } else {
    //     this.errorMessagecTB = 'Something went wrong. Try again later';
    //   }
    // }).add(() => {
    //   this.showSpinner = false;
    // });
  }

  sla() {
    let val: any = {
        ServiceId: this.SelectedServicesID
    }

    this.service.AverageWaitTime(val).subscribe(data => {    
      this.AverageWait = data;            
    })
  }

  FeedbackStatus() {
    let val: any = {
      BranchId: this.BranchID
    }
    this.service.IsFeeedbackActive(val).subscribe(data => {
      this.FeedbackActive = data;    
    })
  }

}

