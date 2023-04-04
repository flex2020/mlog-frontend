import React from "react";
import Editor from "@uiw/react-md-editor";

const MDEditor = ( {content, setContent} ) => {

  return (
    <div>
        <React.Fragment>
          <Editor value={content} height={650} onChange={(c) => setContent(c)} />
        </React.Fragment>
    </div>
  );
}

export default MDEditor;