import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  let navigate = useNavigate();
  const onChange = (event: any) => {
    const {
      target: { name, value },
    } = event;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/users/join", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
      }),
    });
    if (response.status === 200) {
      navigate("/login");
    } else if (response.status === 400) {
      const data = await response.json();
      console.log(data.errorMessage);
    }
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
