import { gql } from "@apollo/client";

const CurrentBalance = gql`
  query CurrentBalance($userId: Int!) {
    currentBalance(userId: $userId)
  }
`;

export default CurrentBalance;
