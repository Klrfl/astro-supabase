/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    user?: null | {
      email?: string;
    };
  }
}
