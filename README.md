
<div align="center">

# UniEvents

### Plataforma de Divulgação de Eventos Acadêmicos

**Conectando estudantes a oportunidades de conhecimento.**

[![Status](https://img.shields.io/badge/Status-Em%20desenvolvimento-blue)](https://unievents-eight.vercel.app/)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)

**[Acessar a plataforma](https://unievents-eight.vercel.app/)** · **[Repositório GitHub](https://github.com/guilhermeteixeira-spec/UniEvents)**

</div>

---

##  Sobre o projeto

O **UniEvents** é uma plataforma web acadêmica desenvolvida por estudantes do curso de **Análise e Desenvolvimento de Sistemas (ADS)** da **Universidade Paranaense (UNIPAR)**.

Seu propósito é facilitar a descoberta de eventos acadêmicos realizados em diferentes regiões do Brasil, reunindo oportunidades de aprendizado, atualização profissional e ampliação do conhecimento.

A plataforma permite que estudantes encontrem eventos relacionados às suas áreas de interesse, consultem informações relevantes, salvem oportunidades e acessem os canais oficiais de inscrição.

### Objetivo

Desenvolver uma aplicação web moderna, responsiva e intuitiva que centralize a divulgação de eventos acadêmicos em nível nacional, tornando a busca por oportunidades educacionais mais simples e organizada.

### Público-alvo

Estudantes universitários, inicialmente com foco nos acadêmicos da **Universidade Paranaense (UNIPAR)**.

---

## Acesso à plataforma

O UniEvents está publicado na **Vercel** e pode ser acessado diretamente pelo navegador, sem necessidade de instalação.

**Endereço:** https://unievents-eight.vercel.app/

A aplicação utiliza HTTPS e autenticação gerenciada pelo Supabase.

O processo de publicação é integrado ao GitHub, permitindo que alterações enviadas à branch `main` sejam disponibilizadas após a conclusão do deploy.

---

##  Funcionalidades

###  Autenticação e gerenciamento de usuários

- Cadastro com nome completo, e-mail e senha.
- Validação dos campos de cadastro.
- Validação de requisitos de senha.
- Confirmação de senha.
- Exibição e ocultação dos caracteres das senhas.
- Autenticação com e-mail e senha.
- Confirmação de cadastro por e-mail.
- Recuperação de acesso por e-mail.
- Redefinição de senha.
- Autenticação com Google via OAuth 2.0.
- Gerenciamento de sessões pelo Supabase.
- Persistência de sessão entre atualizações da página.
- Redirecionamento após autenticação.
- Verificação de autenticação antes do acesso às páginas protegidas.
- Encerramento de sessão por logout.
- Tratamento de erros comuns de autenticação.

###  Página inicial

- Interface moderna e responsiva.
- Apresentação da plataforma e seus objetivos.
- Eventos acadêmicos em destaque.
- Carrossel interativo de eventos.
- Seção explicativa sobre o funcionamento do sistema.
- Apresentação institucional do projeto.
- Apresentação dos integrantes da equipe.
- Fotografias individuais dos desenvolvedores.
- Navegação para as principais áreas da aplicação.
- Acesso à exploração dos eventos.

###  Exploração de eventos

- Listagem de eventos acadêmicos reais.
- Organização por áreas do conhecimento.
- Cards informativos com imagens e banners.
- Exibição de título, descrição, data, modalidade e localização.
- Pesquisa por nome, tema e palavras-chave.
- Pesquisa sem diferenciação entre caracteres acentuados e não acentuados.
- Filtros por categoria, modalidade e data.
- Filtragem considerando a data inicial dos eventos.
- Navegação por categorias acadêmicas.
- Links externos para páginas oficiais dos eventos.

###  Sistema de favoritos

- Adição de eventos aos favoritos.
- Remoção de eventos dos favoritos.
- Identificação visual dos eventos salvos.
- Consulta dos favoritos na página **Meus Eventos**.
- Persistência local dos favoritos utilizando `localStorage`.

> **Nota:** os favoritos são armazenados localmente no navegador utilizado. A sincronização por conta e entre dispositivos não faz parte da implementação atual.

###  Tema claro e escuro — RF11

O UniEvents possui um sistema global de personalização visual, permitindo alternar entre os modos claro e escuro.

- Botão flutuante para alternância de tema.
- Aplicação do tema nas principais páginas.
- Persistência da preferência no navegador.
- Manutenção da escolha durante a navegação.
- Modo escuro como configuração inicial.
- Adaptação das telas de autenticação sem modificar a fotografia do campus e o logotipo original.

O gerenciamento é centralizado em:

- `Assets/tema.js` — alternância, aplicação e persistência.
- `Assets/tema.css` — estilos globais e adaptações para o modo claro.

A preferência é armazenada no `localStorage` utilizando a chave `unievents-tema`.

---

## Tecnologias utilizadas

| Tecnologia                  | Aplicação                                      |
| --------------------------- | ---------------------------------------------- |
| **HTML5**                   | Estruturação das páginas                       |
| **CSS3**                    | Estilização, animações e responsividade        |
| **JavaScript**              | Interatividade e lógica da aplicação           |
| **Supabase Authentication** | Cadastro, login e gerenciamento de sessões     |
| **Google OAuth 2.0**        | Autenticação utilizando contas Google          |
| **Google Cloud Console**    | Configuração das credenciais OAuth             |
| **localStorage**            | Persistência local de favoritos e preferências |
| **Git**                     | Controle de versões                            |
| **GitHub**                  | Hospedagem do código-fonte                     |
| **Vercel**                  | Publicação e deploy                            |
| **Figma**                   | Prototipação das interfaces                    |
| **Visual Studio Code**      | Ambiente de desenvolvimento                    |

### Arquitetura da aplicação

O UniEvents utiliza uma arquitetura web baseada em tecnologias de frontend, com integração a serviços externos para autenticação.

**Camada de apresentação:** HTML5 e CSS3.

**Camada de interação:** JavaScript.

**Autenticação:** Supabase Authentication.

**Persistência local:** Web Storage API (`localStorage`).

**Hospedagem:** Vercel.

**Versionamento:** Git e GitHub.

Atualmente, o catálogo de eventos é mantido em arquivos JavaScript. A aplicação não utiliza o PostgreSQL do Supabase como fonte de dados dos eventos ou dos favoritos.

---

##  Estrutura do projeto

A estrutura abaixo apresenta os principais arquivos e diretórios da aplicação.

```text
UniEvents/
│
├── Assets/
│   ├── tema.css
│   └── tema.js
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
│   ├── imgequipe/
│   │   ├── gabriel.png
│   │   ├── guilherme.png
│   │   ├── lucas.png
│   │   ├── manuella.png
│   │   └── marcos.png
│   │
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── eventos.js
│   ├── home-landing.css
│   └── home-landing.js
│
├── Explorar/
│   └── index.html
│
├── MeusEventos/
│   └── index.html
│
├── Perfil/
│   └── index.html
│
├── index.html
├── .gitignore
└── README.md
```

### Organização dos diretórios

| Diretório         | Responsabilidade                             |
| ----------------- | -------------------------------------------- |
| `Assets/`         | Recursos compartilhados do sistema de temas  |
| `Login/`          | Interfaces e lógica de autenticação          |
| `Home/`           | Página inicial e componentes de apresentação |
| `Home/imgequipe/` | Fotografias dos integrantes da equipe        |
| `Explorar/`       | Pesquisa, filtros e exploração de eventos    |
| `MeusEventos/`    | Consulta e gerenciamento dos favoritos       |
| `Perfil/`         | Interface de perfil do usuário               |

---

##  Autenticação

O UniEvents utiliza o **Supabase Authentication** para gerenciar contas e sessões.

### Login com e-mail e senha

O usuário pode criar uma conta utilizando nome completo, e-mail válido e senha.

A validação de senha exige:

- Mínimo de oito caracteres.
- Pelo menos uma letra maiúscula.
- Pelo menos uma letra minúscula.
- Pelo menos um número.
- Pelo menos um símbolo.

O sistema também disponibiliza recuperação de acesso, redefinição de senha e confirmação de cadastro por e-mail.

### Login com Google

A autenticação com Google utiliza OAuth 2.0, integrado ao Supabase.

O fluxo consiste em:

1. O usuário seleciona **Continuar com Google**.
2. A aplicação inicia a autenticação pelo Supabase.
3. O usuário é direcionado ao Google.
4. O Google realiza a autenticação.
5. O Supabase processa o retorno e estabelece a sessão.
6. A aplicação direciona o usuário à Home.

A integração foi implementada e testada durante o desenvolvimento. A disponibilidade para usuários externos depende das configurações de publicação e acesso do aplicativo OAuth.

### Gerenciamento de sessões

A aplicação verifica a sessão autenticada antes de disponibilizar as páginas protegidas.

O sistema também oferece persistência de sessão e logout.

> As verificações realizadas no navegador não substituem políticas de autorização e segurança dos serviços utilizados.

---

##  Gerenciamento dos eventos

Os eventos acadêmicos são cadastrados manualmente no catálogo da aplicação.

O arquivo `Home/eventos.js` contém os dados utilizados pelas funcionalidades de listagem, pesquisa, filtros, categorias, destaques e favoritos.

Cada evento pode apresentar informações como:

- Nome e descrição.
- Área acadêmica.
- Data de realização.
- Modalidade.
- Localização.
- Imagem ou banner.
- Link para inscrição ou página oficial.

O acesso às inscrições é realizado por meio de links externos. O UniEvents não processa inscrições diretamente.

---

##  Execução do projeto

### Acesso online

Acesse:

https://unievents-eight.vercel.app/

### Execução local

**Pré-requisitos:**

- Navegador atualizado.
- Editor de código.
- Servidor HTTP local, como Live Server.
- Configuração válida do Supabase para autenticação.

**1. Clone o repositório:**

```bash
git clone https://github.com/guilhermeteixeira-spec/UniEvents.git
```

**2. Acesse o diretório:**

```bash
cd UniEvents
```

**3. Abra o projeto no Visual Studio Code:**

```bash
code .
```

**4. Verifique a configuração do Supabase:**

O arquivo `Login/config.js` deve conter a URL e a chave pública apropriadas para o projeto.

**5. Inicie o Live Server:**

Execute o servidor a partir da raiz do repositório.

**6. Acesse a aplicação:**

```text
http://127.0.0.1:5500/
```

A aplicação deverá direcionar o usuário para a interface de autenticação.

> A execução local deve utilizar um servidor HTTP. A abertura direta dos arquivos HTML pelo protocolo `file://` não é recomendada.

---

##  Configuração do Supabase

A autenticação depende da configuração dos endereços autorizados no Supabase.

### Endereço principal

```text
https://unievents-eight.vercel.app
```

### URLs de redirecionamento

```text
https://unievents-eight.vercel.app/**
http://127.0.0.1:5500/**
http://localhost:5500/**
```

Essas configurações podem ser gerenciadas em:

**Supabase → Authentication → URL Configuration**

### Configuração do Google OAuth

A integração com Google exige:

1. Configuração do aplicativo no Google Cloud.
2. Criação de credenciais OAuth para aplicação web.
3. Definição das origens autorizadas.
4. Configuração da URL de callback do Supabase.
5. Ativação do provedor Google no Supabase.
6. Associação das credenciais ao provedor.

### Segurança

As credenciais privadas não devem ser publicadas no repositório.

A aplicação frontend deve utilizar somente credenciais públicas apropriadas, respeitando as políticas de segurança do Supabase.

Nunca incluir no código do navegador:

- Client Secret do Google.
- Chaves `service_role`.
- Chaves privadas do Supabase.
- Credenciais administrativas.

---

##  Testes e qualidade

O projeto utiliza testes funcionais para verificar o comportamento das funcionalidades implementadas.

### Áreas de validação

| Área        | Verificações                              |
| ----------- | ----------------------------------------- |
| Cadastro    | Campos obrigatórios, e-mail, nome e senha |
| Login       | Autenticação tradicional e Google         |
| Recuperação | Solicitação e redefinição de senha        |
| Sessão      | Persistência, redirecionamento e logout   |
| Navegação   | Acesso às páginas e links                 |
| Eventos     | Listagem, pesquisa e filtros              |
| Favoritos   | Adição, remoção e persistência            |
| Interface   | Responsividade e organização visual       |
| Tema        | Alternância, persistência e navegação     |
| Integrações | Supabase e redirecionamentos externos     |

### Melhorias implementadas

Durante o desenvolvimento, foram realizadas melhorias relacionadas a:

- Validação de dados no cadastro.
- Exibição e ocultação de senhas.
- Persistência de sessões.
- Pesquisa sem diferenciação de acentos.
- Filtragem por data inicial dos eventos.
- Apresentação visual dos cards.
- Inclusão de imagens e banners.
- Reformulação da página inicial.
- Sistema global de temas.
- Fotografias da equipe de desenvolvimento.

### Validações complementares

Permanecem previstas verificações adicionais relacionadas a diferentes navegadores, combinações de filtros, responsividade, acessibilidade e fluxos de autenticação no ambiente publicado.

---

##  Metodologia de desenvolvimento

O desenvolvimento do UniEvents foi organizado utilizando princípios do **Scrum**, com planejamento de atividades em três Sprints.

A equipe estabeleceu responsabilidades para as áreas de desenvolvimento, experiência do usuário, qualidade, organização do processo e gerenciamento dos requisitos.

O processo contempla atividades de:

- Levantamento e análise de requisitos.
- Definição e priorização do Product Backlog.
- Planejamento das Sprints.
- Prototipação de interfaces.
- Implementação das funcionalidades.
- Testes e identificação de problemas.
- Revisão das entregas.
- Aperfeiçoamento contínuo do produto.

---

##  Equipe de desenvolvimento

| Integrante    | Função                 | Responsabilidade                                    |
| ------------- | ---------------------- | --------------------------------------------------- |
| **Guilherme** | Desenvolvedor (DEV)    | Implementação das funcionalidades e interfaces      |
| **Gabriel**   | UX/UI Designer         | Experiência do usuário e design das interfaces      |
| **Lucas**     | Scrum Master           | Organização e acompanhamento do processo Scrum      |
| **Manuella**  | Quality Assurance (QA) | Verificação da qualidade e testes do sistema        |
| **Marcos**    | Product Owner (PO)     | Organização das prioridades e requisitos do produto |

A apresentação visual da equipe está disponível na seção **Nossa equipe**, na página inicial da aplicação.

---

##  Escopo atual e evoluções futuras

### Funcionalidades disponíveis

- [x] Cadastro e autenticação de usuários.
- [x] Recuperação e redefinição de senha.
- [x] Autenticação com Google.
- [x] Gerenciamento de sessões e logout.
- [x] Página inicial responsiva.
- [x] Carrossel de eventos em destaque.
- [x] Catálogo de eventos acadêmicos reais.
- [x] Pesquisa e filtros de eventos.
- [x] Imagens e banners dos eventos.
- [x] Links para páginas oficiais.
- [x] Sistema de favoritos local.
- [x] Página Meus Eventos.
- [x] Interface de perfil.
- [x] Tema claro e escuro global.
- [x] Persistência da preferência de tema.
- [x] Apresentação da equipe com fotografias.
- [x] Publicação na Vercel.
- [x] Integração de deploy com GitHub.

### Evoluções previstas

- [ ] Persistência dos eventos no PostgreSQL do Supabase.
- [ ] Vinculação dos favoritos aos usuários autenticados.
- [ ] Sincronização de favoritos entre dispositivos.
- [ ] Aprimoramento das informações detalhadas dos eventos.
- [ ] Aperfeiçoamento da página de perfil.
- [ ] Avaliação de uma interface administrativa para eventos.
- [ ] Ampliação dos testes de acessibilidade e responsividade.
- [ ] Validação complementar dos fluxos de autenticação.
- [ ] Revisão de permissões e políticas de acesso aos dados.

As evoluções listadas representam possibilidades de continuidade do projeto e não funcionalidades disponíveis na versão atual.

---

##  Contexto acadêmico

O UniEvents foi desenvolvido no curso de **Análise e Desenvolvimento de Sistemas**, da **Universidade Paranaense (UNIPAR)**.

O projeto está relacionado às disciplinas:

- **Engenharia de Requisitos**
- **Design Front End**

Seu desenvolvimento integra conhecimentos de engenharia de software, análise de requisitos, prototipação, desenvolvimento web, autenticação, testes, versionamento e publicação de aplicações.

---

##  Licença

Projeto desenvolvido para fins acadêmicos.

Até o momento, não foi definida uma licença de uso, modificação ou redistribuição do código-fonte.

---

<div align="center">

**UniEvents**

*Conectando estudantes a oportunidades de conhecimento.*

**Universidade Paranaense — UNIPAR**

</div>
