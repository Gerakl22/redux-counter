import React from "react";

import { Link } from "react-router-dom";

export const Menu = () => (
  <>
    <ul>
      <li>
        <Link to="/list-counters">List Counters</Link>
      </li>
      <li>
        <Link to="/add-counter">Add counter</Link>
      </li>
      <li>
        <Link to="/edit-counter">Edit counter</Link>
      </li>
    </ul>
  </>
);
