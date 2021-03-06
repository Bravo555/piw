import { TextareaHTMLAttributes, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Group from "../types/Group";
import Student from "../types/Student";

const SendMessage = ({ getRecepient }: { getRecepient: (type: string, name: string) => Student | Group | null }) => {
  const subjectInput = useRef<HTMLInputElement>(null);
  const bodyInput = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    subjectInput.current?.focus();
  }, [])

  const handleSubmit = (e: any) => {
    e.preventDefault();
    window.history.back();
  }

  const { recepientType, recepientName } = useParams();
  if (recepientType && recepientName) {
    const recepient: Group | Student | null = getRecepient(recepientType, recepientName);
    const type = recepientType === 'group' ? 'Grupa' :
      recepientType === 'student' ? 'student' : null;

    return (
      recepient ?
        <div className="wrapper">
          <h2> Wyślij wiadomość do:</h2>
          <h3>{type} {recepient.name}</h3>

          <form className="form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="subject">Temat</label>
              <input type="text" id="subject" ref={subjectInput} />
            </div>
            <div>
              <label htmlFor="message">Wiadomość</label>
            </div>
            <div>
              <textarea id="message" ref={bodyInput} className="message_textbox" />
            </div>
            <div>
              <input type="submit" value="Wyślij wiadomość" />
            </div>
          </form>
        </div>
        :
        <div className="wrapper">
          <div>Nie znaleziono takiego studenta/grupy!</div>
        </div>
    );
  }

  return (
    <div className="wrapper">
      Zły request! /sendmessage/:type/:id
    </div>
  )
};

export default SendMessage;
