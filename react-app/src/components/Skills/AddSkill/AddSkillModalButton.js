import { useModal } from "../../../context/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./AddSkillModal.css"


export default function AddSkillModalButton({
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
        className="add-skill-button"
          ><FontAwesomeIcon icon={faPlus} /></button>
    );
  }
