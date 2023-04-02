import { useState } from "react";
import Editor from "@uiw/react-md-editor";


const MDEditor = () => {
  const [content, setContent] = useState('');

  return (
    <div>
      <Editor value={content} height={650} onChange={(c) => setContent(c)} />
    </div>
  );
}

export default MDEditor;