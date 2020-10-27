import * as React from "react";
import State from "../../../interfaces/State";
import lang from "../../../language.json";
import Field from "../../../interfaces/Field";
import AlertMessage from "../../alert-message";
import { connect } from "react-redux";
import Modal, { XButton } from "..";
import { createWrittenWarning } from "../../../lib/actions/officer";

interface Props {
  error: string;
  createWrittenWarning: (data: {
    name: string;
    officer_name: string;
    infractions: string;
    postal: string;
    notes: string;
  }) => void;
}

const CreateWrittenWarningModal: React.FC<Props> = ({ error, createWrittenWarning }) => {
  const [name, setName] = React.useState("");
  const [officerName, setOfficerName] = React.useState("");
  const [infractions, setInfractions] = React.useState("");
  const [postal, setPostal] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [submit, setSubmit] = React.useState(false);
  const btnRef = React.createRef<HTMLButtonElement>();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    createWrittenWarning({
      name,
      officer_name: officerName,
      infractions,
      postal,
      notes,
    });
    setSubmit((o) => !o);
  }

  React.useEffect(() => {
    console.log(error);

    if (!error) {
      setNotes("");
      setName("");
      setInfractions("");
      setPostal("");
      setNotes("");
      setOfficerName("");

      btnRef.current?.click();
    }
  }, [submit]);

  const fields: Field[] = [
    {
      type: "text",
      id: "written_warning_name",
      label: lang.record.enter_full_name,
      onChange: (e) => setName(e.target.value),
      value: name,
    },
    {
      type: "text",
      id: "officer_name",
      label: lang.record.officer_name,
      onChange: (e) => setOfficerName(e.target.value),
      value: officerName,
    },
    {
      type: "text",
      id: "infractions",
      label: lang.record.infractions,
      onChange: (e) => setInfractions(e.target.value),
      value: infractions,
    },
    {
      type: "text",
      id: "postal",
      label: lang.record.postal,
      onChange: (e) => setPostal(e.target.value),
      value: postal,
    },
    {
      type: "text",
      id: "notes",
      label: lang.global.notes,
      onChange: (e) => setNotes(e.target.value),
      value: notes,
    },
  ];

  return (
    <Modal size="lg" id="createWrittenWarningModal">
      <div className="modal-header">
        <h5 className="modal-title">{lang.global.create_written_warning}</h5>
        <XButton ref={btnRef} />
      </div>

      <form onSubmit={onSubmit}>
        <div className="modal-body">
          {error ? <AlertMessage type="warning" message={error} /> : null}
          {fields.map((field: Field, idx: number) => {
            return (
              <div id={`${idx}`} key={idx} className="form-group">
                <label htmlFor={field.id}>{field.label}</label>
                <input
                  className="form-control bg-secondary border-secondary text-light"
                  type={field.type}
                  id={field.id}
                  onChange={field.onChange}
                  value={field.value}
                  list={`${field.id}-list`}
                />
              </div>
            );
          })}
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal">
            {lang.global.cancel}
          </button>
          <button type="submit" className="btn btn-primary">
            {lang.global.create_written_warning}
          </button>
        </div>
      </form>
    </Modal>
  );
};

const mapToProps = (state: State) => ({
  error: state.officers.error,
});

export default connect(mapToProps, { createWrittenWarning })(CreateWrittenWarningModal);
