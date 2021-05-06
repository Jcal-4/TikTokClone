import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getUserFollowing} from '../../store/following'

import './Narbars.css'

function LeftNavBar() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const following = useSelector(state => state.following)

    useEffect(() =>{
      if(user){
        dispatch(getUserFollowing(user.id))
      }
    },[dispatch])


  return (
    <nav className="left_navbar">
      <div>
        <h1>Following!</h1>
      </div>
      <div>
        <h1>These are the people I follow!</h1>
        <ul>
            {following.length > 0 && following.map((following) => (
                <div>
                    {following.username}
                </div>
            ))}
        </ul>
      </div>
    </nav>
  );
}

export default LeftNavBar;
