# Setup do Projeto

Guia para configurar e rodar o Portal Administrativo React localmente.

## Pré-requisitos

- **Node.js**: v18 ou superior.
- **pnpm**: Gerenciador de pacotes recomendado (v8+).
- **Backend API**: Certifique-se de que a `nestjs-api-base` esteja rodando (padrão: `http://localhost:3000`).

## Instalação

1.  Acesso a pasta do projeto:
    ```bash
    cd react-admin-portal
    ```

2.  Instale as dependências:
    ```bash
    pnpm install
    ```

3.  Configure as variáveis de ambiente:
    Crie um arquivo `.env` na raiz (se não existir) baseado no exemplo abaixo:

    ```env
    # .env
    VITE_API_URL=http://localhost:3000
    ```

## Comandos Disponíveis

### Desenvolvimento
Inicia o servidor Vite com Hot Module Replacement (HMR).
```bash
pnpm dev
# Acessível em http://localhost:5173
```

### Build (Produção)
Compila o projeto TypeScript e gera os arquivos estáticos otimizados na pasta `dist/`.
```bash
pnpm build
```

### Preview
Roda um servidor local servindo os arquivos da pasta `dist/` para testar a build de produção.
```bash
pnpm preview
```

### Lint
Verifica problemas de estilo e erros de código.
```bash
pnpm lint
```

### Testes
Executa a suíte de testes automatizados (Unitários e Integração).
```bash
pnpm test
```

## Solução de Problemas Comuns

- **Erro de conexão (Network Error)**: Verifique se a variável `VITE_API_URL` está correta e se a API backend está rodando e aceitando conexões (CORS).
- **Erro 401 (Unauthorized)**: Seu token pode ter expirado. O sistema deve te redirecionar para o Login automaticamente. Tente logar novamente.
- **Estilos quebrados**: Certifique-se de que o Tailwind CSS está rodando. Tente parar e rodar o `pnpm dev` novamente.
