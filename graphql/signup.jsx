import { gql } from "@apollo/client";

const Signup = gql`
  mutation signup($email: EmailAddress!, $password: String!) {
    signup(email: $email, password: $password) {
      email
    }
  }
`;

export default Signup;
