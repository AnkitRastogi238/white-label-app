export type StoreValue = {
    expirationTime: number;
    value: any;
    createdAt: Date;
  };
  
  export type Store<V> = {
    [key: string]: V;
  };
  