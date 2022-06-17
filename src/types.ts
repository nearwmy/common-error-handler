export type Handler = (error: Error) => void
export type Condition = (error: Error) => boolean

export interface ErrorHandlerConfig {
  condition: Condition;
  handler: Handler;
}

export interface Handlers {
  [index: string]: ErrorHandlerConfig;
}



