# 📊 Personal Management System

**Front-End**
![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-22B573?style=for-the-badge&logo=react&logoColor=white)
![Lucide React](https://img.shields.io/badge/Lucide_React-F97316?style=for-the-badge&logo=lucide&logoColor=white)

**Back-end (API):**
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-000000?style=for-the-badge&logo=zod&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

> **Deploy (Aplicação no Ar):** [Acesse o Sistema Aqui](https://personalsystem.vercel.app/)
>
> **Repositório da API:** [Código Fonte do Back-end](https://github.com/luiz-divino/management_system)

## 📝 Descrição do Projeto

O Personal Management System é uma aplicação completa para gerenciar finanças e tarefas pessoais. Ele oferece uma interface moderna e intuitiva, permitindo que os usuários acompanhem seus gastos, organizem suas tarefas e visualizem dados importantes por meio de gráficos interativos. O projeto está na sua primeira versão, então, ainda há muito a ser implementado e melhorado. A ideia é que ele evolua para se tornar uma ferramenta robusta, confiável e completa para o gerenciamento pessoal.

## 💡 De onde surgiu a ideia e qual problema eu busquei resolver?

A ideia do projeto surgiu em meio aos meus estudos na faculdade e rotina pessoal. Percebi que estava tendo dificuldades em organizar minhas tarefas e ter um controle sobre meus gastos, muitas vezes eu acabei perdendo prazos e excedi os gastos rotineiros por não acompanha-los. Então, decidi usar esse problema para criar o _Personal Management System_, uma aplicação que me ajudasse a organizar minhas tarefas e finanças de forma eficiente. Por isso, na página de _Dashboard_, você encontrará gráficos e informações que te ajudarão a ter uma visão geral do seu desempenho financeiro e produtividade, eu visei simplificar as buscas por informações e reunir o que é mais importante em um só lugar, para que o usuário não precise navegar por várias páginas para encontrar o que precisa.

## 🚀 Funcionalidades

**🔐 Autenticação e Segurança**

- Cadastro e Login de usuários com sistema de sessões.
- Proteção de rotas no front-end para usuários não autenticados.
- Cache de tokens JWT para manter a sessão do usuário ativa.

**💰 Gestão Financeira**

- **CRUD Completo:** Criação, leitura, edição e exclusão de despesas.
- Categorização de gastos para melhor organização.
- Cálculo automático exibindo qual categoria teve o maior gasto e sua representação percentual em relação ao total.
- Gráfico interativo para visualização das despesas por categoria e ao longo do tempo.
- Tabela detalhada listando todas as despesas com opções de edição e exclusão.

**✅ Gerenciamento de Tarefas**

- **CRUD Completo:** Controle total sobre as tarefas do usuário.
- Classificação por status: Pendente, Ativo e Finalizado.
- Filtro de tarefas por status para facilitar a visualização.
- Tabela detalhada listando todas as tarefas com opções de edição e exclusão.
- Cards na página inicial exibindo a quantidade de tarefas pendentes, ativas e finalizadas.

**📊 Dashboard Interativo**

- Pré-visualização rápida das despesas e tarefas mais recentes.
- Gráfico dinâmico (construído com Recharts) para análise visual dos dados e despesas por categoria.

## 🛠️ Tecnologias e Infraestrutura

O ecossistema foi construído priorizando a performance e experiência do usuário. Abaixo estão as principais tecnologias utilizadas em cada camada do sistema:

| Camada                    | Tecnologias Utilizadas                |
| :------------------------ | :------------------------------------ |
| **Front-end**             | Next.js, React, TypeScript            |
| **Estilização & UI**      | Tailwind CSS, shadcn/ui, Lucide React |
| **Visualização de Dados** | Recharts (Gráficos Dinâmicos)         |
| **Back-end (API)**        | Node.js, Express, TypeScript          |
| **Banco de Dados**        | PostgreSQL (Hospedado no **Neon**)    |
| **ORM & Modelagem**       | Prisma ORM                            |
| **Auth & Segurança**      | JWT (JSON Web Tokens), Zod            |

---

## 📦 Instalação

Siga os passos abaixo para executar o projeto localmente em modo de desenvolvimento.

### ✅ Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- **Node.js** — [baixar aqui](https://nodejs.org/)
- **npm** (já incluído na instalação do Node.js)
- **Git** — [baixar aqui](https://git-scm.com/)
- A **API** (back-end) em execução — veja o [repositório da API](https://github.com/luiz-divino/management_system)

> 💡 Para verificar a versão do Node.js instalada, execute `node -v` no seu terminal.

### 🔧 Passo a Passo

**1. Clone o repositório**

```bash
git clone https://github.com/luiz-divino/frontend_personal_system.git
cd frontend_personal_system
```

**2. Instale as dependências**

```bash
npm install
```

**3. Configure as variáveis de ambiente**

Crie um arquivo `.env.local` na raiz do projeto com a URL da API:

```env
NEXT_PUBLIC_API_URL=http://localhost:3333
```

> ⚠️ A variável `NEXT_PUBLIC_API_URL` é **obrigatória** e aponta para a base URL da API. O valor acima é o padrão para a API rodando localmente. Se você estiver apontando para outro ambiente (staging, produção, etc.), ajuste o valor de acordo.

**4. Execute o projeto em modo de desenvolvimento**

```bash
npm run dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

### 🏗️ Build de Produção

Para gerar a versão otimizada para produção:

```bash
npm run build
```

Em seguida, inicie o servidor de produção:

```bash
npm run start
```

### 📜 Scripts Disponíveis

| Script          | Descrição                                      |
| :-------------- | :--------------------------------------------- |
| `npm run dev`   | Inicia o servidor de desenvolvimento (Next.js) |
| `npm run build` | Gera o build de produção otimizado             |
| `npm run start` | Inicia o servidor de produção                  |
| `npm run lint`  | Executa o ESLint para verificação do código    |

### 🗄️ Observação sobre a API

Este repositório contém apenas o **front-end**. Para que a aplicação funcione por completo, é necessário que a **API** (back-end) esteja rodando e acessível na URL informada em `NEXT_PUBLIC_API_URL`. Consulte o [repositório da API](https://github.com/luiz-divino/management_system) para obter as instruções de instalação e configuração do back-end.

---

## 🏗️ Arquitetura e Decisões de Engenharia

O projeto foi estruturado com foco em boas práticas, performance e facilidade de manutenção:

- **Poder do Next.js e Server Components:** A escolha do Next.js foi estratégica para tirar proveito dos _Server Components_, reduzindo o processamento no lado do cliente. Foi implementado um `apiClient` interno que centraliza e padroniza as requisições, poupando retrabalho e mantendo o código limpo (Clean Code).
- **Segurança e Cache:** O sistema de cache nativo do Next.js foi utilizado para otimizar o carregamento de dados. A autenticação foi tratada de forma segura, gerenciando o token de sessão diretamente via cookies, garantindo persistência e segurança no tráfego dos dados.
- **API Desacoplada:** A regra de negócios está totalmente isolada no back-end (Node.js), com entidades (Users, Expenses, Tasks) modeladas via Prisma ORM e conectadas a um banco relacional hospedado no Neon.
- **Versionamento Profissional:** O repositório mantém um histórico de versionamento semântico utilizando o padrão de _Conventional Commits_ garantindo rastreabilidade clara de cada alteração no sistema.


