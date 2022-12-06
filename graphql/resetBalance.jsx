import { gql } from "@apollo/client";

const ResetBalance = gql`
  mutation ResetBalance($userId: JWT!) {
    resetBalance(userId: $userId)
  }
`;

export default ResetBalance;
