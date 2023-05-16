import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useState } from "react";
import { EditModal } from "../modals/editModal";

export function Square(props: any) {
  const imageSize = {
    width: "200px",
    heigth: "200px",
  };
    


  return (
    <div>
      <button
        data-row={props.row}
        data-col={props.col}
        id={props.tokenId}
        onClick={() => props.stateChanger(true)}
      >
        <a href={props.weburl} target="_blank" rel="noreferrer">
          <img
            style={imageSize}
            src={
              props.imgsrc
                ? props.imgsrc
                : "https://static.vecteezy.com/ti/vettori-gratis/p3/7978653-coca-cola-popular-drink-brand-logo-vinnytsia-ucraina-16-maggio-202-gratuito-vettoriale.jpg"
            }
            alt={props.alttext ? props.alttext : "Million Matic Page"}
          />
        </a>
      </button>
    </div>
  );
}

