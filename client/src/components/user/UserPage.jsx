import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/InstantProvider";
import ApiCaller from "../api/ApiCaller";
// Components
import { Header } from "../Header";

function UserPage() {
  const data = {};
  const { username } = useGlobalContext();
  const [user, setUser] = useState({});

  const fetchUser = async () => {
    const res = await ApiCaller.get(`/${username}`);
    console.log(res.data);
    setUser(res.data)
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <section>
      <Header />
      <main className="h-full flex mt-10">
        <div className="flex-initial w-8/12 mx-auto">
          <header className="grid grid-cols-6">
            {/* Profile Photo */}
            <div className="col-span-2 mx-auto">
              <img src={user.profile_pic} width="150px" className="rounded-full"/>
            </div>
            {/* Details */}
            <section className="flex flex-col flex-initial col-span-4">
              <h1>{user.user_name}</h1>
              <p>Posts: {user.posts}</p>
              <p>Followers: {user.followers}</p>
              <p>Following: {user.following}</p>
              <p>{user.full_name}</p>
              <p>{user.bio}</p>
            </section>
          </header>
        </div>
      </main>
    </section>
  );
}

export default UserPage;
