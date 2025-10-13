// // services/products.service.ts
// import * as repo from "../repos/products.repo";

// export async function list(params: { page: number; limit: number; order?: string; search?: string }) {
//   return repo.list(params);
// }

// export async function getById(id: string) {
//   const item = await repo.getById(id);
//   if (!item) throw Object.assign(new Error("Product not found"), { status: 404 });
//   return item;
// }

// export async function create(input: any) {
//   // regras (ex.: SKU único, normalização, etc.)
//   return repo.create(input);
// }

// export async function update(id: string, input: any) {
//   await getById(id);
//   return repo.update(id, input);
// }

// export async function remove(id: string) {
//   await getById(id);
//   return repo.remove(id);
// }

// export async function getStocks(id: string) {
//   await getById(id);
//   return repo.getStocks(id);
// }
