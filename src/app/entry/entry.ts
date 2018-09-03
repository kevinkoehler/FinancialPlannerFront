import {Type} from '../enums/type.enum';
import {Frequency} from '../enums/frequency.enum';

export interface IEntry {
  id: number;
  planId: number;
  name: string;
  amount: number;
  type: string;
  frequency: string;
}
