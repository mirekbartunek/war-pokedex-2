export interface PartialRes {
  count: number;
  next: null | string;
  previous: null | string;
  results: Result[];
}

export type Result = {
  name: string;
  url: string;
};
