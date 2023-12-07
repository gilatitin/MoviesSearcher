
export interface MovieData{
    Title: string,
    Year: number,
    imdbID: number
}


export interface ApiCallResultInterface{
    data: MovieData[],
    page: number,
    per_page: number,
    total: number,
    total_pages: number
}

export interface Column{
    header: string,
    isSortedDesc: boolean
}
