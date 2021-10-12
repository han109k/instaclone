import React, { useState } from "react";
import ApiCaller from "../api/ApiCaller";
import Footer from "../Footer";
const FormData = require("form-data");

function CloudinaryForm() {
  const [files, setFiles] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    console.log(e.target.name.value);

    try {
      ApiCaller.post("/post", data, {
        headers: {},
      }).then((res) => console.log(res));
    } catch (error) {
      console.error(error);
    }
    setFiles([]);
  };

  return (
    <>
      <section className="relative flex flex-row flex-wrap justify-center content-center min-h-screen">
        <form className="flex flex-col gap-5">
          <label htmlFor="">First Name</label>
          <input type="text" />
          <label htmlFor="">Last Name</label>
          <input type="text" />
          <label htmlFor="">Address</label>
          <input type="text" />
          <label htmlFor="">Request</label>
          <input type="text" />
          <input type="file" name="" id="" />
          <input type="search" name="" id="" />
        </form>
      </section>
      <Footer />
    </>
  );
}

export default CloudinaryForm;
