import React, { useState } from "react";

function ControlledInputs() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [people, setPeople] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && email) {
      const person = { id: new Date(), username, email };
      setPeople((people) => {
        return [...people, person];
      });
      console.log(person);
      setUserName("");
      setEmail("");
    } else {
      console.log("Values empty");
    }
  };

  return (
    <>
      <article className="mt-10 mx-auto max-w-md rounded-l-md border border-r-1 border-gray-300 p-5">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-10">
            <label
              htmlFor="username"
              className="col-span-2 text-sm font-light pt-2"
            >
              Username
            </label>
            <input
              type="text"
              className="col-span-8 rounded text-sm"
              name="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="iamtheuser"
              autoFocus
              required
            />
          </div>
          <div className="grid grid-cols-10 mt-8">
            <label
              htmlFor="email"
              className="col-span-2 text-sm font-light pt-2"
            >
              Email
            </label>
            <input
              type="email"
              className="col-span-8 rounded text-sm"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@abc.com"
              required
            />
          </div>

          <button className="mt-8 bg-gray-600 text-white px-4 py-1 rounded-lg">
            Save
          </button>
        </form>
      </article>
      <section className="mt-5">
        <h2 className="mb-5 font-normal underline">User list</h2>
        <ul>
          {people.map((person) => {
            return (
              <li key={person.id} className="grid grid-cols-10 mx-auto max-w-md">
                <p className="inline col-span-3 font-medium">
                  {person.username}
                </p>
                <p className="inline col-span-7 font-light">
                  {person.email}
                </p>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}

export default ControlledInputs;
