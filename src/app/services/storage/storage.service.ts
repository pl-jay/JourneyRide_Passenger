import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  async setStorageData(key, value) {
    this.storage.set(key, value);
  }

  async getStorageData(key) {
    return this.storage.get(key);
  }

  async removeStorageData(key) {
    this.storage.remove(key);
  }

  async clearStorageData()  {
    this.storage.clear();
  }
}
