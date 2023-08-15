import React from "react";
import onImagePasted from "../utils/onImagePasted";
import Editor from "@uiw/react-md-editor";

const MDEditor = ( {content, setContent} ) => {

  return (
    <div>
        <React.Fragment>
          <Editor 
          value={content} 
          height={865} 
          onChange={(c) => setContent(c)}
          onPaste={async (event) => {
            await onImagePasted(event.clipboardData, setContent);
          }}
          onDrop={async (event) => {
            await onImagePasted(event.dataTransfer, setContent);
          }}
          />
        </React.Fragment>
    </div>
  );
}
export default MDEditor;