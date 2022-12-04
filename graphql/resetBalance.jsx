import { gql } from "@apollo/client";

const ResetBalance = gql`
  mutation ResetBalance($userId: Int!) {
    resetBalance(userId: $userId)
  }
`;

export default ResetBalance;
