import React, { useState, useReducer } from "react";
import { reducer } from "./reducer";
import Modal from "./Modal";

const defaultState = {
  people: [{ id: 1, name: "Player 1" }],
  isModalOpen: false,
  modalContent: "temp",
};

function Index() {
  const [name, setName] = useState("");
  const [state, dispatch] = useReducer(reducer, defaultState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(name) {
      const person = {id: new Date(), name};
      console.log(person);
      dispatch({type: "ADD_ITEM", payload: person});
      setName('');
    } else {
      dispatch({type: "NO_VALUE"});
    }
  };

  const closeModal = () => {
    dispatch({type: "CLOSE_MODAL"});
  }

  return (
    <section>
      {state.isModalOpen && (<Modal modalContent={state.modalContent} closeModal={closeModal}/>)}
      <form onSubmit={handleSubmit} className="border-b-2 pb-10 mt-10">
        <input
          type="text"
          className="text-md rounded-3xl"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
        />
        <button className="py-1 px-3 bg-blue-400 text-gray-700 rounded-xl ml-5">
          Submit
        </button>
      </form>
      <div className="mt-10">
        {state.people.map((person) => {
          return (
            <span className="grid grid-cols-10 mb-5">
              <p className="col-span-7">{person.name}</p>
              <button
                className="py-1 border border-red-500 rounded-md text-sm text-red-500 font-light col-span-1"
                onClick={() => {
                  dispatch({ type: "REMOVE_ITEM", payload: person.id });
                }}
              >
                remove
              </button>
            </span>
          );
        })}
      </div>
    </section>
  );
}

export default Index;
