# Aplicação de Agendamento de Consultas

Esta é uma aplicação web desenvolvida para a busca e agendamento de consultas em clínicas e com médicos. O projeto foi construído utilizando tecnologias modernas para criar uma interface de usuário rica, responsiva e interativa.

## Tecnologias Utilizadas

- **Next.js:** Um framework React para produção que oferece renderização do lado do servidor, geração de sites estáticos, e muito mais.
- **React:** Uma biblioteca JavaScript para construir interfaces de usuário.
- **TypeScript:** Um superset de JavaScript que adiciona tipagem estática opcional ao código, aumentando a robustez e a manutenibilidade.
- **Tailwind CSS:** Um framework CSS "utility-first" para criar designs personalizados de forma rápida e eficiente diretamente no markup.

## Funcionalidades Implementadas

A aplicação é uma SPA (Single Page Application) que centraliza todas as funcionalidades em uma única interface, proporcionando uma experiência de usuário fluida.

### 1. Visualização e Filtragem
- **Abas de Navegação:** Alterne facilmente entre a listagem de **Médicos** e **Clínicas**.
- **Pesquisa Dinâmica:** Um campo de busca permite filtrar médicos e clínicas por nome ou especialidade em tempo real.
- **Filtro por Especialidade:** Refine a busca de médicos e clínicas selecionando uma especialidade específica em uma lista suspensa.

### 2. Layout e Carregamento de Dados
- **Layout Flexível:** Alterne entre visualização em **Lista** ou em **Grade** para melhor se adequar à sua preferência.
- **Modos de Carregamento:** Escolha entre **Paginação** clássica ou **Scroll Infinito** para carregar mais resultados.

### 3. Interatividade e Agendamento
- **Detalhes do Médico:** Ao clicar em "Ver Detalhes" (na listagem de médicos) ou diretamente em um médico (na listagem de clínicas), um modal é aberto com todas as informações do profissional: nome completo, especialidade, telefone e endereço.
- **Agendamento de Consulta Interativo:**
    - Ao clicar em "Agendar Consulta", um modal de agendamento é exibido.
    - **Seleção de Data:** Escolha um dos próximos 7 dias disponíveis.
    - **Grade de Horários:** Selecione um horário disponível em uma grade interativa (das 9:00 às 17:30).
    - **Validação de Horário:** O sistema automaticamente desabilita horários que já passaram no dia atual, prevenindo agendamentos no passado.
    - **Confirmação:** Após a confirmação, uma mensagem de sucesso é exibida e o agendamento é concluído.

## Como Executar o Projeto

Para executar o projeto em seu ambiente de desenvolvimento, siga os passos abaixo:

1. **Clone o repositório:**
   ```bash
   git clone <URL_DO_REPOSITORIO>
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. Abra [http://localhost:3000](http://localhost:3000) em seu navegador para ver a aplicação em funcionamento.
