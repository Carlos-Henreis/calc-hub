import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup } from '@angular/forms';

export interface AssessmentItem {
  id: number;
  text: string;
  factor: 'E' | 'A' | 'C' | 'N' | 'O';
  keyed: '+' | '-';
  communication_aspect: string;
}

export interface AssessmentResponse {
  itemId: number;
  score: number; // 1–5
  timestamp: Date;
}

export interface AssessmentResult {
  userId: string;
  responses: AssessmentResponse[];
  scores: { E: number; A: number; C: number; N: number; O: number };
  communicationStyle: string;
  completedAt: Date;
}

export interface CommunicationStyle {
  name: string;
  description: string;
  characteristics: string[];
  strengths: string[];
  developmentAreas: string[];
}

@Injectable({ providedIn: 'root' })
export class AssessmentService {
  // Stream para respostas conforme o usuário avança
  private responsesSubject = new BehaviorSubject<AssessmentResponse[]>([]);
  public responses$ = this.responsesSubject.asObservable();

  // Itens de avaliação (IPIP 50 itens resumidos como exemplo)
  private items: AssessmentItem[] = [    
    //EXTRAVERSÃO (Comunicação Social)
    {"id": 1, "text": "Sou a vida de uma festa", "factor": "E", "keyed": "+", "communication_aspect": "social_energy"},
    {"id": 6, "text": "Não falo muito", "factor": "E", "keyed": "-", "communication_aspect": "verbal_expressiveness"},
    {"id": 11, "text": "Sinto-me confortável no meio dos outros", "factor": "E", "keyed": "+", "communication_aspect": "social_comfort"},
    {"id": 16, "text": "Prefiro manter-me em segundo plano", "factor": "E", "keyed": "-", "communication_aspect": "social_assertiveness"},
    {"id": 21, "text": "Inicio conversas", "factor": "E", "keyed": "+", "communication_aspect": "communication_initiative"},
    {"id": 26, "text": "Tenho pouco para dizer", "factor": "E", "keyed": "-", "communication_aspect": "verbal_contribution"},
    {"id": 31, "text": "Falo com muitas pessoas diferentes em festas", "factor": "E", "keyed": "+", "communication_aspect": "social_breadth"},
    {"id": 36, "text": "Não gosto de chamar a atenção para mim próprio", "factor": "E", "keyed": "-", "communication_aspect": "attention_seeking"},
    {"id": 41, "text": "Não me importo de ser o centro das atenções", "factor": "E", "keyed": "+", "communication_aspect": "social_dominance"},
    {"id": 46, "text": "Estou tranquilo na presença de desconhecidos", "factor": "E", "keyed": "-", "communication_aspect": "social_inhibition"},
    
    //AMABILIDADE (Comunicação Interpessoal)
    {"id": 2, "text": "Sinto pouca preocupação pelos outros", "factor": "A", "keyed": "-", "communication_aspect": "empathic_concern"},
    {"id": 7, "text": "Estou interessado nas pessoas", "factor": "A", "keyed": "+", "communication_aspect": "interpersonal_interest"},
    {"id": 12, "text": "Insulto os outros", "factor": "A", "keyed": "-", "communication_aspect": "respectful_communication"},
    {"id": 17, "text": "Simpatizo com os sentimentos dos outros", "factor": "A", "keyed": "+", "communication_aspect": "emotional_resonance"},
    {"id": 22, "text": "Não estou interessado nos problemas dos outros", "factor": "A", "keyed": "-", "communication_aspect": "supportive_listening"},
    {"id": 27, "text": "Tenho um coração mole", "factor": "A", "keyed": "+", "communication_aspect": "compassionate_response"},
    {"id": 32, "text": "Não estou realmente interessado nos outros", "factor": "A", "keyed": "-", "communication_aspect": "genuine_interest"},
    {"id": 37, "text": "Dedico tempo a outros", "factor": "A", "keyed": "+", "communication_aspect": "time_investment"},
    {"id": 42, "text": "Sinto as emoções dos outros", "factor": "A", "keyed": "+", "communication_aspect": "emotional_sensitivity"},
    {"id": 47, "text": "Faço com que as pessoas se sintam à vontade", "factor": "A", "keyed": "+", "communication_aspect": "comfort_creation"},
    
    //CONSCIENCIOSIDADE (Comunicação Estruturada)
    {"id": 3, "text": "Estou sempre preparado", "factor": "C", "keyed": "+", "communication_aspect": "communication_preparation"},
    {"id": 8, "text": "Deixo os meus pertences por aí", "factor": "C", "keyed": "-", "communication_aspect": "organizational_communication"},
    {"id": 13, "text": "Presto atenção aos detalhes", "factor": "C", "keyed": "+", "communication_aspect": "detail_orientation"},
    {"id": 18, "text": "Faço uma confusão com as coisas", "factor": "C", "keyed": "-", "communication_aspect": "clarity_precision"},
    {"id": 23, "text": "Realizo as tarefas imediatamente", "factor": "C", "keyed": "+", "communication_aspect": "responsive_communication"},
    {"id": 28, "text": "Muitas vezes esqueço-me de colocar as coisas no seu devido lugar", "factor": "C", "keyed": "-", "communication_aspect": "follow_through"},
    {"id": 33, "text": "Gosto de ordem", "factor": "C", "keyed": "+", "communication_aspect": "structured_communication"},
    {"id": 38, "text": "Fujo às minhas obrigações", "factor": "C", "keyed": "-", "communication_aspect": "commitment_communication"},
    {"id": 43, "text": "Sigo um planeamento", "factor": "C", "keyed": "+", "communication_aspect": "systematic_approach"},
    {"id": 48, "text": "Sou exigente no meu trabalho", "factor": "C", "keyed": "+", "communication_aspect": "quality_standards"},
    
    //NEUROTICISMO (Comunicação Emocional)
    {"id": 4, "text": "Fico stressado com facilidade", "factor": "N", "keyed": "+", "communication_aspect": "stress_communication"},
    {"id": 9, "text": "Estou calmo a maior parte do tempo", "factor": "N", "keyed": "-", "communication_aspect": "emotional_stability"},
    {"id": 14, "text": "Preocupo-me com as coisas", "factor": "N", "keyed": "+", "communication_aspect": "anxiety_expression"},
    {"id": 19, "text": "Raramente me sinto triste", "factor": "N", "keyed": "-", "communication_aspect": "emotional_positivity"},
    {"id": 24, "text": "Sou facilmente perturbado", "factor": "N", "keyed": "+", "communication_aspect": "emotional_reactivity"},
    {"id": 29, "text": "Fico preocupado com facilidade", "factor": "N", "keyed": "+", "communication_aspect": "worry_communication"},
    {"id": 34, "text": "Mudo de humor com frequência", "factor": "N", "keyed": "+", "communication_aspect": "mood_variability"},
    {"id": 39, "text": "Tenho mudanças frequentes de humor", "factor": "N", "keyed": "+", "communication_aspect": "emotional_consistency"},
    {"id": 44, "text": "Irrito-me com facilidade", "factor": "N", "keyed": "+", "communication_aspect": "irritability_expression"},
    {"id": 49, "text": "Muitas vezes sinto-me triste", "factor": "N", "keyed": "+", "communication_aspect": "sadness_communication"},
    
    //ABERTURA (Comunicação Criativa/Intelectual)
    {"id": 5, "text": "Possuo um vocabulário rico", "factor": "O", "keyed": "+", "communication_aspect": "linguistic_sophistication"},
    {"id": 10, "text": "Tenho dificuldade em entender ideias abstractas", "factor": "O", "keyed": "-", "communication_aspect": "conceptual_communication"},
    {"id": 15, "text": "Tenho uma imaginação vívida", "factor": "O", "keyed": "+", "communication_aspect": "creative_expression"},
    {"id": 20, "text": "Não me interesso por ideias abstractas", "factor": "O", "keyed": "-", "communication_aspect": "intellectual_engagement"},
    {"id": 25, "text": "Tenho excelentes ideias", "factor": "O", "keyed": "+", "communication_aspect": "idea_generation"},
    {"id": 30, "text": "Não tenho uma boa imaginação", "factor": "O", "keyed": "-", "communication_aspect": "imaginative_communication"},
    {"id": 35, "text": "Sou rápido a compreender as coisas", "factor": "O", "keyed": "+", "communication_aspect": "intellectual_agility"},
    {"id": 40, "text": "Uso palavras difíceis", "factor": "O", "keyed": "+", "communication_aspect": "vocabulary_complexity"},
    {"id": 45, "text": "Passo tempo a reflectir sobre as coisas", "factor": "O", "keyed": "+", "communication_aspect": "reflective_communication"},
    {"id": 50, "text": "Estou cheio de ideias", "factor": "O", "keyed": "+", "communication_aspect": "ideational_fluency"}
  ];

  // Perfis de comunicação
  private styles: { [key: string]: CommunicationStyle } = {
    EXPRESSIVO_SOCIAL: {
      name: 'Expressivo Social',
      description: 'Energia social e empatia em primeiro lugar.',
      characteristics: ['Carismático', 'Entusiasta', 'Comunicativo'],
      strengths: ['Motiva equipes', 'Bom em networking'],
      developmentAreas: ['Pode dispersar atenção', 'Fala muito']
    },
    ANALITICO_ESTRUTURADO: {
      name: 'Analítico Estruturado',
      description: 'Detalhista, lógico e organizado.',
      characteristics: ['Preciso', 'Planejador', 'Reflexivo'],
      strengths: ['Clareza técnica', 'Processos definidos'],
      developmentAreas: ['Pode ser rígido', 'Menos espontâneo']
    },
    ASSERTIVO_DIRETO: {
      name: 'Assertivo Direto',
      description: 'Objetivo, confiante e orientado para resultados.',
      characteristics: ['Decidido', 'Focado', 'Seguro'],
      strengths: ['Toma decisões', 'Comunica metas'],
      developmentAreas: ['Impaciente com detalhes', 'Pode soar brusco']
    },
    HARMONIOSO_ADAPTATIVO: {
      name: 'Harmonioso Adaptativo',
      description: 'Cooperativo, flexível e sensível ao outro.',
      characteristics: ['Empático', 'Flexível', 'Colaborador'],
      strengths: ['Media conflitos', 'Adapta estilo'],
      developmentAreas: ['Evita confrontos', 'Menos assertivo']
    }
  };

  /** Retorna todos os itens */
  getItems(): AssessmentItem[] {
    return this.items;
  }

  /** Salva ou atualiza uma resposta */
  saveResponse(response: AssessmentResponse): void {
    const current = this.responsesSubject.value.filter(r => r.itemId !== response.itemId);
    current.push(response);
    this.responsesSubject.next(current);
  }

  /** Calcula escores médios por fator */
  calculateScores(responses: AssessmentResponse[]): { E: number; A: number; C: number; N: number; O: number } {
    const sums = { E: 0, A: 0, C: 0, N: 0, O: 0 };
    const counts = { E: 0, A: 0, C: 0, N: 0, O: 0 };

    responses.forEach(r => {
      const item = this.items.find(i => i.id === r.itemId);
      if (!item) return;
      const raw = item.keyed === '+' ? r.score : 6 - r.score;
      sums[item.factor] += raw;
      counts[item.factor]++;
    });

    const averages = { E: 0, A: 0, C: 0, N: 0, O: 0 };
    (Object.keys(sums) as Array<keyof typeof sums>).forEach(f => {
      averages[f] = counts[f] ? parseFloat((sums[f] / counts[f]).toFixed(2)) : 0;
    });
    return averages;
  }

  /** Determina o estilo com base nos escores */
  determineCommunicationStyle(scores: { E: number; A: number; C: number; N: number; O: number }): string {
    const { E, A, C, N, O } = scores;
    if (E > 3.5 && A > 3.5) return 'EXPRESSIVO_SOCIAL';
    if (C > 3.5 && O > 3.5) return 'ANALITICO_ESTRUTURADO';
    if (E > 3.5 && N < 2.5) return 'ASSERTIVO_DIRETO';
    return 'HARMONIOSO_ADAPTATIVO';
  }

  /** Retorna detalhes do estilo */
  getStyle(key: string): CommunicationStyle {
    return this.styles[key];
  }

  /** Gera token para compartilhamento */
  generateShareToken(result: AssessmentResult): string {
    const payload = {
      id: result.userId,
      style: result.communicationStyle,
      scores: result.scores,
      time: result.completedAt.getTime()
    };
    return btoa(JSON.stringify(payload));
  }

  /** Decodifica token de compartilhamento */
  decodeShareToken(token: string): any {
    try {
      return JSON.parse(atob(token));
    } catch {
      return null;
    }
  }

  getResponsesValue(): AssessmentResponse[] {
    return this.responsesSubject.getValue();
  }
}
