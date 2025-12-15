import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  // 1. Qui importiamo gli strumenti per i link e la navigazione
  imports: [RouterOutlet, RouterLink, RouterLinkActive], 
  // 2. Diciamo ad Angular di usare i file esterni, NON il template inline
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  // Il corpo della classe è vuoto perché la logica è delegata alle pagine
}