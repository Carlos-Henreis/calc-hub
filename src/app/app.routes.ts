import { Routes } from '@angular/router';

export const routes: Routes = [
  // Home
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    data: {
      title: 'Calculadoras Online – Financeiro, Saúde, Matemática e Conversores',
      description: 'Hub de calculadoras online: salário líquido, IMC, pace/ritmo, VO₂ máx., regra de 3, conversor de temperatura e muito mais. Rápidas, responsivas e gratuitas.',
      keywords: ['calculadora online','salário líquido','IMC','pace','VO2max','regra de 3','conversor de temperatura','calculadoras'],
      canonicalPath: '/',
      schema: 'webpage'
    }
  },

  // Finanças (lista)
  {
    path: 'financas',
    loadComponent: () => import('./features/financas/financas.component').then(m => m.FinancasComponent),
    data: {
      title: 'Calculadoras Financeiras',
      description: 'Coleção de calculadoras financeiras para uso diário: salário líquido, juros e outras utilidades.',
      keywords: ['calculadora financeira','salário líquido','juros','INSS','IRRF'],
      canonicalPath: '/financas',
      schema: 'webpage'
    }
  },
  // Salário Líquido
  {
    path: 'financas/salario-liquido',
    loadComponent: () => import('./features/financas/salario-liquido/salario-liquido.component').then(m => m.SalarioLiquidoComponent),
    data: {
      title: 'Calculadora de Salário Líquido (Brasil)',
      description: 'Calcule o salário líquido com INSS, IRRF, dependentes, VT, plano de saúde, férias e 13º. Suporte a CLT e PJ.',
      keywords: ['salário líquido 2025','calculadora INSS','IRRF','dependentes','férias','13º','CLT','PJ'],
      canonicalPath: '/financas/salario-liquido',
      schema: 'software'
    }
  },

  // Saúde (lista)
  {
    path: 'saude',
    loadComponent: () => import('./features/saude/saude.component').then(m => m.SaudeComponent),
    data: {
      title: 'Calculadoras de Saúde',
      description: 'Ferramentas de saúde e esporte: IMC, pace/ritmo, VO₂ máx. e outras.',
      keywords: ['IMC','pace','ritmo','VO2max','corrida','saúde'],
      canonicalPath: '/saude',
      schema: 'webpage'
    }
  },
  // IMC
  {
    path: 'saude/imc',
    loadComponent: () => import('./features/saude/imc/imc.component').then(m => m.ImcComponent),
    data: {
      title: 'Calculadora de IMC (Índice de Massa Corporal)',
      description: 'Calcule seu IMC e veja a classificação por faixa de peso com interpretação automática.',
      keywords: ['IMC','índice de massa corporal','peso','altura','saúde'],
      canonicalPath: '/saude/imc',
      schema: 'software'
    }
  },
  // Pace
  {
    path: 'saude/pace',
    loadComponent: () => import('./features/saude/pace/pace.component').then(m => m.PaceComponent),
    data: {
      title: 'Calculadora de Pace (Ritmo) e Velocidade',
      description: 'Informe distância e tempo para obter o pace (min/km) e a velocidade média (km/h). Suporte a km e milhas.',
      keywords: ['pace','ritmo','min/km','corrida','velocidade'],
      canonicalPath: '/saude/pace',
      schema: 'software'
    }
  },
  // VO2max
  {
    path: 'saude/vo2max',
    loadComponent: () => import('./features/saude/vo2max/vo2max.component').then(m => m.Vo2maxComponent),
    data: {
      title: 'Calculadora de VO₂ Máx. (Estimativa)',
      description: 'Estime sua capacidade aeróbica (VO₂ máx.) a partir de tempo, distância ou frequência cardíaca.',
      keywords: ['VO2max','capacidade aeróbica','corrida','condicionamento'],
      canonicalPath: '/saude/vo2max',
      schema: 'software'
    }
  },
  {
    'path': 'saude/estilo-comunicacao',
    'loadComponent': () => import('./features/saude/teste-estilo-comunicacao/teste-estilo-comunicacao.component').then(m => m.TesteEstiloComunicacaoComponent),
    'data': {
      'title': 'Teste de Estilo de Comunicação (IPIP) – Descubra seu perfil',
      'description': 'Avalie seu estilo de comunicação e receba dicas personalizadas. Baseado no modelo IPIP (Personality Item Pool).',
      'keywords': ['estilo de comunicação','autoavaliação','dicas'],
      'canonicalPath': '/saude/estilo-comunicacao',
      'schema': 'webpage'
    }
  },
  // Matemática (lista)
  {
    path: 'matematica',
    loadComponent: () => import('./features/matematica/matematica.component').then(m => m.MatematicaComponent),
    data: {
      title: 'Calculadoras de Matemática',
      description: 'Regra de 3, porcentagem e outras calculadoras matemáticas rápidas e fáceis.',
      keywords: ['regra de 3','porcentagem','matemática'],
      canonicalPath: '/matematica',
      schema: 'webpage'
    }
  },
  // Regra de 3
  {
    path: 'matematica/regra-3',
    loadComponent: () => import('./features/matematica/regra-3/regra-3.component').then(m => m.Regra3Component),
    data: {
      title: 'Calculadora de Regra de 3 (Direta, Inversa e Composta)',
      description: 'Resolva proporções no formato "A está para B, assim como C está para X". Inclui passo a passo, modo inverso e regra de 3 composta.',
      keywords: ['regra de 3','proporção','direta','inversa','composta','porcentagem'],
      canonicalPath: '/matematica/regra-3',
      schema: 'software'
    }
  },
  {
    path: 'matematica/calculadora-cientifica',
    loadComponent: () => import('./features/matematica/calculadora-cientifica/calculadora-cientifica.component').then(m => m.CalculadoraCientificaComponent),
    data: {
      title: 'Calculadora Científica Online',
      description: 'Calculadora científica completa com operações aritméticas, potenciação, raízes, logaritmos e funções trigonométricas (sin, cos, tan).',
      keywords: ['calculadora científica','trigonometria','logaritmo','raiz quadrada','potenciação','sin','cos','tan'],
      canonicalPath: '/matematica/calculadora-cientifica',
      schema: 'software'
    }
  },
  {
    path: 'matematica/equacao-2-grau',
    loadComponent: () => import('./features/matematica/equacao-2-grau/equacao-2-grau.component').then(m => m.Equacao2GrauComponent),
    data: {
      title: 'Calculadora de Equação do 2º Grau (Bhaskara)',
      description: 'Resolva equações do segundo grau ax² + bx + c = 0. Calcula delta, raízes reais e complexas, vértice da parábola com passo a passo.',
      keywords: ['equação 2º grau','bhaskara','delta','raízes','parábola','vértice','matemática'],
      canonicalPath: '/matematica/equacao-2-grau',
      schema: 'software'
    }
  },
  {
    path: 'matematica/mmc-mdc',
    loadComponent: () => import('./features/matematica/mmc-mdc/mmc-mdc.component').then(m => m.MmcMdcComponent),
    data: {
      title: 'Calculadora de MMC, MDC e Fatoração',
      description: 'Calcule o Mínimo Múltiplo Comum (MMC), Máximo Divisor Comum (MDC) e fatoração em números primos de dois números.',
      keywords: ['MMC','MDC','mínimo múltiplo comum','máximo divisor comum','fatoração','números primos'],
      canonicalPath: '/matematica/mmc-mdc',
      schema: 'software'
    }
  },
  {
    path: 'matematica/bases-numericas',
    loadComponent: () => import('./features/matematica/bases-numericas/bases-numericas.component').then(m => m.BasesNumericasComponent),
    data: {
      title: 'Conversor de Bases Numéricas (Decimal, Binário, Octal, Hexadecimal)',
      description: 'Converta números entre diferentes bases: decimal ↔ binário ↔ octal ↔ hexadecimal. Útil para programação e computação.',
      keywords: ['conversor de bases','decimal','binário','octal','hexadecimal','base 2','base 8','base 10','base 16'],
      canonicalPath: '/matematica/bases-numericas',
      schema: 'software'
    }
  },

  // Conversores (lista)
  {
    path: 'conversores',
    loadComponent: () => import('./features/conversores/conversores.component').then(m => m.ConversoresComponent),
    data: {
      title: 'Conversores',
      description: 'Conversores práticos para o dia a dia: temperatura e mais.',
      keywords: ['conversor','temperatura','unidades'],
      canonicalPath: '/conversores',
      schema: 'webpage'
    }
  },
  // Temperatura
  {
    path: 'conversores/temperatura',
    loadComponent: () => import('./features/conversores/temperatura/temperatura.component').then(m => m.TemperaturaComponent),
    data: {
      title: 'Conversor de Temperatura (°C, °F, K)',
      description: 'Converta valores entre Celsius, Fahrenheit e Kelvin com fórmulas e explicação.',
      keywords: ['conversor de temperatura','celsius','fahrenheit','kelvin'],
      canonicalPath: '/conversores/temperatura',
      schema: 'software'
    }
  },
  {
    path: 'conversores/unidades-medida',
    loadComponent: () => import('./features/conversores/unidades-medida/unidades-medida.component').then(m => m.UnidadesMedidaComponent),
    data: {
      title: 'Conversor de Unidades de Medida',
      description: 'Converta unidades de comprimento, massa, volume, área e velocidade. Metros, quilômetros, milhas, libras, litros, galões e muito mais.',
      keywords: ['conversor de unidades','comprimento','massa','volume','área','velocidade','metros','quilômetros','milhas','libras'],
      canonicalPath: '/conversores/unidades-medida',
      schema: 'software'
    }
  },
  {
    path: 'conversores/tempo',
    loadComponent: () => import('./features/conversores/tempo/tempo.component').then(m => m.TempoComponent),
    data: {
      title: 'Conversor de Tempo',
      description: 'Converta unidades de tempo entre segundos, minutos, horas, dias, semanas, meses e anos.',
      keywords: ['conversor de tempo','segundos','minutos','horas','dias','semanas','meses','anos'],
      canonicalPath: '/conversores/tempo',
      schema: 'software'
    }
  },
  {
    path: 'conversores/armazenamento',
    loadComponent: () => import('./features/conversores/armazenamento/armazenamento.component').then(m => m.ArmazenamentoComponent),
    data: {
      title: 'Conversor de Armazenamento Digital',
      description: 'Converta unidades de armazenamento digital: Bytes, KB, MB, GB, TB, PB. Suporta sistema binário (1024) e decimal (1000).',
      keywords: ['conversor de armazenamento','bytes','KB','MB','GB','TB','binário','decimal','armazenamento digital'],
      canonicalPath: '/conversores/armazenamento',
      schema: 'software'
    }
  },
  {
    path: 'conversores/taxa-percentual',
    loadComponent: () => import('./features/conversores/taxa-percentual/taxa-percentual.component').then(m => m.TaxaPercentualComponent),
    data: {
      title: 'Conversor de Taxa Percentual para Decimal',
      description: 'Converta entre percentual e fator decimal. Ex: 12% ↔ 0.12. Útil para cálculos financeiros e estatísticos.',
      keywords: ['conversor percentual','taxa percentual','fator decimal','porcentagem','decimal'],
      canonicalPath: '/conversores/taxa-percentual',
      schema: 'software'
    }
  },
  {
    path: 'conversores/notacao-cientifica',
    loadComponent: () => import('./features/conversores/notacao-cientifica/notacao-cientifica.component').then(m => m.NotacaoCientificaComponent),
    data: {
      title: 'Conversor de Notação Científica',
      description: 'Converta entre notação científica e decimal. Ex: 1.5 × 10³ ↔ 1500. Útil para física, química e astronomia.',
      keywords: ['notação científica','conversor científico','mantissa','expoente','potência de 10'],
      canonicalPath: '/conversores/notacao-cientifica',
      schema: 'software'
    }
  },

  { path: '**', redirectTo: '' },
];
