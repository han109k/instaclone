import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/InstantProvider";
import ApiCaller from "../api/ApiCaller";
// Components
import { Header } from "../Header";

function UserPage() {
  const data = {};
  const { user } = useGlobalContext();
  const [account, setAccount] = useState({});

  const fetchUser = async () => {
    const res = await ApiCaller.get(`/${user.username}`);
    console.log(res.data);
    setAccount(res.data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <section>
      <Header />
      <main className="h-full flex flex-col w-full justify-center">
        <header className="flex-initial flex flex-row justify-center mt-10">
          {/* Profile Photo */}
          <div className="flex-initial w-4/12">
            <img
              src={account.profile_pic}
              width="150px"
              className="rounded-full mx-auto"
            />
          </div>
          {/* Details */}
          <section className="flex flex-col flex-initial w-6/12">
            <h2 className="text-3xl font-light mb-5">{account.user_name}</h2>
            <div className="flex flex-row gap-10 mb-5">
              <p><b>{account.posts}</b> Posts</p>
              <p><b>{account.followers}</b> Followers</p>
              <p><b>{account.following}</b> Following</p>
            </div>
            <p><b>{account.full_name}</b></p>
            <p>{account.bio}</p>
          </section>
        </header>
      </main>
    </section>
  );
}

export default UserPage;
