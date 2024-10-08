// internal dependencies
import type { Store, StoreValue } from './types';

// Cache class for handling the records caching
class Cache {
  private store: Store<StoreValue> = {};
  private expirationTime: number;

  constructor() {
    // TBD - stale cache clearance service to prevent memory leak?
    this.expirationTime = 10;
  }

  /**
   * Set the default cache expiration time in seconds
   * @param time time in seconds
   */
  public setExpirationTime(time: number): void {
    this.expirationTime = time;
  }

  /**
   * Validate the key to be a string
   * @param key store key
   */
  private validateKey(key: string) {
    if (!key || typeof key !== 'string') {
      throw new Error('Key cannot be empty');
    }
  }

  /**
   * Get the difference between two dates in seconds
   * @param dateOne Date object
   * @param dateTwo Date object
   * @returns Number of seconds
   */
  static getElapsedSeconds(dateOne: Date, dateTwo: Date): number {
    if (!dateOne || !dateTwo) {
      throw new Error('Arguments must date objects');
    }

    const diffTime = Math.abs((dateTwo as any) - (dateOne as any));
    return Math.ceil(diffTime / 1000);
  }

  /**
   * Check for expiration of cache entry. Expiration time of cache entry has higher priority over global expiration time
   * @param value StoreValue object
   * @returns flag for cache expiration
   */
  private cacheExpired(value: StoreValue): boolean {
    let expired = false;

    if (!value) {
      expired = true;
    } else if (
      value.expirationTime === -1 &&
      Cache.getElapsedSeconds(value.createdAt, new Date()) > this.expirationTime
    ) {
      expired = true;
    } else if (
      value.expirationTime !== -1 &&
      Cache.getElapsedSeconds(value.createdAt, new Date()) > value.expirationTime
    ) {
      expired = true;
    }

    return expired;
  }

  /**
   * Populate the store with cache entry
   * @param key store key
   * @param value store value
   * @param time expiration time in seconds
   */
  public async set<T>(key: string, value: T, time = -1): Promise<void> {
    this.validateKey(key);

    this.store[key] = {
      expirationTime: time,
      value,
      createdAt: new Date(),
    };
  }

  /**
   * Get the value of particular key from store
   * @param key store key
   * @returns corresponding stored value
   */
  public async get(key: string): Promise<typeof value> {
    this.validateKey(key);
    const item = this.store?.[key];
    const value = item?.value;

    if (this.cacheExpired(item)) {
      this.delete(key);
    }

    return value;
  }

  /**
   * Delete a cache entry from store
   * @param key store key
   * @returns cache entry deleted flag
   */
  public async delete(key: string): Promise<boolean> {
    this.validateKey(key);

    const keyExists = this.store?.[key] ? true : false;

    if (keyExists) {
      delete this.store[key];
    }

    return keyExists;
  }

  /**
   * Empty the store/cache
   */
  public async clear(): Promise<void> {
    this.store = {} as Store<StoreValue>;
  }
}

//Export singleton cache instance
export const cache = new Cache();
