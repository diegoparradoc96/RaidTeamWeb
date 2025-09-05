import type { IPlayer } from "@/types";
import localforage from "localforage";

class PlayerService {
  async postPlayer(player: IPlayer): Promise<boolean> {
    try {
      const playerdb = await this.getPlayer(player.name);
      if (playerdb) {
        throw new Error("Player already exists");
      } else {
        await localforage.setItem(`player_${player.name}`, player);
      }
      return true;
    } catch (error) {
      throw error;
    }
  }
  async getPlayer(name: string): Promise<IPlayer | null> {
    try {
      const player = await localforage.getItem<IPlayer>(`player_${name}`);
      return player;
    } catch (error) {
      throw error;
    }
  }
  async getPlayers(): Promise<IPlayer[]> {
    try {
      const keys = await localforage.keys();
      const players = await Promise.all(
        keys
          .filter((key) => key.startsWith("player_"))
          .map((key) => localforage.getItem<IPlayer>(key))
      );
      return players.filter((player) => player !== null) as IPlayer[];
    } catch (error) {
      throw error;
    }
  }
  async removePlayer(name: string): Promise<boolean> {
    try {
      await localforage.removeItem(`player_${name}`);
      return true;
    } catch (error) {
      throw error;
    }
  }
}

const playerService = new PlayerService();

export { playerService };
