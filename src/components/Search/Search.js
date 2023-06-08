import React, { useEffect, useState } from 'react'
import './search.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../redux/slices/feedSlice'
import Followings from '../followings/Followings'

function Search() {
    const [search, setSearch] = useState("")
    const dispatch = useDispatch();
    const rawData = useSelector(s => s.feedReducer.allUsersData)
    useEffect(() => {
        dispatch(getAllUsers());


    }, [dispatch])
    const data = rawData.filter(item => {
        if (search.includes('*') || item?.name?.toLowerCase().includes(search) || item?.username?.toLowerCase().includes(search))
            return item;

        else return null;
    })
    return (
        <div className='flexcol' id='search-page'>
            <div className="search">


                <input autoFocus onChange={(e) => setSearch(e.target.value.toLowerCase())} placeholder='Search' type="text" />


            </div>
            <div className="data">
                {
                    search === "" ? null :
                        data?.map((item, i) => {
                            return (

                                <Followings key={i} item={item} />


                            )

                        })
                }
            </div>

        </div>
    )
}

export default Search
