import { gql } from "@apollo/client";

const CreateTrade = gql`
  mutation CreateTrade(
    $user_id: Int!
    $synthetic_type: String!
    $option_type: String!
    $wager_amount: Float!
    $ticks: Int!
    $last_digit_prediction: Int
  ) {
    createTrade(
      user_id: $user_id
      synthetic_type: $synthetic_type
      option_type: $option_type
      wager_amount: $wager_amount
      ticks: $ticks
      last_digit_prediction: $last_digit_prediction
    )
  }
`;

export default CreateTrade;
