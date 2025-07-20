import { makeAutoObservable } from "mobx";

export const favoritesStore = makeAutoObservable({
  items: JSON.parse(localStorage.getItem("favorites") || "[]") as string[],

  get hasItems() {
    return this.items.length > 0;
  },

  isFavorite(id: string) {
    return this.items.includes(id);
  },
  toggle(id: string) {
    if (this.isFavorite(id)) {
      this.remove(id);
    } else {
      this.add(id);
    }
  },

  add(id: string) {
    if (!this.isFavorite(id)) {
      this.items.push(id);
      this.persist();
    }
  },
  remove(id: string) {
    this.items = this.items.filter((item) => item !== id);
    this.persist();
  },
  persist() {
    localStorage.setItem("favorites", JSON.stringify(this.items));
  },
});
