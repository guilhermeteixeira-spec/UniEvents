# UniEvents

### Plataforma de Divulgação de Eventos Acadêmicos

**[Acessar o UniEvents](https://unievents-eight.vercel.app)** | **[Repositório GitHub](https://github.com/guilhermeteixeira-spec/UniEvents)**

O **UniEvents** é uma plataforma web acadêmica desenvolvida por estudantes do curso de **Análise e Desenvolvimento de Sistemas (ADS)** da **Universidade Paranaense (UNIPAR)**.

O projeto tem como propósito facilitar o acesso de universitários a eventos acadêmicos realizados em diferentes regiões do Brasil, promovendo oportunidades de aprendizado, desenvolvimento profissional, networking e ampliação do conhecimento.

> **Status do projeto:** Em desenvolvimento — aplicação publicada na Vercel, autenticação integrada ao Supabase e interface inicial da Home implementada.

---

## Objetivo

Desenvolver uma plataforma web moderna, intuitiva, responsiva e acessível que centralize a divulgação de eventos acadêmicos em nível nacional.

O UniEvents busca permitir que estudantes encontrem eventos relacionados às suas áreas de interesse, consultem informações relevantes e acessem as páginas oficiais de inscrição.

## Público-alvo

Estudantes universitários, inicialmente com foco nos acadêmicos da **Universidade Paranaense (UNIPAR)**.

A plataforma foi idealizada para reunir oportunidades acadêmicas de diferentes regiões do Brasil.

---

## Acesso à plataforma

O UniEvents está publicado na **Vercel** e pode ser acessado pela internet, sem necessidade de instalação.

**Endereço público:** https://unievents-eight.vercel.app

A aplicação utiliza HTTPS e possui integração com o Supabase para autenticação dos usuários.

A publicação é realizada por meio da integração entre **GitHub e Vercel**, permitindo que novas alterações enviadas à branch principal sejam automaticamente disponibilizadas em produção após um deploy bem-sucedido.

---

## Funcionalidades

### Implementadas

**Autenticação e gerenciamento de usuários**

- Interface de login responsiva.
- Cadastro de usuários utilizando Supabase Authentication.
- Autenticação com e-mail e senha.
- Confirmação de cadastro por e-mail.
- Recuperação de senha por e-mail.
- Redefinição de senha.
- Validação de campos e tratamento de erros de autenticação.
- Redirecionamento automático após login.
- Verificação de sessão autenticada.
- Persistência de sessão entre atualizações da página.
- Redirecionamento de usuários não autenticados para o login.
- Encerramento de sessão por meio de logout.

**Interface e navegação**

- Página inicial (Home) com identidade visual baseada no protótipo do Figma.
- Cabeçalho com navegação principal e identificação do usuário.
- Banner de boas-vindas.
- Interface de pesquisa de eventos.
- Navegação visual por categorias acadêmicas.
- Estrutura de cards para eventos em destaque.
- Estrutura de cards para próximos eventos.
- Links de navegação para a futura página de exploração de eventos.
- Redirecionamento automático do endereço principal para a página de login.

**Infraestrutura e versionamento**

- Repositório GitHub para controle de versões.
- Hospedagem da aplicação na Vercel.
- Integração entre GitHub e Vercel.
- Deploy automático após atualizações enviadas ao repositório.
- Configuração dos endereços de autenticação no Supabase para desenvolvimento local e produção.
- Teste bem-sucedido de login e acesso à Home no ambiente publicado.

### Em desenvolvimento ou planejadas

- Integração dos eventos reais ao banco de dados.
- Página Explorar eventos.
- Pesquisa funcional por nome, tema e palavra-chave.
- Filtros por categoria, modalidade, localização e data.
- Navegação funcional por categorias.
- Página de detalhes dos eventos.
- Cadastro e gerenciamento manual de eventos.
- Sistema de favoritos vinculado aos usuários.
- Área Meus eventos.
- Página de perfil do usuário.
- Redirecionamento para páginas oficiais de inscrição.
- Melhorias de responsividade e acessibilidade.
- Testes completos dos fluxos de cadastro e recuperação de senha no ambiente de produção.

> **Observação:** os componentes visuais da Home estão implementados, mas a integração com eventos reais, os filtros e algumas páginas de navegação ainda fazem parte das próximas etapas.

---

## Tecnologias utilizadas

| Tecnologia              | Finalidade                                      |
| ----------------------- | ----------------------------------------------- |
| HTML5                   | Estruturação das páginas                        |
| CSS3                    | Estilização e responsividade                    |
| JavaScript              | Interatividade e lógica da aplicação            |
| Supabase Authentication | Cadastro, login e gerenciamento de sessões      |
| Supabase / PostgreSQL   | Persistência de eventos e favoritos (planejada) |
| Vercel                  | Hospedagem e deploy da aplicação                |
| Git                     | Controle de versões                             |
| GitHub                  | Repositório e colaboração no código             |
| Figma                   | Prototipação das interfaces                     |
| Visual Studio Code      | Ambiente de desenvolvimento                     |

### Autenticação

O UniEvents utiliza o **Supabase Authentication** para gerenciar a autenticação dos usuários.

O fluxo desenvolvido contempla cadastro com e-mail e senha, confirmação por e-mail, login, recuperação de acesso e redefinição de senha.

Após a autenticação, o usuário é direcionado para a Home. A aplicação verifica a sessão antes de disponibilizar o conteúdo e redireciona usuários não autenticados para a página de login.

A sessão pode ser mantida entre acessos, e o usuário pode encerrá-la utilizando a funcionalidade de logout.

O Supabase também será utilizado para armazenar os eventos acadêmicos e favoritos, com políticas **Row Level Security (RLS)** para controlar o acesso aos dados.

> A verificação de sessão no navegador não substitui as políticas de segurança do banco de dados.

### Hospedagem e deploy

O UniEvents utiliza a **Vercel** como plataforma de hospedagem.

O repositório GitHub está integrado à Vercel, permitindo a publicação automática de novas versões após alterações enviadas à branch `main`.

**Fluxo de atualização:**

1. Desenvolvimento local no Visual Studio Code.
2. Salvamento das alterações.
3. Criação de um commit utilizando Git.
4. Sincronização das alterações com o GitHub.
5. Execução automática do deploy pela Vercel.
6. Disponibilização da nova versão no endereço público.

A aplicação pode permanecer acessível mesmo quando os computadores dos desenvolvedores estiverem desligados, respeitando a disponibilidade e os limites da plataforma de hospedagem.

---

## Estrutura do projeto

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
├── Home/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── index.html
├── .gitignore
└── README.md
```

**Descrição dos principais componentes:**

**Pasta `Login/`**

Responsável pelas interfaces e pela lógica de autenticação, cadastro, recuperação de acesso e redefinição de senha.

- `index.html`: interface de login.
- `cadastro.html`: criação de conta.
- `recuperar.html`: solicitação de recuperação de senha.
- `redefinir.html`: definição de uma nova senha.
- `config.js`: configuração pública da conexão com o Supabase.
- `script.js`: autenticação, validações e gerenciamento de sessões.
- `style.css`: estilização das interfaces.
- `campus.jpg`: imagem utilizada na interface.

**Pasta `Home/`**

Responsável pela página inicial apresentada após a autenticação.

- `index.html`: estrutura da Home, navegação, categorias e seções de eventos.
- `script.js`: verificação de sessão, logout e interações da página.
- `style.css`: estilização da Home.

**Arquivos da raiz**

- `index.html`: redirecionamento automático para a tela de login.
- `.gitignore`: exclusão de arquivos locais do versionamento.
- `README.md`: documentação do projeto.

A estrutura será expandida conforme novas funcionalidades forem implementadas.

---

## Como executar o projeto

### Opção 1 — Acessar a versão publicada

Acesse:

https://unievents-eight.vercel.app

A aplicação será aberta diretamente no navegador.

### Opção 2 — Executar localmente

**Pré-requisitos**

- Navegador atualizado.
- Visual Studio Code ou outro editor de código.
- Extensão Live Server ou servidor HTTP local equivalente.
- Configuração válida do projeto Supabase.
- Git instalado, caso deseje clonar o repositório pelo terminal.

**Execução**

1. Clone o repositório:

   ```bash
   git clone https://github.com/guilhermeteixeira-spec/UniEvents.git
   ```

2. Abra a pasta `UniEvents` no Visual Studio Code.

3. Verifique a configuração do Supabase no arquivo `Login/config.js`.

4. Inicie um servidor local utilizando a extensão Live Server.

5. Acesse o endereço fornecido pelo servidor, normalmente:

   ```text
   http://127.0.0.1:5500/
   ```

6. O navegador será redirecionado para a página de login.

### Configuração do Supabase

O ambiente de autenticação deve permitir os endereços de desenvolvimento local e produção.

**Site URL:**

```text
https://unievents-eight.vercel.app
```

**Redirect URLs:**

```text
https://unievents-eight.vercel.app/**
http://127.0.0.1:5500/**
http://localhost:5500/**
```

Os endereços são configurados em:

**Supabase → Authentication → URL Configuration**

**Importante:** nunca utilize chaves secretas, `service_role` ou `sb_secret_` diretamente no código executado no navegador.

A chave pública do Supabase deve ser utilizada em conjunto com políticas adequadas de segurança, especialmente quando as tabelas de eventos e favoritos forem implementadas.

---

## Equipe de desenvolvimento

| Integrante         | Responsabilidade       |
| ------------------ | ---------------------- |
| Guilherme Teixeira | Desenvolvedor (DEV)    |
| Gabriel            | UX/UI Designer         |
| Lucas              | Scrum Master           |
| Manuella           | Quality Assurance (QA) |
| Marcos             | Product Owner          |

O desenvolvimento utiliza princípios da metodologia **Scrum**, com organização das atividades em Sprints, definição de responsabilidades e acompanhamento das entregas.

---

## Roadmap de desenvolvimento

### Etapa 1 — Interface e autenticação

- [x] Criar repositório no GitHub.
- [x] Desenvolver interface de login.
- [x] Desenvolver interface de cadastro.
- [x] Integrar Supabase Authentication.
- [x] Implementar confirmação de e-mail.
- [x] Implementar recuperação de senha.
- [x] Implementar redefinição de senha.
- [x] Implementar redirecionamento após login.
- [x] Implementar gerenciamento e persistência de sessão.
- [x] Proteger o acesso à Home por verificação de autenticação.
- [x] Implementar logout.
- [x] Testar login e acesso à Home no ambiente publicado.
- [ ] Concluir testes de cadastro e recuperação de senha em produção.

### Etapa 2 — Página inicial e navegação

- [x] Desenvolver estrutura inicial da Home.
- [x] Implementar identidade visual baseada no Figma.
- [x] Criar interface de navegação por categorias.
- [x] Criar estrutura de cards de eventos.
- [x] Adicionar campo visual de pesquisa.
- [ ] Implementar pesquisa funcional.
- [ ] Integrar eventos reais à Home.
- [ ] Implementar navegação funcional por categorias.
- [ ] Desenvolver página Explorar eventos.
- [ ] Implementar filtros por categoria, modalidade, localização e data.
- [ ] Desenvolver página de detalhes dos eventos.
- [ ] Revisar responsividade em diferentes dispositivos.

### Etapa 3 — Banco de dados

- [ ] Modelar tabelas de eventos e favoritos.
- [ ] Configurar políticas Row Level Security (RLS).
- [ ] Integrar listagem de eventos ao Supabase.
- [ ] Implementar cadastro manual de eventos.
- [ ] Implementar favoritos vinculados aos usuários.
- [ ] Desenvolver área Meus eventos.
- [ ] Integrar páginas de detalhes aos dados armazenados.
- [ ] Implementar links oficiais de inscrição.

### Etapa 4 — Publicação e infraestrutura

- [x] Integrar GitHub à Vercel.
- [x] Publicar o UniEvents na internet.
- [x] Configurar redirecionamento da página principal.
- [x] Configurar URLs de autenticação no Supabase.
- [x] Validar o acesso público à plataforma.
- [x] Validar login no ambiente de produção.
- [x] Configurar fluxo de deploy automático.
- [ ] Validar todos os fluxos de autenticação em produção.
- [ ] Verificar o comportamento da aplicação em diferentes navegadores.

### Etapa 5 — Qualidade e entrega acadêmica

- [ ] Realizar testes funcionais completos.
- [ ] Validar a segurança e as permissões de acesso.
- [ ] Corrigir erros identificados.
- [ ] Revisar responsividade e acessibilidade.
- [ ] Validar as funcionalidades com a equipe.
- [ ] Preparar a versão inicial para apresentação acadêmica.

---

## Contexto acadêmico

O UniEvents é desenvolvido no curso de **Análise e Desenvolvimento de Sistemas da Universidade Paranaense (UNIPAR)**, no contexto das disciplinas:

- **Engenharia de Requisitos**
- **Design Front End**

O projeto envolve conceitos de levantamento e análise de requisitos, prototipação de interfaces, desenvolvimento web, autenticação, persistência de dados, testes de software, controle de versões, hospedagem de aplicações e metodologia Scrum.

---

## Situação atual

O UniEvents encontra-se em desenvolvimento, com a aplicação já publicada na Vercel e integrada ao Supabase Authentication.

**Entregas realizadas:**

- Interfaces de autenticação desenvolvidas.
- Cadastro, login e recuperação de acesso implementados.
- Gerenciamento de sessões e logout funcionais.
- Home com estrutura visual baseada no Figma.
- Repositório GitHub integrado à Vercel.
- Site acessível publicamente pela internet.
- Login e acesso à Home testados com sucesso no ambiente publicado.

**Próximas atividades:**

- Concluir os testes de autenticação em produção.
- Desenvolver a página Explorar eventos.
- Estruturar o banco de dados dos eventos.
- Integrar os cards da Home ao Supabase.
- Implementar pesquisa, filtros e favoritos.
- Desenvolver as páginas de detalhes dos eventos.

---

## Licença

Projeto desenvolvido para fins acadêmicos.

Nenhuma licença de uso ou redistribuição foi definida até o momento.

---

**UniEvents — Conectando estudantes a oportunidades de conhecimento.**