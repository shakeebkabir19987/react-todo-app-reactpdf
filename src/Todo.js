import React, { useState } from "react";
import "./Todo.css";
import { useRef, useEffect } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "./PDFFile";

import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";


const Todo = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const [addData, updateData] = useState("");
  const [items, setItems] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [singleitem, setsingleitem] = useState("");

  const [showPdf, setShowPdf] = useState(undefined);

  const [records, setRecords] = useState([]);

  const handleInputChange = (e) => {
    updateData(e.target.value);
  };

  const addText = () => {
    if (addData.trim() !== "") {
      if (editingIndex === -1) {
        setItems([...items, addData]);
      } else {
        const updatedItems = [...items];
        updatedItems[editingIndex] = addData;
        setItems(updatedItems);
        setEditingIndex(-1);
      }

      updateData("");
      inputRef.current.focus();
    }
  };

  const editHandler = (index) => {
    setEditingIndex(index);
    setRecords(items[index]);
    inputRef.current.focus();
  };

  const deleteHandler = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const viewHandler = (item) => {
    // alert(index)
    setItems([]);
    setsingleitem(item);
    setShowPdf(true);
  };
  
  const pdfHandler = () => {
    // alert("pdfnew")

    items == "" ? setShowPdf(false) : setShowPdf(true);
    // setShowPdf(true);
  };

  const [layout, setLayout] = useState(undefined);

  return (
    <>
      {!showPdf ? (
        <div className="outerdiv">
          <h3 className="headingone">Welcome to Todo App</h3>
          <div className="textfield">
            <input
              type="text"
              placeholder="Add new Text"
              onChange={handleInputChange}
              value={addData}
              ref={inputRef}
            />
            <button className="btnone" onClick={addText}>
              {editingIndex === -1 ? "Add Data" : "Save"}
            </button>

            {/* pdf btn */}
            <button className="btnone" onClick={pdfHandler}>
              View Pdf
            </button>

            {/* pdf btn */}
          </div>

          <ul className="datalist">
            {items.slice(0, 8).map((item, index) => (
              <li key={index}>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={addData}
                    onChange={handleInputChange}
                  />
                ) : (
                  item
                )}
                <div className="button-group">
                  {editingIndex === index ? (
                    <button className="btnedit" onClick={() => addText(index)}>
                      Save
                    </button>
                  ) : (
                    <button
                      className="btnedit"
                      onClick={() => editHandler(index)}
                    >
                      Edit
                    </button>
                  )}

                  <button
                    className="btndelete"
                    onClick={() => deleteHandler(index)}
                  >
                    Delete
                  </button>

                  <button className="btnview" onClick={() => viewHandler(item)}>
                    View
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              color="neutral"
              onClick={() => {
                setLayout("fullscreen");
              }}
            >
              Full screen
            </Button>
          </Stack>
          <Modal open={showPdf} onClose={() => setShowPdf(undefined)}>
            <ModalDialog layout={layout} color="primary">
              <ModalClose />
              <DialogTitle style={{ fontSize: "30px", marginLeft: "560px" }}>
                Modal Dialog
              </DialogTitle>
              <DialogContent>
                <div>
                  <PDFViewer style={{ width: "100vw", height: "85vh" }}>
                    <MyDocument items={singleitem} allitems={items} />
                  </PDFViewer>
                </div>
              </DialogContent>
            </ModalDialog>
          </Modal>
        </>
      )}

      
    </>
  );
};

export default Todo;
