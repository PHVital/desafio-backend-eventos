# 📅 API de Gestão de Eventos (Desafio Backend Clicksoft)

![AdonisJS](https://img.shields.io/badge/AdonisJS-v6-5A45FF?style=for-the-badge&logo=adonisjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-v20+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Clean Architecture](https://img.shields.io/badge/Architecture-Clean-orange?style=for-the-badge)

> API RESTful desenvolvida para plataforma de gestão de eventos, focada em segurança, integridade de dados e arquitetura desacoplada.

---

## 🏗️ Arquitetura e Padrões

Este projeto segue rigorosamente os princípios de **Clean Architecture** solicitados no desafio, visando desacoplamento e testabilidade.

A estrutura foi organizada nas seguintes camadas:

* **Controllers:** Responsáveis apenas por receber a requisição HTTP e devolver a resposta. Não contém regras de negócio.
* **Validators (VineJS):** Validam a entrada de dados antes de chegar ao controller.
* **Use Cases:** Onde residem as Regras de Negócio (RNs) e a lógica da aplicação.
* **Repositories:** Camada de abstração para interação com o banco de dados (Lucid ORM).
* **DTOs:** Transferência de dados entre as camadas.

---

## 🚀 Funcionalidades

### 🔐 Autenticação e Segurança
* Login e Registro via **Access Tokens** (Bearer).
* Controle de acesso baseado em Roles (`ORGANIZER` vs `PARTICIPANT`).
* Proteção de rotas sensíveis via Middleware.

### 📅 Gestão de Eventos (Organizador)
* Criar eventos (apenas Organizadores).
* Editar e cancelar eventos (apenas o dono do evento).
* Visualizar lista de participantes inscritos.

### 🎫 Participação (Participante)
* Inscrição em eventos com validações robustas:
    * **Capacidade:** Bloqueia se lotado.
    * **Conflito:** Bloqueia se já tiver evento no mesmo horário.
    * **Unicidade:** Bloqueia inscrição duplicada.
* Visualizar "Meus Eventos".

---

## 🛠️ Tecnologias

* **Framework:** AdonisJS 6
* **Linguagem:** TypeScript
* **Banco de Dados:** PostgreSQL
* **Validação:** VineJS
* **ORM:** Lucid

---

## 🏁 Como Rodar o Projeto

### Pré-requisitos
* Node.js (v18+)
* NPM

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/PHVital/desafio-backend-eventos
    cd desafio-backend-eventos
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure o Ambiente:**
    Copie o arquivo de exemplo para criar o seu `.env`.
    ```bash
    cp .env.example .env
    ```
    *Gere a APP_KEY (importante para o servidor rodar):*
    ```bash
    node ace generate:key
    ```

4.  **Crie o Banco de Dados:**
    ```bash
    node ace migration:run
    ```

5.  **Inicie o Servidor:**
    ```bash
    npm run dev
    ```
    Acesse: `http://localhost:3333`

---

## 🧪 Testes (Insomnia)

O arquivo de exportação das rotas para teste encontra-se na raiz deste projeto:
📄 **`desafio-eventos-insomnia.json`**

Importe-o no seu Insomnia para testar todos os fluxos (Login, Criação, Inscrição, Erros).

---

## 🧑‍💻 Autor

**Pedro Henrique Vital Guimarães**
* [LinkedIn](https://www.linkedin.com/in/pedro-hvg/)
* [GitHub](https://github.com/PHVital)
