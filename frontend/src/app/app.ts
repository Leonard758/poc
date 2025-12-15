import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div style="text-align:center; padding: 20px; font-family: sans-serif;">
      <h1>Test Connessione</h1>
      
      <h2 *ngIf="message" style="color: green; border: 2px solid green; padding: 10px;">
        {{ message }}
      </h2>
      
      <p *ngIf="!message" style="color: red; font-weight: bold;">
        Sto provando a contattare Rails...
      </p>

      <button (click)="riprova()" style="margin-top: 20px; padding: 10px;">Riprova Connessione</button>

      <router-outlet></router-outlet>
    </div>
  `,
})
export class App implements OnInit {
  http = inject(HttpClient);
  cdr = inject(ChangeDetectorRef); // <--- STRUMENTO PER FORZARE L'AGGIORNAMENTO
  message = '';

  ngOnInit() {
    this.chiamaRails();
  }

  riprova() {
    this.message = ''; // Resetta
    this.chiamaRails();
  }

  chiamaRails() {
    console.log('Inizio richiesta HTTP...');
    
    this.http.get<any>('http://localhost:3000/api/status')
      .subscribe({
        next: (data) => {
          console.log('Dati arrivati nel subscribe:', data);
          
          // 1. Aggiorna la variabile
          this.message = data.message;

          // 2. FORZA L'AGGIORNAMENTO GRAFICO
          this.cdr.detectChanges(); 
        },
        error: (err) => {
          console.error('Errore nel subscribe:', err);
          this.message = 'Errore: ' + err.message;
          this.cdr.detectChanges(); // Forza aggiornamento anche in caso di errore
        }
      });
  }
}