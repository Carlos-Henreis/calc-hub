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
      title: 'Calculadora de Regra de 3 (Direta e Inversa)',
      description: 'Resolva proporções no formato “A está para B, assim como C está para X”. Inclui passo a passo e modo inverso.',
      keywords: ['regra de 3','proporção','direta','inversa','porcentagem'],
      canonicalPath: '/matematica/regra-3',
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

  { path: '**', redirectTo: '' },
];
