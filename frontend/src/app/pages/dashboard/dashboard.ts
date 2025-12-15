import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [], // 2. Aggiungilo qui, altrimenti l'HTML non capisce i link
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard { 
  // 3. Nota: La classe si deve chiamare DashboardComponent ed avere 'export'
}