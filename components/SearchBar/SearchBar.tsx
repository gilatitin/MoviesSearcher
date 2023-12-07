import React, {useState} from "react";
import "./SearchBar.css";
import { ApiCallResultInterface } from  '../../Interfaces'

//todo move to types file
export type HandleTotalPagesType = (newTotalPages: number) => void;
export type HandleSearchType = (input: string, page: number) => void;
export type HandleNewInputType = (input: string, page: number) => void;
export type HandleResultsType = (newHandleResults: ApiCallResultInterface) => void;


export const SearchBar = ( { handleSearch }: { handleSearch : HandleSearchType }) => {

    const [input, setInput] = useState("");

    return (
        <div className='input-container'>
                 <input placeholder='Type movie name...'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}></input>
                <button className='search-button' onClick={() => handleSearch(input,1)}>Search</button>
        </div>);
};