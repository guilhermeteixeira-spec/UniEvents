# UniEvents

### Plataforma de Divulgação de Eventos Acadêmicos

[Acessar o UniEvents](https://unievents-eight.vercel.app) | [Repositório GitHub](https://github.com/guilhermeteixeira-spec/UniEvents)

O **UniEvents** é uma plataforma web acadêmica desenvolvida por estudantes do curso de **Análise e Desenvolvimento de Sistemas (ADS)** da **Universidade Paranaense (UNIPAR)**.

O projeto tem como propósito facilitar o acesso de universitários a eventos acadêmicos realizados em diferentes regiões do Brasil, promovendo oportunidades de aprendizado, desenvolvimento profissional, networking e ampliação do conhecimento.

> **Status do projeto:** Em desenvolvimento — aplicação publicada na Vercel, autenticação integrada ao Supabase, login com Google, páginas de navegação, eventos reais, pesquisa, filtros, favoritos e sistema global de temas claro e escuro implementados.

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

> **Nota:** as funcionalidades implementadas devem ser validadas no ambiente publicado após cada atualização. O projeto continua passando por testes funcionais e melhorias.

---

## Funcionalidades

### Implementadas

**Autenticação e gerenciamento de usuários**

- Interface de login responsiva.

- Cadastro de usuários utilizando Supabase Authentication.

- Cadastro com nome completo e e-mail válido.

- Validação do nome completo.

- Validação de e-mail e requisitos de senha.

- Confirmação de senha durante o cadastro.

- Botões para mostrar e ocultar senha e confirmação de senha.

- Autenticação com e-mail e senha.

- Confirmação de cadastro por e-mail.

- Recuperação de senha por e-mail.

- Redefinição de senha.

- Tratamento de erros comuns de autenticação.

- Integração de login com Google utilizando OAuth 2.0.

- Autenticação Google intermediada pelo Supabase.

- Redirecionamento automático após login.

- Verificação de sessão autenticada.

- Persistência de sessão entre atualizações da página.

- Opção para manter o usuário conectado.

- Redirecionamento de usuários não autenticados para o login.

- Encerramento de sessão por meio de logout.

**Interface e navegação**

- Página inicial (Home) reformulada.

- Identidade visual com tons de azul-escuro e elementos modernos.

- Interface adaptada para diferentes tamanhos de tela.
- Alternância global entre os modos claro e escuro (RF11).
- Preferência de tema salva no navegador e compartilhada entre as páginas.
- Temas aplicados à Home, Explorar, Meus Eventos, Perfil e telas de autenticação.
- Nas telas de autenticação, somente o formulário muda de aparência; fotografia do campus e logotipo permanecem originais.

- Cabeçalho com navegação principal.

- Padronização do logotipo UniEvents.

- Seção principal de apresentação da plataforma.

- Seção de eventos em destaque.

- Carrossel de eventos.

- Seção "Como funciona".

- Seção de apresentação do projeto.

- Apresentação da equipe de desenvolvimento.

- Área de chamada para exploração dos eventos.

- Rodapé com informações institucionais.

- Navegação entre Home, Explorar, Meus Eventos e Perfil.

- Redirecionamento automático do endereço principal para a página de login.

**Eventos acadêmicos**

- Cadastro manual de eventos reais na aplicação.

- Listagem de eventos acadêmicos de diferentes regiões do Brasil.

- Organização dos eventos por áreas de conhecimento.

- Cards contendo informações dos eventos.

- Inclusão de imagens e banners dos eventos.

- Exibição de nome, descrição, data, modalidade e localização.

- Links externos para páginas oficiais dos eventos.

- Navegação por categorias acadêmicas.

- Página Explorar com listagem de eventos.

- Pesquisa funcional por nome, tema e palavras-chave.

- Pesquisa sem diferenciação entre letras acentuadas e não acentuadas.

- Filtros por categoria, modalidade e data.

- Filtragem por data considerando o início do evento.

- Melhorias no comportamento da pesquisa e dos filtros.

**Sistema de favoritos**

- Adição de eventos aos favoritos.

- Remoção de eventos dos favoritos.

- Identificação visual dos eventos favoritos.

- Página Meus Eventos para consultar eventos salvos.

- Persistência local dos favoritos utilizando localStorage.

> **Observação:** atualmente, os favoritos são armazenados no navegador. A sincronização entre dispositivos e contas por meio do Supabase permanece planejada.

**Infraestrutura e versionamento**

- Repositório GitHub para controle de versões.

- Hospedagem da aplicação na Vercel.

- Integração entre GitHub e Vercel.

- Deploy automático após atualizações enviadas ao repositório.

- Configuração dos endereços de autenticação no Supabase.

- Configuração de cliente OAuth no Google Cloud.

- Configuração do provedor Google no Supabase.

- Testes de autenticação e navegação.

- Plano de testes funcionais para acompanhamento de problemas e correções.

### Em desenvolvimento ou planejadas

- Integração dos eventos reais ao banco de dados PostgreSQL.

- Substituição do cadastro de eventos em JavaScript por persistência no Supabase.

- Sincronização dos favoritos entre dispositivos.

- Vinculação dos favoritos ao usuário autenticado.

- Aprimoramento da página de perfil.

- Revisão das informações detalhadas dos eventos.

- Aprimoramento de eventos relacionados.

- Avaliação de uma interface administrativa para cadastro de eventos.

- Revisão das mensagens para e-mails já cadastrados.

- Conclusão dos testes de filtros e navegação.

- Revisão de responsividade e acessibilidade.

- Testes completos dos fluxos de autenticação em produção.

- Validação das permissões de acesso.

- Preparação da versão acadêmica para apresentação.

---

## Tecnologias utilizadas

| Tecnologia              | Finalidade                                         |

| ----------------------- | -------------------------------------------------- |

| HTML5                   | Estruturação das páginas                           |

| CSS3                    | Estilização e responsividade                       |

| JavaScript              | Interatividade e lógica da aplicação               |

| Supabase Authentication | Cadastro, login e gerenciamento de sessões         |

| Google OAuth 2.0        | Autenticação com contas Google                     |

| Google Cloud Console    | Configuração e gerenciamento das credenciais OAuth |

| localStorage            | Persistência local dos eventos favoritos e da preferência de tema           |

| Supabase / PostgreSQL   | Persistência de eventos e favoritos (planejada)    |

| Vercel                  | Hospedagem e deploy da aplicação                   |

| Git                     | Controle de versões                                |

| GitHub                  | Repositório e colaboração no código                |

| Figma                   | Prototipação das interfaces                        |

| Visual Studio Code      | Ambiente de desenvolvimento                        |

### Autenticação

O UniEvents utiliza o **Supabase Authentication** para gerenciar a autenticação dos usuários.

O sistema disponibiliza duas modalidades de acesso:

**1. Autenticação com e-mail e senha**

O fluxo contempla cadastro, validação do nome completo, confirmação por e-mail, login, recuperação de acesso e redefinição de senha.

Durante o cadastro, o usuário informa:

- Nome completo.

- E-mail.

- Senha.

- Confirmação de senha.

A senha deve possuir pelo menos oito caracteres, incluindo letra maiúscula, letra minúscula, número e símbolo.

Os campos de senha possuem botões independentes para mostrar e ocultar os caracteres digitados.

**2. Autenticação com Google**

O UniEvents possui integração com o provedor Google por meio do protocolo **OAuth 2.0**.

O fluxo funciona da seguinte maneira:

1. O usuário seleciona **Continuar com Google**.

2. A aplicação inicia a autenticação utilizando o Supabase.

3. O usuário é redirecionado para a autenticação do Google.

4. O Google valida a conta e retorna ao Supabase.

5. O Supabase processa a autenticação e estabelece a sessão.

6. A aplicação identifica a sessão autenticada e direciona o usuário à Home.

Essa funcionalidade permite utilizar contas Google pessoais ou institucionais, respeitando as configurações de acesso do aplicativo OAuth.

A integração foi implementada e testada durante o desenvolvimento. Sua disponibilidade para usuários externos depende das configurações do aplicativo OAuth.

### Tema claro e escuro (RF11)

O UniEvents oferece um sistema global de personalização visual, com alternância entre **modo escuro** e **modo claro** por meio de um botão flutuante.

- O arquivo `Assets/tema.js` controla a seleção, a aplicação e a persistência do tema.
- O arquivo `Assets/tema.css` concentra os estilos compartilhados e as adaptações para o modo claro.
- A preferência é armazenada no `localStorage` com a chave `unievents-tema`, permanecendo ativa ao atualizar ou navegar entre páginas no mesmo navegador.
- A escolha é aplicada à Home, Explorar, Meus Eventos, Perfil, Login, Cadastro, Recuperação e Redefinição de Senha.
- Nas telas de autenticação, o formulário central adapta suas cores sem alterar a fotografia de fundo do campus nem a identidade visual do logotipo.
- O modo escuro é o padrão quando não existe uma preferência salva.

A implementação foi testada manualmente durante o desenvolvimento. A validação formal pela equipe de QA permanece parte dos testes do projeto.

### Gerenciamento de sessões

Após a autenticação, o usuário é direcionado para a Home.

A aplicação verifica a existência de uma sessão antes de disponibilizar o conteúdo protegido e redireciona usuários não autenticados para a página de login.

O sistema também permite manter a sessão entre acessos e encerrá-la utilizando a funcionalidade de logout.

O gerenciamento da sessão utiliza mecanismos de armazenamento do navegador, de acordo com a opção de permanência escolhida pelo usuário.

> A verificação de sessão no navegador não substitui as políticas de segurança do banco de dados.

### Gerenciamento dos eventos

Atualmente, os eventos acadêmicos são cadastrados manualmente na aplicação e disponibilizados por meio de arquivos JavaScript.

Os dados são utilizados para alimentar:

- Cards de eventos.

- Eventos em destaque.

- Pesquisa.

- Filtros.

- Categorias.

- Favoritos.

- Links para páginas oficiais.

Essa abordagem permite validar as funcionalidades da interface antes da migração dos dados para o banco de dados.

### Sistema de favoritos

Os usuários podem salvar eventos para consultá-los posteriormente.

O sistema utiliza **localStorage** para manter os favoritos no navegador.

A funcionalidade permite adicionar e remover eventos, mantendo as informações salvas após atualizar a página.

A próxima evolução prevista é integrar os favoritos ao Supabase, associando os registros ao usuário autenticado.

### Banco de dados

O Supabase já é utilizado para autenticação e gerenciamento de usuários.

A próxima etapa de persistência consiste em utilizar o PostgreSQL do Supabase para armazenar os eventos acadêmicos e favoritos.

O planejamento inclui:

- Modelagem de tabelas.

- Relacionamento entre usuários e favoritos.

- Persistência dos eventos.

- Configuração de políticas **Row Level Security (RLS)**.

- Controle de acesso aos registros.

- Integração dos dados com as páginas da aplicação.

---

## Hospedagem e deploy

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

├── Assets/
│   ├── tema.css
│   └── tema.js
│
├── Login/

│   ├── campus.jpg

│   ├── index.html

│   ├── cadastro.html

│   ├── recuperar.html

│   ├── redefinir.html

│   ├── config.js

│   ├── script.js

│   └── style.css

│

├── Home/

│   ├── index.html

│   ├── script.js

│   ├── style.css

│   ├── eventos.js

│   ├── home-landing.css

│   └── home-landing.js

│

├── Explorar/

│   └── index.html

│

├── MeusEventos/

│   └── index.html

│

├── Perfil/

│   └── index.html

│

├── index.html

├── .gitignore

└── README.md

```

A estrutura apresenta os principais diretórios e arquivos conhecidos do projeto. Arquivos complementares podem estar presentes.

**Pasta `Assets/`**

Contém os recursos compartilhados do sistema global de temas.

- `tema.css`: estilos do modo claro e do botão flutuante de alternância.
- `tema.js`: aplicação do tema, alternância e persistência da preferência no navegador.

**Pasta `Login/`**

Responsável pelas interfaces e pela lógica de autenticação.

- `index.html`: interface de login tradicional e botão de acesso com Google.

- `cadastro.html`: criação de conta e validação dos campos.

- `recuperar.html`: solicitação de recuperação de senha.

- `redefinir.html`: definição de uma nova senha.

- `config.js`: configuração pública da conexão com o Supabase.

- `script.js`: autenticação, OAuth Google, validações e gerenciamento de sessões.

- `style.css`: estilização das interfaces.

- `campus.jpg`: imagem utilizada na interface.

**Pasta `Home/`**

Responsável pela página inicial apresentada após a autenticação.

- `index.html`: estrutura da Home e suas seções.

- `script.js`: funcionalidades compartilhadas e gerenciamento de sessão.

- `style.css`: estilos gerais de navegação e interface.

- `eventos.js`: dados dos eventos cadastrados.

- `home-landing.css`: estilização específica da Home reformulada.

- `home-landing.js`: interações específicas da Home.

**Pasta `Explorar/`**

Responsável pela navegação e descoberta dos eventos acadêmicos, incluindo pesquisa, filtros e listagem de eventos.

**Pasta `MeusEventos/`**

Responsável pela consulta e pelo gerenciamento dos eventos adicionados aos favoritos.

**Pasta `Perfil/`**

Responsável pela interface de perfil do usuário.

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

---

## Configuração do Supabase

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

### Configuração do login com Google

Para utilizar a autenticação Google, é necessário configurar o provedor OAuth no Google Cloud e no Supabase.

**Google Cloud Console**

1. Criar ou selecionar o projeto UniEvents.

2. Configurar a identidade do aplicativo em Google Auth Platform.

3. Definir o público-alvo.

4. Criar um cliente OAuth do tipo **Aplicativo da Web**.

5. Configurar as origens JavaScript autorizadas.

6. Registrar a URL de callback fornecida pelo Supabase.

7. Obter o Client ID e o Client Secret.

**Supabase**

1. Acessar **Authentication → Sign In / Providers**.

2. Selecionar o provedor Google.

3. Ativar a autenticação Google.

4. Informar o Client ID e o Client Secret.

5. Salvar as configurações.

O código JavaScript utiliza o método `signInWithOAuth()` do Supabase para iniciar a autenticação.

**Segurança**

- Nunca inserir Client Secret, `service_role` ou `sb_secret\_` no código do navegador.

- Não publicar credenciais privadas no GitHub.

- Utilizar apenas a chave pública do Supabase no frontend.

- Configurar políticas de acesso adequadas nas futuras tabelas do banco de dados.

- Validar as permissões de leitura e escrita antes de disponibilizar dados persistidos.

**Observação:** enquanto o aplicativo Google estiver no modo de teste, somente usuários de teste autorizados poderão concluir a autenticação.

---

## Testes e qualidade

O UniEvents utiliza um plano de testes funcionais para verificar os requisitos e identificar problemas na aplicação.

Os testes contemplam:

- Cadastro de usuários.

- Validação de nome completo.

- Validação de e-mail.

- Requisitos de senha.

- Confirmação de senha.

- Login com e-mail e senha.

- Login com Google.

- Recuperação e redefinição de senha.

- Persistência de sessão.

- Logout.

- Navegação entre páginas.

- Pesquisa de eventos.

- Filtros por categoria, modalidade e data.

- Adição e remoção de favoritos.

- Redirecionamento para páginas externas.

- Responsividade e acessibilidade.
- Alternância de tema em todas as páginas e persistência da preferência.
- Preservação da fotografia e do logotipo nas telas de autenticação ao alternar o tema.

### Melhorias e correções recentes

- Implementação do RF11: modo claro e escuro global.
- Inclusão dos arquivos compartilhados `Assets/tema.js` e `Assets/tema.css`.
- Adaptação das telas de autenticação para alterar somente o formulário central.
- Persistência da preferência de tema com `localStorage`.

- Implementação da validação de nome completo no cadastro.

- Inclusão de botões para mostrar e ocultar senhas.

- Padronização visual dos campos de senha.

- Correção da pesquisa para aceitar palavras com ou sem acentos.

- Ajustes na filtragem dos eventos pela data inicial.

- Melhorias na apresentação dos cards de eventos.

- Inclusão de banners e imagens.

- Reformulação visual da Home.

- Melhorias de navegação e organização das páginas.

### Testes pendentes

- Reexecução dos casos de teste após as correções.
- Validação formal do RF11 pela equipe de QA, incluindo navegação entre páginas e persistência do tema.

- Validação do comportamento de e-mails já cadastrados.

- Testes de combinações de filtros.

- Revisão dos detalhes e eventos relacionados.

- Verificação da responsividade em diferentes dispositivos.

- Validação de todos os fluxos de autenticação em produção.

- Testes de segurança e permissões de acesso.

O projeto continua passando por correções e melhorias com base nos resultados dos testes.

---

## Equipe de desenvolvimento

| Integrante         | Responsabilidade       |

| ------------------ | ---------------------- |

| Guilherme Teixeira | Desenvolvedor (DEV)    |

| Gabriel            | UX/UI Designer         |

| Lucas              | Scrum Master           |

| Manuella           | Quality Assurance (QA) |

| Marcos             | Product Owner          |

O desenvolvimento utiliza princípios da metodologia **Scrum**, com organização das atividades em três Sprints, definição de responsabilidades e acompanhamento das entregas.

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

- [x] Implementar validação de nome completo.

- [x] Implementar validação dos requisitos de senha.

- [x] Adicionar botões para mostrar e ocultar senhas.

- [x] Implementar redirecionamento após login.

- [x] Implementar gerenciamento e persistência de sessão.

- [x] Proteger o acesso à Home por verificação de autenticação.

- [x] Implementar logout.

- [x] Configurar projeto OAuth no Google Cloud.

- [x] Configurar provedor Google no Supabase.

- [x] Integrar login com Google ao JavaScript.

- [x] Testar login com Google durante o desenvolvimento.

- [x] Testar login tradicional e acesso à Home na Vercel.

- [ ] Concluir a validação do login Google para todos os usuários externos.

- [ ] Concluir testes de cadastro e recuperação de senha em produção.

- [ ] Revisar o tratamento de e-mails já cadastrados.

### Etapa 2 — Página inicial e navegação

- [x] Implementar o RF11: alternância global entre modo claro e escuro.
- [x] Persistir a preferência de tema entre páginas e atualizações.
- [x] Adaptar Login, Cadastro, Recuperação e Redefinição de Senha ao modo claro.
- [x] Preservar fotografia e logotipo das telas de autenticação em ambos os modos.
- [ ] Concluir validação formal do RF11 pela equipe de QA.

- [x] Desenvolver estrutura inicial da Home.

- [x] Implementar identidade visual baseada no Figma.

- [x] Reformular o design da Home.

- [x] Padronizar o logotipo e o cabeçalho.

- [x] Criar seção principal de apresentação da plataforma.

- [x] Criar seção de eventos em destaque.

- [x] Implementar carrossel de eventos.

- [x] Criar seção "Como funciona".

- [x] Criar apresentação do projeto e da equipe.

- [x] Criar interface de navegação por categorias.

- [x] Implementar cards de eventos.

- [x] Integrar eventos reais à interface.

- [x] Adicionar banners aos cards.

- [x] Implementar pesquisa funcional.

- [x] Corrigir pesquisa com palavras acentuadas.

- [x] Implementar navegação funcional por categorias.

- [x] Desenvolver página Explorar eventos.

- [x] Implementar filtros por categoria, modalidade e data.

- [x] Ajustar filtro pela data inicial dos eventos.

- [x] Implementar links para páginas oficiais dos eventos.

- [ ] Concluir a revisão das combinações de filtros.

- [ ] Revisar detalhes e eventos relacionados.

- [ ] Revisar responsividade em diferentes dispositivos.

### Etapa 3 — Banco de dados e favoritos

- [x] Implementar favoritos utilizando localStorage.

- [x] Permitir adicionar eventos aos favoritos.

- [x] Permitir remover eventos dos favoritos.

- [x] Desenvolver área Meus Eventos.

- [x] Implementar cadastro manual de eventos em JavaScript.

- [ ] Modelar tabelas de eventos e favoritos.

- [ ] Configurar políticas Row Level Security (RLS).

- [ ] Integrar listagem de eventos ao Supabase.

- [ ] Migrar o cadastro manual de eventos para o banco de dados.

- [ ] Implementar favoritos vinculados aos usuários.

- [ ] Sincronizar favoritos entre dispositivos.

- [ ] Integrar detalhes dos eventos aos dados armazenados.

### Etapa 4 — Publicação e infraestrutura

- [x] Integrar GitHub à Vercel.

- [x] Publicar o UniEvents na internet.

- [x] Configurar redirecionamento da página principal.

- [x] Configurar URLs de autenticação no Supabase.

- [x] Validar o acesso público à plataforma.

- [x] Validar login tradicional no ambiente de produção.

- [x] Configurar fluxo de deploy automático.

- [x] Publicar as páginas de navegação.

- [x] Implementar melhorias visuais e funcionais.

- [ ] Concluir validação de todos os fluxos de autenticação em produção.

- [ ] Verificar o comportamento da aplicação em diferentes navegadores.

- [ ] Validar políticas de segurança após integração com o banco de dados.

### Etapa 5 — Qualidade e entrega acadêmica

- [x] Elaborar plano de testes funcionais.

- [x] Iniciar execução dos casos de teste.

- [x] Identificar problemas de pesquisa e filtros.

- [x] Corrigir problemas identificados na pesquisa.

- [x] Corrigir problemas identificados na filtragem por data.

- [x] Melhorar a interface de cadastro.

- [ ] Concluir os testes funcionais.

- [ ] Reexecutar casos de teste após as correções.

- [ ] Validar a segurança e as permissões de acesso.

- [ ] Corrigir os problemas restantes.

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

O UniEvents encontra-se em desenvolvimento, com a aplicação publicada na Vercel e integrada ao Supabase Authentication.

**Entregas realizadas:**

- Interfaces de autenticação desenvolvidas.

- Cadastro com nome completo e validações.

- Login e recuperação de acesso implementados.

- Botões para mostrar e ocultar senhas.

- Gerenciamento de sessões e logout funcionais.

- Autenticação com Google via OAuth 2.0 implementada.

- Integração entre Google Cloud e Supabase configurada.

- Home reformulada com nova identidade visual.

- Seções de apresentação e eventos em destaque.

- Carrossel de eventos.

- Página Explorar implementada.

- Eventos reais cadastrados manualmente.

- Cards com imagens e banners.

- Pesquisa funcional por palavras-chave.

- Pesquisa sem diferenciação de acentos.

- Filtros por categoria, modalidade e data.

- Sistema de favoritos com armazenamento local.

- Página Meus Eventos implementada.

- Estrutura de página de perfil.
- Sistema global de temas claro e escuro implementado nas páginas da plataforma.
- Preferência de tema persistida no navegador e preservação da identidade visual da autenticação.

- Repositório GitHub integrado à Vercel.

- Site acessível publicamente pela internet.

- Plano de testes funcionais em execução.

- Correções e melhorias realizadas a partir dos testes.

**Próximas atividades:**

- Concluir os testes funcionais pendentes.

- Revisar o comportamento de e-mails já cadastrados.

- Validar as combinações dos filtros.

- Revisar detalhes e eventos relacionados.

- Modelar o banco de dados dos eventos.

- Integrar os cards ao Supabase.

- Vincular favoritos aos usuários autenticados.

- Implementar sincronização de favoritos entre dispositivos.

- Aprimorar a página de perfil.

- Revisar responsividade e acessibilidade.

- Validar segurança e permissões de acesso.

- Preparar a versão acadêmica para apresentação.

---

## Licença

Projeto desenvolvido para fins acadêmicos.

Nenhuma licença de uso ou redistribuição foi definida até o momento.

---

**UniEvents — Conectando estudantes a oportunidades de conhecimento.**
