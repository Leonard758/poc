import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AiService } from '../../services/ai.service'; // Assicurati che il percorso sia corretto

@Component({
  selector: 'app-ai-assistant',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ai-assistant.html',
  styleUrl: './ai-assistant.scss',
})
export class AiAssistant {
aiForm: FormGroup;
  responseText: string | null = null;
  conversationId: number | null = null;
  isLoading = false;
  
  // Lista dei toni supportati dal DB Rails [cite: 40]
  tones = ['Formale', 'Simpatico', 'Istituzionale'];

  constructor(private fb: FormBuilder, private aiService: AiService) {
    this.aiForm = this.fb.group({
      prompt: ['', [Validators.required, Validators.minLength(5)]],
      tone: ['Formale', Validators.required]
    });
  }

  onSubmit() {
    if (this.aiForm.invalid) return;

    this.isLoading = true;
    const { prompt, tone } = this.aiForm.value;

    // Chiamata al servizio
    this.aiService.generateResponse(prompt, tone, this.conversationId).subscribe({
      next: (response) => {
        // Rails risponde con { text: "...", conversation_id: 1 } [cite: 33]
        this.responseText = response.text;
        
        // Salviamo l'ID per le prossime richieste (contesto)
        this.conversationId = response.conversation_id; 
        
        this.isLoading = false;
        // Opzionale: puliamo il prompt ma lasciamo il tono
        this.aiForm.patchValue({ prompt: '' });
      },
      error: (err) => {
        console.error('Errore durante la generazione:', err);
        this.isLoading = false;
        this.responseText = "Errore di connessione con il server Rails.";
      }
    });
  }

  resetChat() {
    this.conversationId = null;
    this.responseText = null;
    this.aiForm.reset({ tone: 'Formale' });
  }
}
