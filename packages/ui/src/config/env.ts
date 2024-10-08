import { resolveEnv } from '../services/env-manager/util';
/**
 * Environments
 */
export const ENVIRONMENTS = {
  PRODUCTION: 'production',
  STAGING: 'staging',
  QA: 'qa',
  DEVELOPMENT: 'development',
};

// get the environment from mode(command line) or vercel VITE_ENV
const _env = import.meta.env.MODE || import.meta.env.VITE_ENV;

// active Environment
export const ACTIVE_ENVIRONMENT = resolveEnv(_env, ENVIRONMENTS) || ENVIRONMENTS.DEVELOPMENT;
