import React from "react";
import styled from "styled-components";
import { useState } from "react";

function PageNr({ elementsPerPage, totalElements, paginate, currentPage }) {
  const pageNumbers = [];

  const [activated, setActivated] = useState(null);

  const total = Math.ceil((totalElements || 0) / (elementsPerPage || 0));

  for (let i = 0; i < total; i++) {
    pageNumbers.push(i + 1);
  }
  console.log({});

  //active page

  return (
    <NavPageBar>
      <div>Page: </div>

      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
          >
            <a
              onClick={() => paginate(number)}
              onChange={() => setActivated(activated)}
              href="!#"
              className={activated ? "anchor activated" : "anchor"}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </NavPageBar>
  );
}

const NavPageBar = styled.nav`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  ul {
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  li {
    margin-left: 2rem;
  }

  a {
    color: white;
    text-decoration: none;
  }

  .active {
    text-decoration: underline;
  }
  .activated {
    color: #45bb22 !important;
    height: 40px;
  }
`;

export default PageNr;
