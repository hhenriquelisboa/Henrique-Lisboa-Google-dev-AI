# 🗡️ StudyFlow RPG — A Jornada do Conhecimento

> **Aplicação web gamificada de gestão de estudos e rotina de transição de carreira em tecnologia, inspirada na estética 16-bit de clássicos como *The Legend of Zelda: A Link to the Past* e *Chrono Trigger*.**

![Status](https://img.shields.io/badge/Status-Conclu%C3%ADdo-success?style=for-the-badge)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Web Audio API](https://img.shields.io/badge/Web_Audio_API-Sintetizador_8--16bit-orange?style=for-the-badge)

---

## 🎯 1. O Problema que o Projeto Resolve

Estudantes em início de jornada e profissionais em transição de carreira frequentemente enfrentam a **paralisia por sobrecarga de conteúdo**:
* **Falta de visibilidade de progresso:** A sensação de estudar horas a fio sem perceber evolução palpável.
* **Ferramentas genéricas complexas demais:** Softwares como Notion, Jira ou Trello possuem barreiras de configuração que geram atrito desnecessário.
* **Evasão por ausência de recompensas imediatas:** O cérebro humano necessita de micro-vitórias para sustentar a disciplina a longo prazo.

O **StudyFlow RPG** resolve isso transformando o ato de estudar em uma **campanha de RPG**, onde cada meta cumprida concede **XP, Gemas (Rupees) e evolução de nível**, alinhado a um método comprovado de estudo diário.

---

## 🧭 2. Integração com a Metodologia Alura (Rotina 4h a 6h)

O projeto foi arquitetado para materializar as recomendações da **Consultoria de Sucesso do Aluno da Alura** para o plano de transição de carreira:

| Bloco Diário | Duração | Objetivo Pedagógico | Recompensa RPG |
|---|---|---|---|
| 📘 **Carreira Full Stack** | 1h30 (90 min) | Conteúdo técnico principal e fundamentos | +90 XP · 9 Gemas |
| 💻 **Prática Autônoma** | 1h30 (90 min) | Exercícios práticos sem seguir o passo a passo | +90 XP · 9 Gemas |
| 🚀 **Projeto Pessoal** | 1h00 (60 min) | Mão na massa em projetos de portfólio autoral | +60 XP · 6 Gemas |
| 📝 **Revisão Diária (DevLog)** | 30 min | Síntese reflexiva: *"O que compreendi hoje?"* | +30 XP · 5 Gemas |
| ⚡ **Carreira & Ferramentas** | 30 min | Networking em Portugal, inglês técnico ou IA | +30 XP · 5 Gemas |

> *"Não meça sua evolução pela quantidade de certificados, mas por aquilo que consegue compreender, construir e explicar."* — Gestão Pedagógica Alura.

---

## ⚔️ 3. Funcionalidades Principais

### 📋 A. Quadro de Missões de Estudo (CRUD Completo)
* **Cadastrar Missão:** Título, Descrição, Prazo, Categoria (*Full Stack, Python & Lógica, DevOps & Nuvem, SQL, Portfólio, Carreira*) e Dificuldade (*Fácil +50XP, Média +100XP, Épica +200XP*).
* **Filtros Dinâmicos:** Visualização por status (*Todas, A Fazer, Em Andamento, Concluídas*), busca em tempo real e ordenação por prazo ou XP.
* **Alerta de Prazos Vencidos:** Destaque visual em vermelho para missões com prazo expirado.
* **Edição & Exclusão Segura:** Modal pré-populado para edição e diálogo de confirmação com áudio retrô para exclusão.

### 💖 B. HUD Estilo Zelda SNES & Avatar Pixel Art
* **Life Hearts Container:** Corações de vida de 16-bit que pulsam e aumentam conforme o herói sobe de nível.
* **Gemas / Rupees:** Moedas virtuais conquistadas ao cumprir objetivos.
* **Barra de XP e Níveis:** Cálculo progressivo de XP necessário para o próximo nível com novos títulos desbloqueáveis (*"Aprendiz de Hyrule"*, *"Guerreiro de Python & React"*, *"Arquiteto de Sistemas"*, etc.).
* **Avatar Interativo:** Herói em pixel art animado cuja túnica e espada evoluem de visual com o nível (verde $\rightarrow$ azul $\rightarrow$ dourado), além de balões de diálogo com dicas de estudo.
* **Cerimônia de Level Up:** Fanfarra triunfante e chuva de confetes (`canvas-confetti`).

### ⏱️ C. Dojo de Foco (Pomodoro RPG)
* Cronômetro regressivo com presets de foco (**25 min**, **45 min** e **90 min**).
* Ao concluir a sessão, toca o jingle de vitória, concede XP em dobro e recarrega vigor do herói.

### 📓 D. Diário de Bordo (DevLog) com Exportação para LinkedIn
* Registro diário dos 30 minutos de revisão.
* **Botão "Copiar p/ LinkedIn":** Gera e copia automaticamente o resumo formatado em markdown com hashtags para publicação no LinkedIn e GitHub.

### 📻 E. Rádio 16-Bit (Lofi de Chrono Trigger & Zelda)
* Widget retrô flutuante com animação de fita cassete giratória.
* Trilhas clássicas via YouTube embed (*Chrono Trigger Lo-Fi Mix*, *Corridors of Time Lofi Remix*, *Zelda & Chill*).
* Modo áudio em segundo plano ou tela retrô CRT.
* Suporte a adicionar links personalizados do YouTube.

---

## 🛠️ 4. Tecnologias Utilizadas

* **Frontend:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
* **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/) com classes utilitárias e gradientes retrô
* **Ícones:** [Lucide React](https://lucide.dev/)
* **Efeitos Visuais:** [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
* **Áudio:** Síntese nativa via **Web Audio API** (Oscillators Square/Triangle/Sawtooth sem arquivos de áudio externos)
* **Persistência:** `localStorage` desacoplado com tipagem estrita
* **Build Tool:** [Vite](https://vitejs.dev/)

---

## 📂 5. Estrutura do Projeto

```text
├── index.html                  # Entry point com Google Fonts (Press Start 2P & Plus Jakarta)
├── metadata.json               # Configurações do AI Studio Build
├── package.json
├── tsconfig.json
├── vite.config.ts
├── src/
│   ├── App.tsx                 # Aplicação principal e gerenciamento de abas
│   ├── main.tsx                # Ponto de montagem React 19
│   ├── index.css               # Diretivas do Tailwind v4 e utilitários de pixel art
│   ├── types/
│   │   └── index.ts            # Tipagens: StudyGoal, HeroStats, RoutineBlock, DevLogEntry
│   ├── utils/
│   │   ├── audio.ts            # Sintetizador Web Audio API para SFX 16-bit
│   │   └── storage.ts          # Gerenciamento e persistência do localStorage
│   ├── assets/
│   │   └── images/             # Backdrop do cenário 16-bit estilo SNES
│   └── components/
│       ├── GameHud.tsx         # HUD clássico estilo Zelda (Corações, Gemas, XP)
│       ├── PixelHero.tsx       # Personagem em pixel art SVG com animação e diálogo
│       ├── GoalCard.tsx        # Card individual da missão de estudo
│       ├── GoalModal.tsx       # Modal de cadastro e edição de objetivo
│       ├── DeleteConfirmModal.tsx # Diálogo de confirmação de exclusão
│       ├── LevelUpModal.tsx    # Celebração de novo nível com confetes e fanfarra
│       ├── AluraRoutinePanel.tsx  # Painel de rotina diária (4-6h) e Dojo Pomodoro
│       ├── DevLogPanel.tsx     # Diário de bordo e gerador de post para LinkedIn
│       └── RetroLofiPlayer.tsx # Reprodutor de Lofi 16-bit (Chrono Trigger & Zelda)
└── README.md
```

---

## 🚀 6. Como Executar o Projeto Localmente

### Pré-requisitos
* **Node.js** (versão 18 ou superior)
* **npm** ou **yarn**

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/SEU_USUARIO/studyflow-rpg.git
   cd studyflow-rpg
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Abra no navegador:**
   Acesse `http://localhost:3000`

---

## 🧪 7. Critérios de Teste e Validação

* [x] **Cadastro:** Valida obrigatoriedade do título e prazo; calcula recompensa de XP pela dificuldade.
* [x] **Visualização & Filtros:** Alterna entre Todas, A Fazer, Em Andamento e Concluídas sem perda de dados.
* [x] **Edição:** Permite atualizar título, prazo, descrição e status com reflexo imediato na UI.
* [x] **Exclusão:** Diálogo de confirmação com áudio retrô impedindo exclusões acidentais.
* [x] **Persistência:** Atualizar a página (`F5`) preserva todas as metas, rotinas, devlogs e XP do herói.
* [x] **Dojo de Foco:** Countdown funcional com som ao finalizar e marcação automática do bloco.

---

## 👤 Autor

**Henrique Lisboa**
* 📍 Portugal
* 💼 Perfil profissional: Administrador de formação, ex-fundador de empresa nos EUA (equipe de 40 colaboradores), agora em transição full-time para Desenvolvimento de Software Full Stack & IA.
* 🔗 LinkedIn: [linkedin.com/in/hhenriquelisboa](https://www.linkedin.com/in/hhenriquelisboa/)
* 📧 E-mail: hhenriquelisboa@gmail.com

---

*Desenvolvido com dedicação, café e boas doses de nostalgia 16-bit.* 🎮🛡️
