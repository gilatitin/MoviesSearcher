import React, {useState} from "react";
import { SearchBar } from './components/SearchBar/SearchBar'
import { MoviesTable } from './components/MoviesTable/MoviesTable'
import './App.css';
import { MovieData, Column } from  './Interfaces'

function App() {

    const [totalPages, setTotalPages] = useState(0);
    const [input, setInput] = useState("");
    const [searchedAll, setSearchedAll] = useState(false);
    const [pagesArr, setPagesArr] = useState<MovieData[][]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const handleSearchFunc = (input : string, page : number) => {
        setPagesArr([]);
        setSearchedAll(false);
        setCurrentPage(page);
        callMovieApi(input, page, []);
    };

    const callMovieApi = async (input : string, page : number, currentPagesArr? : MovieData[][]) => {
        setInput(input);
        const response = await fetch(`https://jsonmock.hackerrank.com/api/movies/search/?Title=${input}&page=${page}`);
        const responseJson = await response.json();
        setTotalPages(responseJson.total_pages);
        const temp = currentPagesArr || pagesArr
        let newArr = [...temp];
        newArr[page - 1] = responseJson.data;
        setPagesArr(newArr);
        return newArr;
    }

    const handlePageResults = (input: string, page: number) => {
        setCurrentPage(page);
        if(!pagesArr[page-1]) {
            callMovieApi(input,page)
        }
    }

    const sortColumn = (column: Column, columnName: keyof MovieData, currentPagesArr : MovieData[][]) => {
        const temp = [...(currentPagesArr).flat()];
        let sortMethod = -1;
        if(!column.isSortedDesc){
            sortMethod = 1;
        }
        temp.sort((a,b) => {
            if(b[columnName] > a[columnName]){
                return -1*sortMethod;
            }

            if(a[columnName] > b[columnName]){
                return  1*sortMethod;
            }
            return 0;
        });

        // unflatten the array of pages
        var unflattenArr = [], size = 10;
        while (temp.length > 0) unflattenArr.push(temp.splice(0, size));
        setPagesArr(unflattenArr);
    }

    const handleSortFunc = async (column: Column) => {
        if(!searchedAll) {
            setSearchedAll(true);

            const promiseArr = [];
            for (let index = 0; index < totalPages; index++) {
                    if(!pagesArr[index]) {
                        promiseArr.push(callMovieApi(input, index + 1));
                    }
            }
            const responseArr = await Promise.all(promiseArr);
            sortColumn(column,column.header as keyof MovieData, responseArr[ responseArr.length - 1] || pagesArr)
        }
        else{
            sortColumn(column,column.header as keyof MovieData, pagesArr);

        }
    };


    return (
    <div className="App">
        <div>
            <h1 className='header' >Movie Search</h1>
            <h1 className='second-header' >Search any movie you like:</h1>
            <div className='container'>
                <SearchBar handleSearch={handleSearchFunc}/>
                { totalPages > 0 ?
                    <MoviesTable pagesArr={pagesArr} currentPage={currentPage} handleSort={handleSortFunc}></MoviesTable> :
                    (pagesArr && input !== '' ?  <div className='no-results-label'>No results found!</div> : null)
                }
                <div>
                {totalPages ?
                    [...Array(totalPages)].map((e, i) =>
                        <button className='page-button'
                                style={{
                                    borderColor: currentPage === i + 1 ? 'darkblue' : 'white',
                                }}
                                onClick={() => handlePageResults(input,i+1)}>{i + 1}</button>
                    ) : null
                }
                </div>
                {totalPages ?
                    <div className='total-pages'>{totalPages} total pages</div> : null
                }
            </div>
        </div>
    </div>
  );
}

export default App;
