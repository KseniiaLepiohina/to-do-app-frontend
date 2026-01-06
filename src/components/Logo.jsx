import React from "react";

const Logo = ({ isMobile }) => {
  return (
    <section className="logo">
      {isMobile ? <h1>To-Do App</h1> : <h2>To-Do App</h2>}
    </section>
  );
};



export default Logo;
