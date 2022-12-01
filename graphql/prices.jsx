import { useQuery, useMutation, gql } from "@apollo/client";

const Prices = gql`
  query Prices(
    $selectedStakePayout: Boolean!
    $synth: String!
    $tradeType: String!
    $parsedStakePayout: Float!
    $parsedSliderValue: Int
  ) {
    prices(
      type: $selectedStakePayout
      syntheticModel: $synth
      tradeType: $tradeType
      stake: $parsedStakePayout
      ticks: $parsedSliderValue
    )
  }
`;

export default Prices;
