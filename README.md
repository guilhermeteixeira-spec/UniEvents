# 🎓 UniEvents

### Plataforma de Divulgação de Eventos Acadêmicos

O **UniEvents** é uma plataforma web acadêmica desenvolvida por estudantes do curso de **Análise e Desenvolvimento de Sistemas (ADS)** da **Universidade Paranaense (UNIPAR)**.

O projeto tem como propósito facilitar o acesso de universitários a eventos acadêmicos realizados em diferentes regiões do Brasil, promovendo oportunidades de aprendizado, desenvolvimento profissional e ampliação do conhecimento.

> 🚧 **Status do projeto:** Em desenvolvimento — autenticação integrada ao Supabase e desenvolvimento da página inicial em planejamento.

---

## 🎯 Objetivo

Desenvolver uma plataforma web moderna, intuitiva, responsiva e acessível que centralize a divulgação de eventos acadêmicos em nível nacional.

O UniEvents busca permitir que estudantes encontrem eventos relacionados às suas áreas de interesse, consultem informações relevantes e acessem as páginas oficiais de inscrição.

## 👥 Público-alvo

Estudantes universitários, inicialmente com foco nos acadêmicos da **Universidade Paranaense (UNIPAR)**.

A plataforma foi idealizada para reunir oportunidades acadêmicas de diferentes regiões do Brasil.

---

## 🚀 Funcionalidades

### ✅ Implementadas

- Interface de login responsiva.
- Cadastro de usuários utilizando Supabase Authentication.
- Autenticação com e-mail e senha.
- Confirmação de cadastro por e-mail.
- Integração com o banco de autenticação do Supabase.
- Interface de recuperação de senha.
- Implementação do fluxo de redefinição de senha.
- Validação de campos e tratamento de erros de autenticação.
- Versionamento do código utilizando Git e GitHub.

### 🔄 Em desenvolvimento ou planejadas

- Página inicial (Home) com listagem de eventos.
- Redirecionamento automático após autenticação.
- Organização de eventos por áreas de conhecimento.
- Pesquisa de eventos por nome, tema ou palavra-chave.
- Filtros por categoria, modalidade, localização e data.
- Visualização das informações dos eventos.
- Sistema de favoritos vinculado aos usuários.
- Cadastro e gerenciamento de eventos no banco de dados.
- Redirecionamento para as páginas oficiais de inscrição.
- Proteção de páginas e gerenciamento de sessões autenticadas.
- Melhorias de acessibilidade e responsividade.

**Observação:** as funcionalidades serão implementadas e testadas progressivamente durante o desenvolvimento.

---

## 🛠️ Tecnologias utilizadas

| Tecnologia | Finalidade |
|---|---|
| HTML5 | Estruturação das páginas |
| CSS3 | Estilização e responsividade |
| JavaScript | Interatividade e lógica da aplicação |
| Supabase Auth | Cadastro, login e autenticação |
| Supabase / PostgreSQL | Persistência de dados planejada |
| Git | Controle de versões |
| GitHub | Hospedagem e colaboração no código |
| Visual Studio Code | Ambiente de desenvolvimento |

### 🔐 Autenticação

O UniEvents utiliza o **Supabase Authentication** para gerenciar a autenticação dos usuários.

O fluxo desenvolvido contempla cadastro com e-mail e senha, confirmação por e-mail, login e recuperação de acesso.

O Supabase também será utilizado para armazenar os eventos acadêmicos e os favoritos, com políticas de segurança para controlar o acesso aos dados.

---

## 📁 Estrutura do projeto

```text
UniEvents/
│
├── Login/
│   ├── campus.jpg
│   ├── index.html
│   ├── cadastro.html
│   ├── recuperar.html
│   ├── redefinir.html
│   ├── config.js
│   ├── script.js
│   └── style.css
│
├── .gitignore
└── README.md
```

**Descrição dos principais arquivos:**

- `index.html`: interface de login.
- `cadastro.html`: interface de criação de conta.
- `recuperar.html`: solicitação de recuperação de senha.
- `redefinir.html`: definição de uma nova senha.
- `config.js`: configuração da conexão com o Supabase.
- `script.js`: lógica de autenticação e interações.
- `style.css`: estilos das interfaces.
- `campus.jpg`: imagem utilizada na interface.
- `.gitignore`: exclusão de arquivos locais do versionamento.

A estrutura será expandida conforme novas funcionalidades forem implementadas.

---

## ⚙️ Como executar o projeto

### Pré-requisitos

- Navegador atualizado.
- Visual Studio Code ou outro editor de código.
- Extensão Live Server ou servidor HTTP local equivalente.
- Configuração válida do projeto Supabase.

### Execução

1. Clone o repositório:

   ```bash
   git clone https://github.com/guilhermeteixeira-spec/UniEvents.git
   ```

2. Abra a pasta `UniEvents` no Visual Studio Code.

3. Verifique a configuração do Supabase no arquivo `Login/config.js`.

4. Inicie um servidor local, por exemplo, utilizando a extensão Live Server.

5. Acesse a página `Login/index.html` pelo endereço fornecido pelo servidor.

**Importante:** os endereços de redirecionamento utilizados pela autenticação precisam estar autorizados nas configurações do Supabase.

Nunca utilize chaves secretas ou `service_role` diretamente no código do navegador. A chave pública de acesso deve ser utilizada em conjunto com políticas adequadas de segurança no banco de dados.

---

## 👥 Equipe de desenvolvimento

| Integrante | Responsabilidade |
|---|---|
| Guilherme Teixeira | Desenvolvedor (DEV) |
| Gabriel | UX/UI Designer |
| Lucas | Scrum Master |
| Manuella | Quality Assurance (QA) |
| Marcos | Product Owner |

O desenvolvimento utiliza princípios da metodologia **Scrum**, com organização das atividades em Sprints e acompanhamento das entregas.

---

## 🗺️ Roadmap de desenvolvimento

### Etapa 1 — Interface e autenticação

- [x] Criar repositório no GitHub.
- [x] Desenvolver interface de login.
- [x] Desenvolver interface de cadastro.
- [x] Integrar Supabase Authentication.
- [x] Implementar confirmação de e-mail.
- [x] Implementar fluxo de recuperação de senha.
- [ ] Validar integralmente os fluxos de recuperação e redefinição.
- [ ] Implementar redirecionamento após login.

### Etapa 2 — Página inicial

- [ ] Desenvolver interface da Home.
- [ ] Criar navegação por categorias.
- [ ] Implementar cards de eventos.
- [ ] Adicionar pesquisa e filtros.
- [ ] Implementar layout responsivo.

### Etapa 3 — Banco de dados

- [ ] Modelar tabelas de eventos e favoritos.
- [ ] Configurar políticas Row Level Security (RLS).
- [ ] Integrar a listagem de eventos ao Supabase.
- [ ] Implementar cadastro manual de eventos.
- [ ] Implementar favoritos vinculados aos usuários.

### Etapa 4 — Qualidade e entrega

- [ ] Realizar testes funcionais.
- [ ] Validar a segurança e as permissões de acesso.
- [ ] Corrigir erros identificados.
- [ ] Revisar responsividade e acessibilidade.
- [ ] Preparar a versão inicial para apresentação acadêmica.

---

## 📚 Contexto acadêmico

O UniEvents é desenvolvido no curso de **Análise e Desenvolvimento de Sistemas da Universidade Paranaense (UNIPAR)**, no contexto das disciplinas:

- **Engenharia de Requisitos**
- **Design Front End**

O projeto envolve conceitos de levantamento e análise de requisitos, prototipação de interfaces, desenvolvimento web, autenticação, persistência de dados, testes de software, controle de versões e metodologia Scrum.

---

## 📌 Situação atual

O projeto possui uma interface de autenticação integrada ao Supabase, com cadastro, login e confirmação de e-mail já testados.

As próximas atividades concentram-se no desenvolvimento da página inicial, na estruturação do banco de eventos e na implementação das funcionalidades de pesquisa, filtros e favoritos.

---

## 📄 Licença

Projeto desenvolvido para fins acadêmicos.

Nenhuma licença de uso ou redistribuição foi definida até o momento.

---

**UniEvents — Conectando estudantes a oportunidades de conhecimento.**