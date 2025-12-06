// frontend/src/components/GapAnalysis/ControlCard.jsx
import React, { useEffect, useState } from "react";

/*
 Props:
 - control: control object from GET controls
 - response: existing response object or null
 - onChange(partial) => autosave trigger
 - onUpload(file) => uploads file to server
 - onDeleteFile(fileId) => deletes file on server
 - saving: boolean
*/

const ControlCard = ({ control, response, onChange, onUpload, onDeleteFile, saving }) => {
  // local controlled inputs to debounce notes typing
  const [selected, setSelected] = useState(response?.response || null);
  const [notes, setNotes] = useState(response?.notes || "");
  const [evidenceFiles, setEvidenceFiles] = useState(response?.evidenceFiles || []);
  const [typingTimeout, setTypingTimeout] = useState(null);

  useEffect(() => {
    setSelected(response?.response || null);
    setNotes(response?.notes || "");
    setEvidenceFiles(response?.evidenceFiles || []);
  }, [response]);

  const handleRadio = (val) => {
    setSelected(val);
    // immediate autosave for radio
    if (onChange) onChange({ response: val });
  };

  const handleNotesChange = (e) => {
    const v = e.target.value;
    setNotes(v);
    // debounce autosave 800ms after user stops typing
    if (typingTimeout) clearTimeout(typingTimeout);
    const t = setTimeout(() => {
      if (onChange) onChange({ notes: v });
    }, 800);
    setTypingTimeout(t);
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // optimistic update - we will reload via parent after upload
    if (onUpload) {
      await onUpload(file);
      // parent should refresh the response which flows back via props; so no local push
    }
    // reset input
    e.target.value = "";
  };

  const handleRemoveFile = async (fileId) => {
    if (onDeleteFile) {
      await onDeleteFile(fileId);
    }
  };

  return (
    <div className="border rounded p-4 bg-white">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold">{control.name}</h4>
          <div className="text-sm text-gray-600">{control.requirement}</div>
        </div>

        <div className="text-sm text-gray-500">
          {saving ? <span>Saving…</span> : <span>&nbsp;</span>}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-4">
        <label className={`inline-flex items-center gap-2`}>
          <input
            type="radio"
            name={`resp-${control._id}`}
            checked={selected === "YES"}
            onChange={() => handleRadio("YES")}
          />
          <span className="text-sm ml-1">YES</span>
        </label>

        <label className={`inline-flex items-center gap-2`}>
          <input
            type="radio"
            name={`resp-${control._id}`}
            checked={selected === "NO"}
            onChange={() => handleRadio("NO")}
          />
          <span className="text-sm ml-1">NO</span>
        </label>

        <label className={`inline-flex items-center gap-2`}>
          <input
            type="radio"
            name={`resp-${control._id}`}
            checked={selected === "PARTIAL"}
            onChange={() => handleRadio("PARTIAL")}
          />
          <span className="text-sm ml-1">PARTIAL</span>
        </label>
      </div>

      <div className="mt-3">
        <label htmlFor={`notes-${control._id}`} className="block text-sm font-medium">Notes</label>
        <textarea
          id={`notes-${control._id}`}
          className="w-full px-3 py-2 border rounded"
          value={notes}
          onChange={handleNotesChange}
          rows={3}
        />
      </div>

      <div className="mt-3">
        <label className="block text-sm font-medium mb-1">Evidence</label>
        <div className="flex items-center gap-3">
          <input type="file" onChange={handleFile} />
        </div>

        <div className="mt-2 space-y-2">
          {(response?.evidenceFiles || evidenceFiles || []).map((fid) => (
            <div key={fid} className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <div className="text-sm">{fid}</div>
              <div>
                <button
                  onClick={() => handleRemoveFile(fid)}
                  className="text-xs text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ControlCard;
