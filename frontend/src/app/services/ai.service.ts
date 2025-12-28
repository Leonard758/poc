// src/app/services/ai.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AiService {
  // Assicurati che l'indirizzo corrisponda al tuo server Rails
  private apiUrl = 'http://localhost:3000/genera'; 

  constructor(private http: HttpClient) {}

  generateResponse(prompt: string, tone: string, conversationId: number | null): Observable<any> {
    const payload = {
      prompt: prompt,
      tone: tone,
      company_id: 1, // Hardcoded come da esempio documentazione [cite: 19]
      conversation_id: conversationId // Necessario per mantenere il contesto [cite: 34]
    };

    return this.http.post<any>(this.apiUrl, payload);
  }
}