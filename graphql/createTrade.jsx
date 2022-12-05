import { gql } from "@apollo/client";

const CreateTrade = gql`
  mutation CreateTrade(
    $syntheticType: String!
    $optionType: String!
    $wagerAmount: Float!
    $ticks: Int!
    $lastDigitPrediction: Int
  ) {
    createTrade(
      syntheticType: $syntheticType
      optionType: $optionType
      wagerAmount: $wagerAmount
      ticks: $ticks
      lastDigitPrediction: $lastDigitPrediction
    )
  }
`;

export default CreateTrade;
