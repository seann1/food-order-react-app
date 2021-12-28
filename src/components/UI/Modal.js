import ReactDOM from "react-dom";

// import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <div>
      <div>{props.children}</div>
    </div>
  );
};
const portalElement = document.getElementById("overlays");
const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};
export { Modal, Backdrop };
