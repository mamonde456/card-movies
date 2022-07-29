import { useState } from "react";
interface IUser {
  username: string;
  name: string;
  email: string;
  password: number;
  password2: number;
}

const Join = () => {
  const [user, setUser] = useState<IUser>({
    username: "",
    name: "",
    email: "",
    password: 0,
    password2: 0,
  });

  const onChange = (event: any) => {
    const {
      target: { name, value },
    } = event;
    setUser({
      ...user,
      [name]: value,
    });

    console.log(user);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = fetch("http://localhost:5000/api/users/join", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <>
      <h1>Join</h1>
      <form onSubmit={onSubmit}>
        <input
          placeholder="username"
          key="username"
          name="username"
          onChange={onChange}
        ></input>
        <input
          placeholder="name"
          key="name"
          name="name"
          onChange={onChange}
        ></input>
        <input
          placeholder="email"
          key="email"
          name="email"
          onChange={onChange}
        ></input>
        <input
          placeholder="password"
          key="password"
          name="password"
          onChange={onChange}
        ></input>
        <input
          placeholder="password2"
          key="password2"
          name="password2"
          onChange={onChange}
        ></input>
        <button>send</button>
      </form>

      <div></div>
    </>
  );
};

export default Join;
