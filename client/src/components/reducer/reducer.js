export const reducer = (state, action) => {
  console.log(state, action);

  if(action.type === "ADD_ITEM") {
    const upsertPeople = [...state.people, action.payload];
    return {
      ...state,
      people: upsertPeople,
      isModalOpen: true,
      modalContent: "Item added."
    }
  }

  if(action.type === "REMOVE_ITEM") {
    const newPeople = state.people.filter(person => person.id !== action.payload);
    return {
      ...state,
      people: newPeople,
      isModalOpen: true,
      modalContent: "Item removed"
    }
  }

  if(action.type === "CLOSE_MODAL") {
    return {...state, isModalOpen: false}
  }

  if(action.type === "NO_VALUE") {
    return {...state, isModalOpen: true, modalContent: "Please enter a name"};
  }
  throw new Error("No mathcing action type")
}

