// src/lib/favoritesDatabase.ts
import fs from "fs/promises";
import path from "path";

const DB_PATH = path.join(process.cwd(), "favorites.json");

export interface FavoritePokemon {
  id: number;
  name: string;
  imageUrl: string;
  addedAt: string;
}

class FavoritesDatabase {
  private async readDB(): Promise<FavoritePokemon[]> {
    try {
      // leemos bd
      const data = await fs.readFile(DB_PATH, "utf-8");
      return JSON.parse(data);
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        return [];
      }
      console.error("Error reading favorites DB:", error);
      return [];
    }
  }

  private async writeDB(data: FavoritePokemon[]): Promise<void> {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  }

  async getAll(): Promise<FavoritePokemon[]> {
    return await this.readDB();
  }

  async getById(id: number): Promise<FavoritePokemon | undefined> {
    const data = await this.readDB();
    return data.find((item) => item.id === id);
  }

  async add(pokemon: Omit<FavoritePokemon, "addedAt">): Promise<FavoritePokemon | null> {
    const data = await this.readDB();
    if (data.some(fav => fav.id === pokemon.id)) {
      console.log(`Pokemon con ID ${pokemon.id} ya existe en favoritos.`);
      return null;
    }

    const newFavorite: FavoritePokemon = {
      ...pokemon,
      addedAt: new Date().toISOString(),
    };
    data.push(newFavorite);
    await this.writeDB(data);
    return newFavorite;
  }

  async remove(id: number): Promise<boolean> {
    const data = await this.readDB();
    const initialLength = data.length;
    const filteredData = data.filter((item) => item.id !== id);

    if (filteredData.length === initialLength) {
      return false;
    }

    await this.writeDB(filteredData);
    return true; // Se elimino correctamente
  }

}

export const favoritesDB = new FavoritesDatabase();