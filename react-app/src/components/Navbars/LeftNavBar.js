import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserFollowing } from "../../store/following";
import { showModal, setCurrentModal } from "../../store/modal";

import UserForm from "../auth/UserForm";
import { getId } from "../../store/User";
import { getUserName } from "../../store/UserName";
import { getCategories } from "../../store/Categories";
import { videoFollowCategory } from "../../store/FollowCategory"

import "./Navbars.css";

function LeftNavBar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const following = useSelector((state) => state.following);
  const video_id= useSelector((state) => state.video.id)

  const categories = useSelector((state) => state.categories);
  const [checkedCategories, setCheckedCategories] = useState([]);

  useEffect(() => {
    if (user) {
      dispatch(getUserFollowing(user.id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      dispatch(getCategories());
    }
  }, [dispatch, user]);

  const showUserForm = (e) => {
    dispatch(getUserName(e.target.classList[0]));
    dispatch(getId(e.target.id));
    dispatch(setCurrentModal(UserForm));
    dispatch(showModal());
  };

  const onCheck = (e) => {
    let category = Number(e.target.id);
    if (e.target.checked && !checkedCategories.includes(category)) {
      checkedCategories.push(category);
    } else if (!e.target.checked && checkedCategories.includes(category)) {
      checkedCategories.splice(checkedCategories.indexOf(category), 1);
    }
  };

  const onCategoryAdd = (e) => {
    e.preventDefault();
    // const formData = new FormData();
    console.log(checkedCategories)
    dispatch(videoFollowCategory(checkedCategories, video_id))
  }

  return (
    <nav className="left_navbar">
      <div className="left_navbar_header">
        <h1>Following</h1>
      </div>
      <div>
        <form onSubmit={onCategoryAdd}>
          {categories.length > 0 &&
            categories.map((category) => (
              <div key={category.id}>
                <input
                  id={category.id}
                  type="checkbox"
                  onChange={onCheck}
                ></input>
                <label>{category.genre}</label>
              </div>
            ))}
            <button onClick={onCategoryAdd}>Add to Category</button>
        </form>
      </div>
      <div>
        {user &&
          following.length > 0 &&
          following.map((following) => (
            <div key={following.username} className="followed_name">
              <img src={following.profile_image} alt=""></img>
              <div>
                <a
                  id={following.id}
                  className={following.username}
                  onClick={showUserForm}
                >
                  @{following.username}
                </a>
              </div>
            </div>
          ))}
      </div>
    </nav>
  );
}

export default LeftNavBar;
