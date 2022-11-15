import { useQuery, gql } from "@apollo/client";

const Users = () => {
  const UserQuery = gql`
    query UserQuery {
      users {
        user_id
        email
        password
        wallet_balance
        date_joined
      }
    }
  `;

  const { data, loading, error } = useQuery(UserQuery);

  if (loading) return <p>loading</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data.users.map((v) => {
          return (
            <li key={v.email}>
              User ID: {v.user_id} | Email: {v.email} | password: {v.password} |
              wallet_balance: {v.wallet_balance} | date_joined: {v.date_joined}{" "}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Users;
