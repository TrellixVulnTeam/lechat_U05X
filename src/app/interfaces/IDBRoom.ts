import {IRoom} from './IRoom';
import {IDBMessage} from './IDBMessage';

export interface IDBRoom {
  id: string;
  data: IRoom;
  lastMessage?: IDBMessage;
}
