import { useQuery, useMutation, gql } from "@apollo/client";

const CreateBuyTrade = gql`
  mutation CreateBuyTrade(
    $userId: Int!
    $syntheticTrade: String!
    $parsedStakePayout: Float!
  ) {
    createBuyTrade(
      user_id: $userId
      synthetic_type: $syntheticTrade
      trade_result: $parsedStakePayout
    )
  }
`;

export default CreateBuyTrade;
