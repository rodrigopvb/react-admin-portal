# Componentes de UI (Shadcn)

Este projeto utiliza **Shadcn/UI** como biblioteca de componentes base. Diferente de bibliotecas tradicionais (MUI, AntD), o Shadcn não é uma dependência NPM; ele copia o código dos componentes diretamente para `src/components/ui/`, dando-nos total controle.

## Estrutura

Os componentes visuais ficam em:
- `src/components/ui/`: Componentes primitivos (Button, Input, Table...). **Evite editar esses arquivos manualmente** a menos que queira mudar o design system globalmente.
- `src/components/`: Componentes de negócio ou composições mais complexas.

## Adicionando Novos Componentes

Para adicionar um novo componente da biblioteca Shadcn, use o CLI:

```bash
npx shadcn@latest add [nome-do-componente]
```

Exemplo:
```bash
npx shadcn@latest add accordion
```

Isso criará o arquivo `src/components/ui/accordion.tsx` já estilizado com Tailwind.

## Estilização

A estilização é feita via classes utilitárias do **Tailwind CSS**.

- **Global**: `src/index.css` contém as variáveis de tema CSS (cores, radii) que o Shadcn utiliza.
- **Condicional**: Utilizamos a função utilitária `cn()` (classnames) para mesclar classes condicionalmente.

```tsx
// Exemplo
<div className={cn("bg-red-500", isActive && "bg-green-500")}>
```

## Ícones

Utilizamos a biblioteca **Lucide React**.
```tsx
import { User, LogOut } from 'lucide-react';

<User className="h-4 w-4" />
```
