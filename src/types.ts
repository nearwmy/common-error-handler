export type Handler = (error: Error, event?: any) => void
export type Condition = (error: Error) => boolean

export interface ErrorHandlerConfig {
  condition: Condition;
  handler: Handler;
}

export interface Handlers {
  [index: string]: ErrorHandlerConfig;
}



