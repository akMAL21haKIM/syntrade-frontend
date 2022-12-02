import { gql } from "@apollo/client";

const CreateTrade = gql`
  mutation CreateTrade(
    $userId: Int!
    $syntheticType: String!
    $optionType: String!
    $wagerAmount: Float!
    $ticks: Int!
    $lastDigit_Prediction: Int
  ) {
    createTrade(
      userId: $userId
      syntheticType: $syntheticType
      optionType: $optionType
      wagerAmount: $wagerAmount
      ticks: $ticks
      lastDigitPrediction: $lastDigitPrediction
    )
  }
`;

export default CreateTrade;
