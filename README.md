# 🤖 Chatbot Inteligente com Integração de IA (Gemini)

Este projeto é um chatbot interativo desenvolvido com **Next.js**, que simula um assistente inteligente capaz de responder perguntas, interagir com o usuário e direcioná-lo para diferentes áreas do sistema, como portfólio, tecnologias e contato.

## 🚀 Funcionalidades

* 💬 Chat interativo em tempo real
* 🧠 Integração com API de IA (Google Gemini)
* ⚡ Sistema híbrido (respostas locais + IA) para melhor performance
* 🎯 Detecção de intenções (ex: "portfólio", "contato", "tecnologias")
* 🔗 Redirecionamento automático para páginas externas
* 🎬 Animações de carregamento simulando processamento de IA
* 🎨 Interface moderna e responsiva

## 🧩 Arquitetura

O projeto utiliza uma abordagem híbrida:

* **Regras locais**: para comandos conhecidos (evita consumo de API)
* **IA (Gemini)**: para perguntas abertas e respostas dinâmicas

Isso garante:

* melhor desempenho
* economia de requisições
* maior controle sobre a aplicação

## 🛠️ Tecnologias utilizadas

* Next.js
* JavaScript / TypeScript
* API Google Gemini
* CSS / UI moderna

## 💡 Objetivo

O objetivo deste projeto é criar uma experiência diferenciada de portfólio, onde o usuário interage com um assistente virtual em vez de navegar por um site tradicional.

## 🌐 Demonstração

Em breve...

## 📌 Observações

Este projeto foi desenvolvido com foco em:

* experiência do usuário (UX)
* criatividade
* arquitetura moderna
* integração com inteligência artificial

---

## ⚙️ Como executar o projeto

### 📌 Pré-requisitos

Antes de começar, você precisa ter instalado:

* Node.js (versão 18 ou superior)
* Gerenciador de pacotes (npm, yarn ou pnpm)
* Conta com chave de API do Google Gemini

---

### 🔑 Configuração da API

Crie um arquivo `.env.local` na raiz do projeto e adicione sua chave:

```env
GEMINI_API_KEY=your_api_key_here
```

---

### 📦 Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
npm install
```

---

### ▶️ Executando o projeto

Para rodar em ambiente de desenvolvimento:

```bash
npm run dev
```

O projeto estará disponível em:

```
http://localhost:3000
```

---

### 🏗️ Build para produção

Para gerar a versão de produção:

```bash
npm run build
npm start
```

---

### 📁 Estrutura básica

```bash
src/
 ├── app/
 ├── components/
 ├── lib/
 ├── data/
```

---

### ⚠️ Observação importante

O sistema utiliza uma abordagem híbrida:

* Respostas simples são tratadas localmente
* Perguntas mais complexas são enviadas para a IA

Isso evita consumo desnecessário da API e melhora a performance.

---

### 🚀 Dica

Caso a API atinja o limite de requisições, o sistema continuará funcionando com respostas locais e redirecionamentos.

💻 Desenvolvido por Claudir Pereira
