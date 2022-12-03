import { gql } from "@apollo/client";

const Prices = gql`
  query Prices(
    $wagerType: String!
    $syntheticModelType: String!
    $simplifiedTradeType: String!
    $parsedWagerAmount: Float!
    $ticks: Int
  ) {
    prices(
      wagerType: $wagerType
      syntheticModel: $syntheticModelType
      tradeType: $simplifiedTradeType
      wagerAmount: $parsedWagerAmount
      ticks: $ticks
    )
  }
`;

export default Prices;
