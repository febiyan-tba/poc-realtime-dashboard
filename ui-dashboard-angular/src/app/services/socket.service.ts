import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable()
export class SocketService {
  private socket;
  private connected = false;
  private connecting = false;
  constructor() {
    this.connect();
  }

  connect() {
    if (!this.connected) {
      this.connecting = true;
      this.socket = io.connect(environment.analyticsApi);
      this.socket.on('connect', () => {
        this.socket
          .emit('authenticate', { token: localStorage.getItem('app-token') })
          .on('authenticated', function(){
            console.log('Socket is connected');
            this.connected = true;
          })
          .on('unauthorized', function(msg){
            console.log('Socket is unauthorized: ' + JSON.stringify(msg.data));
            this.connecting = false;
            this.connected = false;
          });
      });
    }
  }

  getTransactionSummary() {
    // Sometimes the constructor is ignored...
    // So we need to connect manually
    if (!this.connected && !this.connecting) {
      this.connect();
    }
    const observable = new Observable(observer => {
      this.socket.on('transactions-summary', (data) => {
        observer.next(data);
      });
      return () => {
        console.log('Disconnect');
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
