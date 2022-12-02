import { gql } from "@apollo/client";

const CreateTrade = gql`
  mutation CreateTrade(
    $userId: Int!
    $syntheticTrade: String!
    $parsedStakePayout: Float!
  ) {
    createTrade(
      user_id: $userId
      synthetic_type: $syntheticTrade
      trade_result: $parsedStakePayout
    )
  }
`;

export default CreateTrade;
