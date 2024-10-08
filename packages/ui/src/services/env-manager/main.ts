// internal dependencies
import { ACTIVE_ENVIRONMENT, ENVIRONMENTS } from '../../config/env';

// Environment Manager class
class EnvManager {
  // the selected environment
  private environment: string = '';

  /**
   * sets the environment
   * @param env given environment
   */
  public setEnvironment(env: any) {
    if (!Object.keys(ENVIRONMENTS).includes(env)) {
      // throw new Error('Unable to find the environment. Please check envt.ts');
    }

    this.environment = ENVIRONMENTS[env];
  }

  /**
   * Get the current environment
   * @returns the environment
   */
  public getEnvironment(): string {
    return this.environment;
  }

  /**
   * Validate the current environment
   * @param env given environment
   * @returns the validation result
   */
  public is(env: string): boolean {
    return this.getEnvironment() === env;
  }

  /**
   * Checks if the current environment is production
   * @returns boolean
   */
  get isProd() {
    return this.is(ENVIRONMENTS.PRODUCTION);
  }

  /**
   * Get the list of environments
   * @returns environments array
   */
  public getEnvironments(): Record<string, string> {
    return ENVIRONMENTS;
  }
}

// create an instance of the environment manager
const environment = new EnvManager();

// initialize the current environment
environment.setEnvironment(ACTIVE_ENVIRONMENT);

// export the environment instance
export { environment };
