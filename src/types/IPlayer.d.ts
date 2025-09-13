/* types */
import { IPlayerClass } from "../types";

export interface IPlayer {
  //id: string;
  name: string;
  class: IPlayerClass;
  isConfirmed?: boolean;
}
