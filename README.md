# Portal Administrativo React

Este é o frontend administrativo para a API Base NestJS. Uma aplicação independente construída com tecnologias modernas para garantir performance e escalabilidade.

## 📚 Documentação

A documentação completa do projeto está localizada na pasta `docs/`.

- [**Setup & Instalação**](docs/SETUP.md): Como rodar o projeto localmente.
- [**Arquitetura**](docs/ARCHITECTURE.md): Estrutura de pastas, Providers e fluxo de dados.
- [**Permissões (CASL)**](docs/PERMISSIONS.md): Como funciona o controle de acesso no frontend.
- [**Componentes (Shadcn)**](docs/COMPONENTS.md): Guia de uso da biblioteca de UI.

## 🚀 Tecnologias

- **Core**: React 18, Vite, TypeScript.
- **Estilização**: Tailwind CSS.
- **UI Kit**: Shadcn/UI (Radix UI).
- **Estado/HTTP**: TanStack Query (React Query), Axios.
- **Rotas**: React Router v6+.
- **Ícones**: Lucide React.
- **Formulários**: React Hook Form + Zod.

## Scripts Rápidos

- `pnpm dev`: Inicia servidor de desenvolvimento (http://localhost:5173).
- `pnpm build`: Gera versão de produção na pasta `dist/`.
- `pnpm lint`: Verifica qualidade do código.

---
*Este projeto deve ser executado em conjunto com a `nestjs-api-base`.*
