import { Routes } from '@angular/router';

// NOTA: I percorsi qui sotto ('./pages/...') verranno corretti automaticamente 
// se usi il metodo del punto 1. Se i file sono direttamente sotto 'app', 
// diventeranno './dashboard/dashboard.component'.
import { Dashboard } from './pages/dashboard/dashboard'; 
import { AiAssistant } from './pages/ai-assistant/ai-assistant';
import { AiCopilot } from './pages/ai-copilot/ai-copilot';
import { Analytics } from './pages/analytics/analytics';

export const routes: Routes = [
  // 1. QUESTA È LA REGOLA MAGICA:
  // Se l'indirizzo è vuoto (path: ''), vai subito a 'dashboard'
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // 2. Le rotte vere e proprie
  { path: 'dashboard', component: Dashboard },
  { path: 'assistant', component: AiAssistant },
  { path: 'copilot', component: AiCopilot },
  { path: 'analytics', component: Analytics },
  
  // (Opzionale) Se uno scrive un indirizzo a caso, rimandalo alla dashboard
  { path: '**', redirectTo: 'dashboard' } 
];