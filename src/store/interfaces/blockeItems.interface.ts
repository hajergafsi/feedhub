export interface IBlock {
  user: string;
  type: EBlocked;
  value: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export enum EBlocked {
  SOURCE = 'source',
  TAG = 'tag',
}

export type TBlockResponse = {results: IBlock[]; type: EBlocked};
