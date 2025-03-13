<<<<<<< HEAD

import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = ({ input, setInput}) => {
 const handleChange = (content)=>
 {
    setInput({...input, description:content})
     }

  return <ReactQuill theme="snow" value={input.description} onChange={handleChange} />;
}
export default RichTextEditor 
=======

import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = ({ input, setInput}) => {
 const handleChange = (content)=>
 {
    setInput({...input, description:content})
     }

  return <ReactQuill theme="snow" value={input.description} onChange={handleChange} />;
}
export default RichTextEditor 
>>>>>>> 7910057a (Updated code for krinSprint3 branch)
