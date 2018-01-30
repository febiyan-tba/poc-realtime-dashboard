import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Import requiredservices
import { AuthService } from '../../../services/auth.service';
import { TransactionService } from '../../../services/transaction.service';
import { orderData } from '../../../data/data';
import * as _ from 'lodash';

@Component({
  selector: 'app-dashboard-simulator',
  templateUrl: './dashboard-simulator.component.html',
  styleUrls: ['./dashboard-simulator.component.css']
})
export class DashboardSimulatorComponent implements OnInit {
  private simulationForm: any;
  private isSimulating: boolean;
  private intervalId;
  private orderDataIndex: number;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private transactionService: TransactionService
  ) {
    this.simulationForm = this.formBuilder.group({
      id: ['', Validators.required],
      duration: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.orderDataIndex = 0;
  }

  startSimulation() {
    if (!this.isSimulating) {
      console.log('Simulating');
      // const formValues = this.simulationForm.value;
      // if (formValues.id && formValues.duration) {

      // Set simulation start
      this.isSimulating = true;
      // Set interval
      this.intervalId = setInterval(() => {
        // console.log('Sending the following order:');
        // console.log(orderData[this.orderDataIndex]);
        this.transactionService.sendTransaction(orderData[this.orderDataIndex++])
        .subscribe(
          (result) => {
            // console.log('Success');
          },
          (error) => {
            console.log('Failed to send order data');
          }
        );
      }, 500);

      // }
    }
  }

  stopSimulation() {
    if (this.isSimulating) {
      console.log('Stopping');
      clearInterval(this.intervalId);
      this.isSimulating = false;
    }
  }
}
