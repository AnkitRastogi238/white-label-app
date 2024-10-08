// external dependencies
import { noop } from 'lodash-es';

// internal dependencies
import { LOG_LEVEL } from './constant';
import { environment } from '../env-manager';

/**
 * Logger service should be used for logging throughout the app.
 * The <code>LOG_LEVEL</code> decides the output of the logs.
 *
 * For example, LOG_LEVEL.ERROR level will only logs the error and exception logs in production.
 * Rest of the logs will be disabled.
 */
class Logger {
  private level: LOG_LEVEL = LOG_LEVEL.ERROR;
  private isProd = environment.isProd;

  /**
   * Configure the logs based on the log level
   */
  private configureLogs() {
    for (const key in LOG_LEVEL) {
      const level: number = parseInt(key, 0);
      if (level < this.level) {
        const fnName: string = LOG_LEVEL[level].toLowerCase();
        (console as any)[fnName] = noop;
        (this as any)[fnName] = noop;
      }
    }
  }

  /**
   * Initialize the logger
   * @param level Current log level
   * @param isProd Flag which indicates the current env is prod or not
   */
  public init(level: LOG_LEVEL, isProd: boolean): void {
    this.level = level;
    this.isProd = isProd;
    if (this.isProd) {
      this.configureLogs();
    }
  }

  /**
   * Prints to `stdout` with newline. Wrapper over standard log function.
   * @param args Message to be printed
   */
  public log(...args: any[]): void {
    console.log(...args);
  }

  /**
   * Prints to `stdout` with newline. Wrapper over standard warn function.
   * @param args Message to be printed
   */
  public warn(...args: any[]): void {
    console.warn(...args);
  }

  /**
   * Prints to `stderr` with newline. Wrapper over standard error function.
   * @param args Message to be printed
   */
  public error(...args: any[]): void {
    console.error(...args);
  }

  /**
   * Try to construct a table and log it. Wrapper over standard table function.
   * @param args Message to be printed in tabular format.
   */
  public table(...args: any[]): void {
    console.table(...args);
  }

  /**
   * Prints to `stderr` with newline.
   * @param args Message to be printed and send over to target tool for  observability
   */
  public exception(...args: any[]): void {
    console.error(...args);
    //ToDo: send the exceptions to the server or dynatrace for observability
  }
}

export const logger: Logger = new Logger();
