import React, { useState, useContext, useEffect } from "react";

const PersonContext = React.createContext();

const data = [
  { id: 1, name: "Ayhan" },
  { id: 2, name: "Wyvern" },
  { id: 3, name: "Ellie" },
  { id: 4, name: "Sean" },
];

function Context() {
  const [people, setPeople] = useState(data);

  const removePerson = (id) => {
    setPeople((people) => {
      return people.filter((person) => person.id !== id);
    });
  };

  return (
    <PersonContext.Provider value={{ removePerson, people }}>
      <h3 className="mt-10 border-b-2 pb-5">Context API / useContext</h3>
      <List />
    </PersonContext.Provider>
  );
}

const List = () => {
  // useContext
  const { people } = useContext(PersonContext);

  useEffect(() => {
    console.log("useEffect that runs once");
  }, []);
  
  useEffect(() => {
    console.log("useEffect that runs every re-render");
  });

  return (
    <>
      {people.map((person) => {
        return <Person key={person.id} {...person} />;
      })}
    </>
  );
};

const Person = ({ id, name }) => {
  const { removePerson } = useContext(PersonContext);
  console.log(id, name);
  return (
    <div className="mt-10 grid grid-cols-10">
      <h3 className="col-span-7">{name}</h3>
      <button
        className="col-span-1 border border-red-200 text-red-400"
        onClick={() => removePerson(id)}
      >
        remove
      </button>
    </div>
  );
};

export default Context;
