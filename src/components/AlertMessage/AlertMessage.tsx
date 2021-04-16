import * as React from "react";
import { connect } from "react-redux";
import { Message } from "types/Message";

interface Props {
  message: Message | null;
  dismissible?: boolean;
}

const AlertMessageC: React.FC<Props> = ({ message }) => {
  return message === null ? null : (
    <div className={`alert alert-${message?.type} `} role="alert">
      {message?.msg}
    </div>
  );
};

export const DismissAlertBtn: React.FC<{ onClick: any }> = ({ onClick }) => {
  return <button type="button" className="btn-close" aria-label="Close" onClick={onClick}></button>;
};

export const AlertMessage = connect(null)(AlertMessageC);