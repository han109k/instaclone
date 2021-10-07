import React, { useState } from "react";
import ApiCaller from "../api/ApiCaller";
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
    <div>
      <h1 className="text-center">Image Upload</h1>
      <article className="mt-10 mx-auto max-w-md rounded-l-md border border-r-1 border-gray-300 p-5">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-10">
            <label htmlFor="file" className="col-span-2 text-sm font-light">
              Select File
            </label>
            <input
              type="file"
              className="col-span-8 rounded text-sm"
              name="image"
              onChange={(e) => setFiles(e.target.files[0])}
              multiple
              required
            />
          </div>
          {/* Name */}
          <div className="grid grid-cols-10 mt-5">
            <label htmlFor="name" className="col-span-2 text-sm font-light">
              Enter your name
            </label>
            <input
              type="text"
              className="col-span-8 rounded text-sm"
              name="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="iamtheuser"
              required
            />
          </div>
          <button className="mt-8 bg-gray-600 text-white px-4 py-1 rounded-lg">
            Save
          </button>
        </form>
      </article>
      <img src="insramtag.svg" width="130px" />
    </div>
  );
}

export default CloudinaryForm;
