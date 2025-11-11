import { OwnerTransaction } from "../valueObjects/owner_transaction";
import { StockTransactionItem } from "../valueObjects/stock_transaction_item";
import { StorageEndpoint } from "../valueObjects/storage_endpoint";

export interface StockTransaction {
  id: number,
  code: string,
  serverId: number,
  ownerTransaction: OwnerTransaction,
  description: string,
  orderId: number,
  createAt: Date,
  type: TransactionType,
  fromStorage: StorageEndpoint,
  toStorage: StorageEndpoint,
  items: StockTransactionItem[],
}