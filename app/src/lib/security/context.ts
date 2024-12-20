import { writable } from "svelte/store";
import type { User } from "./user";

export class Context {
  user?: User;
  constructor(user?: User) {
    this.user = user;
  }
}

export const context = writable(new Context());
