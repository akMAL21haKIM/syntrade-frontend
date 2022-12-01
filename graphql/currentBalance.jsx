import { useQuery, useMutation, gql } from "@apollo/client";

const CurrentBalance = gql`
  query CurrentBalance($userId: Int!) {
    currentBalance(user_id: $userId)
  }
`;

export default CurrentBalance;
