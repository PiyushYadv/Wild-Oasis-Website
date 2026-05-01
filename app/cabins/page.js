export default async function Page() {
  const data = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await data.json();
  return (
    <div>
      <h1>Cabins page</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
