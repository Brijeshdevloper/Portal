import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder,HubConnectionState } from '@microsoft/signalr';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AppConfig } from './config/app-config';

@Injectable({
  providedIn: 'root'
})
export class SignalRServiceServiceTsService {
  private hubConnection: HubConnection;
  private messageSubject = new Subject<any>();
  messages$ = this.messageSubject.asObservable();
  private isReconnectingSubject = new BehaviorSubject<any>(false);
  isReconnecting$ = this.isReconnectingSubject.asObservable();
  constructor(appConfig: AppConfig) {
    // const ApiUrl="http://103.76.214.46/Automate/SmartBranch/API";
    const ApiUrl=appConfig.HoUrl;
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${ApiUrl}/tableHub`) // Update the URL to your SignalR hub
      .build();

    this.startConnection();
    this.registerEvents();
    this.hubConnection.onclose(() => {
      console.warn('SignalR connection closed. Attempting to reconnect...');
      this.scheduleReconnect();
    });
  }

  private startConnection() {
    this.hubConnection
      .start()
      .then(() => {
        console.log('SignalR connection established');
        this.isReconnectingSubject.next(false);
      })
      .catch((err) => {
        console.error('Error establishing connection:', err);
        this.scheduleReconnect();
      });
  }

  private scheduleReconnect(): void {
    if (this.isReconnectingSubject.value) return;
    this.isReconnectingSubject.next(true);
    setInterval(() => {
      if (this.hubConnection.state !== HubConnectionState.Connected) {
        console.log('Attempting to reconnect...');
        this.startConnection();
      }
    }, 5000); // Retry every 5 seconds
  }
  private registerEvents() {
    this.hubConnection.on('ReceiveTableData', (customers: any) => {
      this.messageSubject.next(customers);  // Pushing the received customers to the observable stream
     // console.log("Received customers:", customers);
    });
    this.hubConnection.onreconnecting(() => {
      console.log('Reconnecting to SignalR...');
    });

    this.hubConnection.onreconnected(() => {
      console.log('Reconnected to SignalR');
    });

    this.hubConnection.on('error', (error: any) => {
      console.error('SignalR error:', error);
    });
  }

  public sendMessage(message: string) {
    this.hubConnection.invoke('SendMessage', message).catch(err => console.error(err));
  }
}
