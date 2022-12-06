import { gql } from "@apollo/client";

const CurrentBalance = gql`
  query CurrentBalance {
    currentBalance
  }
`;

export default CurrentBalance;
