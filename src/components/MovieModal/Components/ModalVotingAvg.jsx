import React from "react";

export default function ModalVotingAvg({ info }) {
  return (
    <div>
      {info.vote_average !== 0 && (
        <p className="modal__label">
          Voting Avg :<span className="modal__text">{info.vote_average}</span>
        </p>
      )}
    </div>
  );
}
