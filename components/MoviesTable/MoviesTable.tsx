import React, {useState, useMemo, useEffect} from "react";
import "./MoviesTable.css";
import {MovieData, ApiCallResultInterface, Column } from  '../../Interfaces'
import {HandleResultsType, HandleSearchType} from "../SearchBar/SearchBar";
import { FaSort } from "react-icons/fa6";

export type HandleSortType = (column: Column) => void;


export const MoviesTable = ({ pagesArr,currentPage, handleSort }: { pagesArr : MovieData[][],currentPage: number,
    handleSort: HandleSortType }) => {

    const columns = useMemo(
        () => [
            {
                header: "Title",
                isSortedDesc: true
            },
            {
                header: "Year",
                isSortedDesc: false
            }
        ],
        []
    );

    return <div className='table-wrapper'>
        <table>
            <thead>
            <tr>

            {columns.map((column) => (
                        <th >
                            <div className='column'>
                                {column.header}
                            <span>
                                <FaSort
                                    className='sort-button'
                                    onClick={() => {
                                    column.isSortedDesc = !column.isSortedDesc;
                                    handleSort(column)}} />
                            </span>
                            </div>
                        </th>
                    )
            )}
            </tr>

            </thead>
            <tbody>
            {pagesArr[currentPage-1] ? pagesArr[currentPage-1].map((row : MovieData) => {
                return (
                    <tr key={row.imdbID} >
                        <td >{row.Title} </td>
                        <td >{row.Year} </td>
                    </tr>
                );
            }) : null}
            </tbody>
        </table>
    </div>
}

