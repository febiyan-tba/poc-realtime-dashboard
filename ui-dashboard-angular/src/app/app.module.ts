// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';

// Custom modules
import { AppMaterialModule } from './app-material.module';
import { AppRouteModule } from './app-route.module';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardChartComponent } from './components/dashboard/dashboard-chart/dashboard-chart.component';
import { DashboardTableComponent } from './components/dashboard/dashboard-table/dashboard-table.component';
import { DashboardSimulatorComponent } from './components/dashboard/dashboard-simulator/dashboard-simulator.component';

// Injectable services
import { AuthService } from './services/auth.service';
import { TransactionService } from './services/transaction.service';
import { SocketService } from './services/socket.service';
import { AppAuthGuard } from './app-auth.guard';
import { AuthInterceptor } from './auth-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    DashboardChartComponent,
    DashboardTableComponent,
    DashboardSimulatorComponent
  ],
  imports: [
    BrowserModule,
    AppMaterialModule,
    AppRouteModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    TransactionService,
    SocketService,
    AppAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
