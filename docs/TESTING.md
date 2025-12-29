# Estratégia de Testes

Utilizamos uma abordagem de testes automatizados para garantir a estabilidade e a corretude do Portal Administrativo.

## Tecnologias

- **Vitest**: Executor de testes (Test Runner) compatível com Vite. É rápido e suporta TypeScript nativamente.
- **React Testing Library (RTL)**: Biblioteca para testar componentes React da maneira como o usuário os utiliza (focando em acessibilidade e interações, não em implementação interna).
- **JSDOM**: Simula um ambiente de navegador no Node.js.

## Tipos de Testes

### 1. Testes Unitários (`src/**/*.test.tsx`)
Focados em lógica isolada e Providers.
- **Exemplo**: `AuthProvider.test.tsx` verifica se o login atualiza o estado e se o logout limpa o localStorage.

### 2. Testes de Integração (`src/pages/**/*.test.tsx`)
Testam fluxos completos em uma página, mockando apenas a camada de rede (API).
- **Exemplo**: `Login.test.tsx` preenche o formulário, clica em entrar e verifica se a API foi chamada com os dados corretos.
- **Exemplo**: `UserManagement.test.tsx` verifica se a tabela carrega os dados retornados pela API mockada e se os botões de ação aparecem conforme a permissão.

## Como Rodar os Testes

Rodar todos os testes uma única vez:
```bash
pnpm test
# ou explicitamente
pnpm test --run
```

Rodar em modo "watch" (re-executa ao salvar arquivos):
```bash
pnpm test:watch
```

Verificar cobertura de código (se configurado):
```bash
pnpm coverage
```

## Escrevendo Novos Testes

1. Crie um arquivo `__tests__` próximo ao componente ou na pasta correspondente.
2. Nomeie o arquivo com `.test.tsx`.
3. Use `vi.mock('@/api/axios')` para evitar chamadas reais ao backend.
4. Use `renderWithProviders` (veja exemplos existentes) para garantir que o componente tenha acesso ao AuthContext e QueryClient.
