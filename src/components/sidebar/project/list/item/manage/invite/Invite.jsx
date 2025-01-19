import styles from "./invite.module.css";

const Invite = () => {

  const clickHandler = () => {
    console.log("click");
  }

  return (
    <button onClick={() => clickHandler()}>+</button>
  );
}

export default Invite;