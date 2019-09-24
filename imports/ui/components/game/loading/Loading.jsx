import React from "react";
import { Meteor } from "meteor/meteor";

import "./Loading.scss";

const abandonGame = (id, history) => {
  Meteor.call("games.removeUser", id);
  history.push("/hub");
};

const Loading = props => {
  const game = props.currentGame;
  const currentUser = props.currentUser;
  let users = [];
  if (game) {
    users = game.players.map((el, index) => (
      <p key={index}>
        {el.user && el.user.username ? el.user.username : "???"}
      </p>
    ));
  }

  let showButton = true;
  let remainingUsers =
    game && game.numWaitedUsers ? game.numWaitedUsers - users.length : "";

  console.log("WAITING", game, remainingUsers);
  if (remainingUsers === 1) msg = `Still waiting for ${remainingUsers} player`;
  else msg = `Still waiting for ${remainingUsers} players`;

  if (
    game &&
    (!currentUser ||
      !game.players.some(el => el.user.username === currentUser.username))
  ) {
    showButton = false;
    msg =
      "You are not part of this game, you will be redirected to the home screen";
    setTimeout(() => {
      props.history.push("/hub");
    }, 5000);
  }
  return (
    <div className='loader'>
      <div className='loader__cube'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className='loader__content'>
        <h4>{msg}</h4>
        {users}
        {showButton ? (
          <button onClick={() => abandonGame(game._id, props.history)}>
            DROP OUT
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Loading;
