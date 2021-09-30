import React, { useState, useEffect } from "react";
const url = "https://api.github.com/users/QuincyLarson";

function MultipleReturns() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState("default user");
  const [avatar, setAvatar] = useState("");

  const userName = useEffect(() => {
    const res = fetch(url)
      .then((res) => {
        if (res.status > 199 && res.status < 300) {
          return res.json();
        } else {
          setIsLoading(false);
          setIsError(true);
          throw new Error(res.statusText);
        }
      })
      .then((user) => {
        const {login, avatar_url} = user;
        console.log(user);
        setUser(login);
        setAvatar(avatar_url);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  if(isLoading) {
    return <h2 className="h-screen flex flex-wrap gap-5 justify-center content-center">loading...</h2>
  }

  if(isError) {
    return <h2 className="h-screen flex flex-wrap gap-5 justify-center content-center text-red-500">Error...</h2>
  }

  return (
    <div className="h-screen flex flex-wrap gap-5 justify-center content-center">
      <h2 className="flex flex-wrap content-center">{user}</h2>
      <img
        src={avatar}
        alt="avatar"
        className="rounded-full"
      />
    </div>
  );
}

export default MultipleReturns;
