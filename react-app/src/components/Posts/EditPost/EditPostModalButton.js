import { useModal } from "../../../context/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from "@fortawesome/free-solid-svg-icons";


export default function EditPostModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };


  return (
    <button onClick={onClick}
        style={{ border: "none", backgroundColor: "inherit", cursor: "pointer" }}
        >{<FontAwesomeIcon icon={faPen} />} {` ${buttonText}`}</button>
  );
}
