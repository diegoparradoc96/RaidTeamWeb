import type { IPlayer } from "@/types";
import localforage from "localforage";

class RaidService {
  async saveRaid(name: string, slots: (IPlayer | null)[][]): Promise<boolean> {
    try {
      await localforage.setItem(`raid_${name}`, slots);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async getRaid(name: string): Promise<(IPlayer | null)[][] | null> {
    try {
      const raid = await localforage.getItem<(IPlayer | null)[][]>(`raid_${name}`);
      return raid;
    } catch (error) {
      throw error;
    }
  }

  async getAllRaids(): Promise<string[]> {
    try {
      const keys = await localforage.keys();
      return keys.filter(key => key.startsWith('raid_')).map(key => key.replace('raid_', ''));
    } catch (error) {
      throw error;
    }
  }

  async deleteRaid(name: string): Promise<boolean> {
    try {
      await localforage.removeItem(`raid_${name}`);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async renameRaid(oldName: string, newName: string): Promise<boolean> {
    try {
      const raid = await this.getRaid(oldName);
      if (raid) {
        await this.saveRaid(newName, raid);
        await this.deleteRaid(oldName);
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }
}

const raidService = new RaidService();

export { raidService };