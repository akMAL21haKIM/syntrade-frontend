import { gql } from "@apollo/client";

const Trades = gql`
  query Trades($userId: JWT!) {
    tradesByUserId(userId: $userId) {
      trade_id
      synthetic_type
      currency
      transaction_time
      transaction_type
      transaction_amount
      current_wallet_balance
    }
  }
`;

export default Trades;
