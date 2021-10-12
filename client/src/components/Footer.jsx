import React from "react";

function Footer() {
  return (
    <footer className="flex flex-col flex-wrap text-center text-xs text-gray-500 cursor-default">
      <div>
        <span className="mx-3">About</span>
        <span className="mx-3">Blog</span>
        <span className="mx-3">Jobs</span>
        <span className="mx-3">Help</span>
        <span className="mx-3">API</span>
        <span className="mx-3">Privacy Terms</span>
        <span className="mx-3">Top Accounts</span>
        <span className="mx-3">Hastags</span>
        <span className="mx-3">Locations</span>
      </div>
      <div className="mx-auto my-5">
        <p className="text-gray-500 text-xs">
          &copy; 2021 Insramtag
        </p>
      </div>
    </footer>
  );
}

export default Footer;