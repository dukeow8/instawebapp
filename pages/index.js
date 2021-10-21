import { useState, useEffect } from "react";

import Layout from "../components/layout";
import Stories from "../components/stories";
import FeedItem from "../components/feed-item";
import HomeRightBar from "../components/home-right-bar";
import MoreModalItems from "../components/more-modal";

import LoginUserHook from "../hooks/global_hook";
import { userService } from 'services';

export default function Home() {
  const { data, setLoginUser } = LoginUserHook();

  const [loginData, setLoginData] = useState(null);
  const [stories, setStories] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [feed, setFeed] = useState(null);
  const [users, setUsers] = useState(null);

  const updateLoginUser = (data) => {
    setLoginUser(data);
    setLoginData(data);
  };

  useEffect(() => {
    userService.getAll().then(x => setUsers(x));
    fetch("/api/loginUser")
      .then((response) => response.json())
      .then((data) => updateLoginUser(data));

    fetch("/api/feed")
      .then((response) => response.json())
      .then((data) => setFeed(data));

    fetch("/api/suggestions")
      .then((response) => response.json())
      .then((data) => setSuggestions(data));

    fetch("/api/stories")
      .then((response) => response.json())
      .then((data) => setStories(data));
  }, []);

  return (
    <>
      {loginData && (
        <Layout user={loginData}>
          <MoreModalItems />
          <div className="homepage-feed lg:mr-8 flex flex-col ">
            <Stories stories={stories} />
            {feed &&
              feed.map((item) => {
                return <FeedItem data={item} key={item.pid} />;
              })}
          </div>
          <HomeRightBar data={suggestions} />
        </Layout>
      )}
      <div className="card-body">
                <h6>login or signup</h6>
                {users &&
                    <ul>
                        {users.map(user =>
                            <li key={user.id}>{user.firstName} {user.lastName}</li>
                        )}
                    </ul>
                }
                {!users && <div className="spinner-border spinner-border-sm"></div>}
            </div>
    </>
  );
}
