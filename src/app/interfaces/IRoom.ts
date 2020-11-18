import {ILastMessage} from './ILastMessage';

export interface IRoom {
  public: boolean;
  roomId: string;
  latest: ILastMessage;
}
