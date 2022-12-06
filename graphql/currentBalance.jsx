import { gql } from "@apollo/client";

const CurrentBalance = gql`
  query CurrentBalance ($userId: JWT!) {
    currentBalance(userId: $userId)
  }
`;

export default CurrentBalance;
