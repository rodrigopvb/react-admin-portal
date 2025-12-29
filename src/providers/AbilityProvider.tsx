import React, { createContext, useContext } from 'react';
import { AbilityBuilder, PureAbility, type AbilityClass } from '@casl/ability';
import { useAuth } from './AuthProvider';

export type AppAbility = PureAbility;
const AppAbility = PureAbility as AbilityClass<AppAbility>;

export const AbilityContext = createContext<AppAbility>(new AppAbility());

export const AbilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  const ability = React.useMemo(() => {
    const { can, build } = new AbilityBuilder(AppAbility);

    if (user) {
      if (user.role === 'ADMIN') {
        can('manage', 'all');
      } else {
        can('read', 'all');
      }
    } else {
      can('read', 'Login');
    }
    return build();
  }, [user]);

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
};

export const useAbility = () => useContext(AbilityContext);
