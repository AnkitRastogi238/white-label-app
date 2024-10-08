/**
 * Resolve the environment against predefined ones
 * @param env given environment
 * @param environments predefined environments
 * @returns environment
 */
export const resolveEnv = (env: string, environments: Record<string, string>): string => {
    let selectedEnv = '';
  
    for (const [key, value] of Object.entries(environments)) {
      if (value === env) {
        selectedEnv = key;
      }
    }
  
    return selectedEnv;
  };
  