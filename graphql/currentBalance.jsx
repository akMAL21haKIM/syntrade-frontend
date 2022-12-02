import { gql } from "@apollo/client";

const CurrentBalance = gql`
  query CurrentBalance($user_id: Int!) {
    currentBalance(user_id: $user_id)
  }
`;

export default CurrentBalance;
