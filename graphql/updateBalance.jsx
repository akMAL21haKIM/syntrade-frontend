import { useQuery, useMutation, gql } from "@apollo/client";

const UpdateBalance = gql`
  mutation UpdateBalance($userId: Int!, $negatedParsedStakePayout: Float!) {
    updateBalance(user_id: $userId, stakePayout: $negatedParsedStakePayout)
  }
`;

export default UpdateBalance;