//services.tsx
import { pool } from './mysql-pool';

export class Item {
  id: number = 0;
  title: string  = '';
  description: string  = '';
  not_available: boolean = false;
}

class ItemService {
  //method that retrieves all items in the database
  getItems() {
    return new Promise<Item[]>((resolve, reject) => {
      pool.query('SELECT * FROM Items', [], (error: Error, result: Item[]) => {
        if (error) return reject(error);
        
        resolve(result);
      });
    });
  }

  //method that adds a new item to the Items table
  addItem(title: string, description: string, not_available: boolean): Promise<void> {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO Items (title, description, not_available) VALUES (?, ?, ?)', 
      [title, description, not_available], (error: Error) => {
        if (error) return reject(error);
        
        resolve();
      });
    });
  }

  //method that toggles the not_available flag for the item with the specified id
  toggleItem(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE Items SET not_available = !not_available WHERE id = ?', 
      [id], (error: Error) => {
        if (error) return reject(error);
        
        resolve();
      });
    });
  }

  //method that deletes a item with a specified id from the Items table
  deleteItem(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      pool.query('DELETE FROM Items WHERE id = ?', 
      [id], (error: Error) => {
        if (error) return reject(error);
        
        resolve();
      });
    });
}
}

export let itemService = new ItemService();

