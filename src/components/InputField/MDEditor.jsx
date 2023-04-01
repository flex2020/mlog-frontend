import { useState } from "react";
import Editor from "@uiw/react-md-editor";


const MDEditor = () => {
  const [value, setValue] = useState('');

  return (
    <div>
      <Editor value={value} height={800} onChange={(v) => setValue(v)} />
    </div>
  );
}

export default MDEditor;