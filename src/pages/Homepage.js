import React from 'react'
import Dropdown from "../components/Dropdown/Dropdown";

function Homepage() {
  return (
    <div>
        <h1>OLA</h1>
        <Dropdown/>
      <h1>This is the home page</h1>
      <div className={'button'}>
        Click me
      </div>
    </div>
  );
}

export default Homepage;
