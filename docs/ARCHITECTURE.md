# Arquitetura do Frontend

Este documento detalha como o Portal Administrativo React está organizado, seus principais padrões e como os componentes interagem.

## 🏗️ Visão Geral

A aplicação é construída com **React 18+**, **Vite** e **TypeScript**, focando em performance e modularidade. Utilizamos uma arquitetura baseada em Providers para gerenciamento de estado global (Autenticação e Permissões) e Hooks para lógica de dados.

### Pilares da Arquitetura

1.  **Providers Wrappers**: A aplicação é envelopada por Contexts que fornecem o estado essencial (`AuthProvider`, `AbilityProvider`, `QueryClientProvider`).
2.  **Server State Management**: Utilizamos **TanStack Query (React Query)** para todas as operações assíncronas, eliminando a complexidade de gerenciar `useEffect` para chamadas de API.
3.  **Componentização UI**: Interface construída com **Shadcn/UI**, que permite controle total sobre o código dos componentes baseados no Radix UI e Tailwind CSS.
4.  **Segurança no Frontend**:
    - **Rotas Protegidas**: Wrapper que verifica autenticação antes de renderizar páginas.
    - **Proteção de UI (CASL)**: Botões e elementos sensíveis são renderizados condicionalmente com base nas permissões do usuário.

---

## 📁 Organização de Pastas

### `src/api/`
Configuração do cliente HTTP global.
- `axios.ts`: Instância centralizada do Axios com:
    - `baseURL` definida via variável de ambiente.
    - **Request Interceptor**: Injeta automaticamente o token JWT do localStorage.
    - **Response Interceptor**: Redireciona para login em caso de 401 e loga erros de permissão (403).

### `src/providers/`
Contextos globais da aplicação.
- `AuthProvider.tsx`: Gerencia o estado da sessão (usuário logado, token) e expõe métodos `login` e `logout`.
- `AbilityProvider.tsx`: Integração com CASL. Instancia o objeto `Ability` com base na role do usuário, permitindo o uso do hook `useAbility()`.

### `src/features/`
Arquitetura baseada em funcionalidades. Cada domínio (ex: Users, Products) tem sua própria pasta, encapsulando componentes, hooks e lógica específicos.
- `users/`: Funcionalidade de gerenciamento de usuários.
    - `UserManagement.tsx`: Dashboard principal.

### `src/pages/`
Páginas principais que atuam como orquestradores ou layouts de rota.
- `Login.tsx`: Página de login.

### `src/utils/`
- `error-handling.ts`: Helper para tratamento tipado de erros (remove necessidade de `any`).

### `src/components/`
- `ui/`: Componentes base do Shadcn/UI (Button, Table, Dialog, etc.).
- `ProtectedRoute.tsx`: Componente de ordem superior (HOC) que protege rotas privadas.

---

## 🔄 Fluxo de Autenticação e Dados

1.  **Login**:
    - O usuário envia credenciais via `Login.tsx`.
    - Sucesso: Token e dados do usuário são salvos no localStorage via `AuthProvider`.
    - O `AbilityProvider` recalcula as permissões baseadas na nova role.
    - Redirecionamento para o Dashboard.

2.  **Acesso a Dados (React Query)**:
    - Componentes usam hooks como `useQuery` ou `useMutation`.
    - O `axios` intercepta a requisição e adiciona o Header `Authorization`.
    - Se o token expirar (401), o usuário é deslogado automaticamente.

3.  **Controle de Acesso (CASL)**:
    - O hook `useAbility()` fornece o objeto `ability`.
    - Componentes verificam permissões antes de renderizar ações:
      ```tsx
      {ability.can('delete', 'User') && <Button>Excluir</Button>}
      ```
