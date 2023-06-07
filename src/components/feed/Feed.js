import React, { useEffect } from 'react'
import './feed.scss'
import Post from '../posts/Post'
import { useDispatch, useSelector } from 'react-redux';
import { getFeedData } from '../../redux/slices/feedSlice';
import Followings from '../followings/Followings';


function Feed() {



  const feedData = useSelector(state => state.feedReducer.feedData);

  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(getFeedData())

  }, [dispatch])





  return (
    <div className='feed'>
      <div className="container">
        <div className="left-part">

          {
            feedData?.posts?.map((item, i) => {

              return (
                <div key={i} className="each-post">
                  <Post key={i} post={item} />

                </div>

              )

            })
          }

        </div>
        {/* {
          isSearching &&
          <div className="mid">
            <Search />
          </div>
        } */}

        <div className="right-part">

          <div className="followings">
            <h2 id="followings-h2">
              Followings
            </h2>

            {
              feedData?.followings?.map((item, i) => {
                return (

                  <Followings key={i} item={item} />


                )

              })
            }





          </div>



          <div className="suggestions">
            <h2 id="suggestions-h2">
              Suggestions for you
            </h2>


            {
              feedData?.suggestions?.map((item, i) => {
                return (
                  <Followings key={i} item={item} />

                )

              })
            }




          </div>




        </div>
      </div>


    </div>
  )
}

export default Feed
