import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';
// Application-specific
import { environment } from '../../environments/environment';
import { Token } from '../models/token';
import { User } from '../models/user';


@Injectable()
export class TransactionService {

  constructor(private http: HttpClient) {}

  sendTransaction(transaction): Observable<any> {
    return this.http.post(
      environment.analyticsApi + environment.analyticsPath,
      transaction
    );
  }
}
