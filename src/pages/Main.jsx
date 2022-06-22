import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import Details from "../components/Details";
import PageNr from "../components/PageNr";

//Hovedfunksjon med props(properties) som parameter
function Main() {
  //variabel og funksjon for å fetche api
  const [cocktailList, setCocktailList] = useState([]);

  //variabel og funksjon for å sortere data og koble sortering til knapper
  const [sortedConfig, setsortedConfig] = useState(null);
  const [showDetail, setShowDetails] = useState(false);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [elementsPerPage] = useState(5);

  //Endre side Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //fetch API med axios

  const fetchRandomData = (search = "margarita") => {
    axios
      .get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
      .then((response) => {
        console.log(response.data.drinks);
        if (!response.data.drinks) setCocktailList();
        else setCocktailList(response.data.drinks);
      })
      .catch((error) => {
        console.log(error);
        setCocktailList();
      });
    console.log(cocktailList);
  };

  //fetch API når siden rendrer med useEffect

  useEffect(() => {
    fetchRandomData();
  }, []);

  //SORTERINGSFUNKSJON

  //lagret i useMemo for at vi ikke unødvendig må laste inn data hver gang siden rendrer(ikke egentlig nødvendig i mindre prosjekter)
  //sortert med tenary operator og direction for å endre utfall ut fra om listen ascender eller descender

  React.useMemo(() => {
    if (sortedConfig !== null) {
      cocktailList.sort((a, b) => {
        if (a[sortedConfig.key] < b[sortedConfig.key]) {
          return sortedConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortedConfig.key] > b[sortedConfig.key]) {
          return sortedConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return cocktailList;
  }, [cocktailList, sortedConfig]);

  //funksjon for å vite om lister ascender eller descender og sette den til motsatt når knappen trykkes på

  const requestSort = (key) => {
    let icon = "inactive";

    let direction = "ascending";
    if (
      sortedConfig &&
      sortedConfig.key === key &&
      sortedConfig.direction === "ascending"
    ) {
      direction = "descending";
    }

    setsortedConfig({ key, direction });
    console.log(direction, key, icon);
  };

  //funksjon for å endre ikoner (pil opp og pil ned)

  const renderArrow = (key) => {
    if (
      sortedConfig &&
      key === sortedConfig.key &&
      sortedConfig.direction === "ascending"
    ) {
      return <BiUpArrowAlt className="arrow-react-icons inactive" />;
    }
    return <BiDownArrowAlt className="arrow-react-icons active" />;
  };

  //detaljeoversikt

  const details = (show) => {
    setShowDetails(show);
  };

  //get current Element
  const indexofLastElement = currentPage * elementsPerPage;
  const indexofFirstElement = indexofLastElement - elementsPerPage;
  const currentElements = cocktailList.slice(
    indexofFirstElement,
    indexofLastElement
  );

  //JSX
  return (
    <WholePage>
      <MainPage>
        <Type>
          <div onClick={() => fetchRandomData("rum")}>Rom</div>
          <div onClick={() => fetchRandomData("vodka")}>Vodka</div>
          <div onClick={() => fetchRandomData("gin")}>Gin</div>
          <div onClick={() => fetchRandomData("tequila")}>Tequila</div>
        </Type>
        <div className="table-wrap">
          <Table>
            <caption>Cocktails</caption>
            <thead>
              <tr className="headers">
                <th className="klikkbar-navn">
                  Navn
                  <button type="button" onClick={() => requestSort("strDrink")}>
                    {renderArrow("strDrink")}
                  </button>
                </th>
                <th>
                  Hovedingrediens
                  <button
                    type="button"
                    onClick={() => requestSort("strIngredient1")}
                  >
                    {" "}
                    {renderArrow("strIngredient1")}
                  </button>
                </th>
                <th>
                  Alkohol
                  <button
                    type="button"
                    onClick={() => requestSort("strAlcoholic")}
                  >
                    {" "}
                    {renderArrow("strAlcoholic")}
                  </button>
                </th>
                <th>
                  Glass
                  <button type="button" onClick={() => requestSort("strGlass")}>
                    {" "}
                    {renderArrow("strGlass")}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentElements.map((cocktail, index) => (
                <div className="row-content-containter ">
                  <tr
                    id="tablebody-elements"
                    key={cocktail.idDrink}
                    className="row-content"
                  >
                    <div
                      className="w100"
                      onMouseOver={(e) => details(cocktail)}
                      onMouseLeave={(e) => details(null)}
                    >
                      <div className="w100 flex">
                        <td>{cocktail.strDrink}</td>
                        <td>{cocktail.strIngredient1}</td>
                        <td>{cocktail.strAlcoholic}</td>
                        <td>{cocktail.strGlass}</td>
                      </div>
                      {showDetail && showDetail.idDrink == cocktail.idDrink && (
                        <Details
                          className="details-mobile"
                          cocktail={showDetail}
                        />
                      )}
                    </div>
                  </tr>
                </div>
              ))}
            </tbody>
          </Table>
        </div>
        <PageNr
          elementsPerPage={elementsPerPage}
          totalElements={cocktailList.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </MainPage>
    </WholePage>
  );
}

//styling av elementene med styled components

const WholePage = styled.div`
  flex: column center center;

  min-height: 100%;
  overflow: auto;
  width: 100%;
  position: relative;
  top: 10%;

  .w100 {
    width: 100%;
  }
  .flex {
    display: flex;
    height: 80px;
  }
`;

const MainPage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .table-wrap {
    width: 100%;
    max-width: 1400px;
    flex: row top left;
    padding: 0 5px;
  }
`;

const Table = styled.table`
  display: flex;
  min-width: 70%;
  height: 70%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  flex-wrap: wrap;

  caption {
    color: white;
    font-size: 5rem;
    margin-bottom: 2%;
  }

  tr {
    flex: 1;
    display: flex;
    justify-content: stretch;
    align-items: center;
    min-width: 100%;
    background-color: #fefefe;
    border-bottom: 5px solid black;
  }

  thead {
    width: 100%;
  }

  th {
    background-color: #13c4b9;
    font-size: 1rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex: 1;
  }

  .headers {
    flex: 1;
    background-color: #2d2d2d78;
  }

  .klikkbar-navn {
    cursor: pointer;
  }

  tbody {
    font-size: 1.2rem;
    border: 6px solid black;
    width: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .row-content-containter {
      width: 100%;
    }
    .row-content {
      width: 100%;
      flex: row top left;

      cursor: pointer;
    }
  }

  td {
    flex: 1;

    display: flex;
    justify-content: center;
    align-items: center;
    font-size: medium;
  }

  button {
    border: none;
    background-color: #13c4b9;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .arrow-react-icons {
    color: black;
    font-size: 1rem;
    cursor: pointer;
    background-color: white;
    border-radius: 50%;
    flex: 2;
  }
`;

const Type = styled.div`
  min-width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;

  div {
    color: white;
    flex: 1;
  }
`;

export default Main;
