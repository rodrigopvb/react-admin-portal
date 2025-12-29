# Gerenciamento de Permissões (Frontend)

O frontend implementa uma camada visual de segurança utilizando **CASL** (`@casl/react` e `@casl/ability`). Isso garante que a interface reflita exatamente o que o usuário pode fazer na API.

> ⚠️ **Importante**: A verificação no frontend é apenas para experiência do usuário (UX). A segurança real é garantida pelos Guards e Decorators na API.

## Como funciona (AbilityProvider)

O arquivo `src/providers/AbilityProvider.tsx` é responsável por definir as regras. Atualmente, ele implementa uma lógica simplificada que deve espelhar o backend:

```typescript
// Exemplo da lógica no Provider
if (user.role === 'ADMIN') {
    can('manage', 'all'); // Admin pode tudo
} else {
    can('read', 'all');   // Outros apenas leem
    can('update', 'User', { id: user.id }); // Pode editar a si mesmo (exemplo)
}
```

## Consumindo Permissões nos Componentes

Utilizamos o hook `useAbility()` fornecido pelo nosso contexto.

### 1. Renderização Condicional
Esconder botões ou seções inteiras caso o usuário não tenha permissão.

```tsx
import { useAbility } from '@/providers/AbilityProvider';

export function UserRow({ user }) {
  const ability = useAbility();

  return (
    <div>
      <span>{user.name}</span>
      
      {/* Só renderiza se puder editar usuários */}
      {ability.can('update', 'User') && (
        <Button onClick={handleEdit}>Editar</Button>
      )}

      {/* Só renderiza se puder deletar */}
      {ability.can('delete', 'User') && (
        <Button variant="destructive">Excluir</Button>
      )}
    </div>
  );
}
```

### 2. Desabilitando Inputs (Alternativa)
Em vez de esconder, você pode apenas desabilitar a interação.

```tsx
<Button disabled={!ability.can('create', 'User')}>
  Novo Usuário
</Button>
```

## Sincronização com Backend

Se as regras de permissão no backend (`ADMIN`, `USER`, `TRIAL`) mudarem, a lógica dentro do `AbilityProvider` deve ser atualizada para manter a consistência visual.

Futuramente, podemos evoluir para que a API retorne a lista de permissões (JSON) no login, tornando o frontend agnóstico às regras.
