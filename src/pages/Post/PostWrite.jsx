import React, { useState, useEffect } from 'react';
import MDEditor from '../../components/InputField/MDEditor';
import '../../assets/pages/Post/PostWrite.css'
import { useNavigate } from "react-router-dom";
import { marked } from "marked";
import axios from "axios";
import TitleInput from '../../components/InputField/TitleInput';
import CategorySelect from '../../components/InputField/CategorySelect';
import DefaultButton from '../../components/Button/DefaultButton';

const PostWrite = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [categories, setCategories] = useState([]);
  const CATEGORY_API= process.env.REACT_APP_CATEGORY_API ?? '';

  const navigate = useNavigate();

  
  const changeTitleHandler = (event) => {
    setTitle(String(event.target.value));
  }
  const changeCategoryHandler = (event) => {
    setSelectedCategory(event.target.value);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    const previewContent = marked(content).replace(/<[^>]*>?/g, '');
    const regex = /!\[.*\]\((.*)\)/g;
    const fileList = [];

    let file;
    const exts = [];
    while ((file = regex.exec(content)) !== null) {
      const uuid = file[1].substring(file[1].lastIndexOf('/') + 1, file[1].lastIndexOf('.'));
      const ext = file[1].substring(file[1].lastIndexOf('.') + 1);
      exts.push(ext);
      fileList.push(uuid);
    }

    const data = {
      categoryId: selectedCategory,
      title: title,
      content: content,
      previewContent: previewContent,
      thumbnail: fileList.length > 0 ? `${fileList[0]}.${exts[0]}` : null,
      fileList: fileList,
      visible: true,
    }
    axios.post(process.env.REACT_APP_POST_API, data)
        .then(response => {
          alert('포스트를 성공적으로 저장하였습니다.');
          navigate('/post');
        })
        .catch(error => {
          alert('포스트 저장에 실패하였습니다.');
          console.log(`Error: ${error}`);
        })
  }

  useEffect(() => {
    const getCategories = async() => {
      const { data } = await axios.get(CATEGORY_API);
      setCategories(data);
    }
    getCategories();
  }, []);

  return (
    <div className='container'>
      <React.Fragment>
        <div className='edtior-container'>
          <TitleInput title={title} changeTitleHandler={changeTitleHandler} />
          <CategorySelect categories={categories} selectedCategory={selectedCategory} changeCategoryHandler={changeCategoryHandler} />
          <MDEditor content={content} setContent={setContent} />
          <div className='btn-container'>
            <DefaultButton text='나가기' 
            onClickHandler={() => {
              navigate('/post');
            }
            } />
            <DefaultButton text='포스트 저장'
            onClickHandler={submitHandler} />
          </div>
        </div>
      </React.Fragment>
    </div>
  );
};

export default PostWrite;