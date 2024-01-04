
import React, { useContext, useEffect } from 'react';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';
import { Box, InputBase, styled } from '@mui/material';
import { updateFile } from '../../../service/api';
import { AccountContext } from '../../../context/AccountProvider';
import axios from 'axios';


const Container = styled(Box)`
    height: 56px;
    background: #ededed;
    display: flex;
    width: 100%;
    align-items: center;
    padding: 0 15px;
    & > *{
        margin: 5px;
        color: #54656f;
    }
`;

const Input = styled(Box)`
    background: #FFFFFF;
    border-radius: 15px;
    width: calc(94% - 100px);
`;

const Field = styled(InputBase)`
    width: 100%;
    padding: 20px;
    height: 20px;
    padding-left: 25px;
    font-size: 14px;
`;

const ClipIcon = styled(AttachFileIcon)`
    transform: rotate(40deg);
`;

const Footer = ({sendText, setValue, value, file, setFile, setImage}) => {

    const {to} = useContext(AccountContext);

    useEffect(() => {
        const getImage = async () => {
            if(file){
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

                let response = await updateFile(data);
                setImage(response.data);
            }
        }
        getImage();
    }, [file])

    const onFileChange = (e) => {
        // console.log(e);
        setFile(e.target.files[0])
        setValue(e.target.files[0].name);
    }

    const handleMouseOver = () => {
        translate();
    }

    const translate = () => {
        // curl -X POST "https://libretranslate.de/translate" -H  "accept: application/json" -H  "Content-Type: application/x-www-form-urlencoded" -d "q=hello&source=en&target=es&api_key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
    //    console.log("Captured")
        const params = new URLSearchParams();
        params.append('q', value);
        params.append('source', 'auto');
        params.append('target', to);
        params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
    
        axios.post('https://libretranslate.de/translate',params, {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }).then(res=>{
          console.log(res.data)
        //   message = res.data.translatedText
            // setFlag(true);
          setValue(res.data.translatedText);
        //   console.log(show);
        })
      };

  return (
    <Container>
        <EmojiEmotionsOutlinedIcon />
        <label htmlFor='fileInput' >
            <ClipIcon />
        </label>
        <input 
            type="file"
            id='fileInput'
            style={{display: 'none'}}
            onChange={(e) => onFileChange(e)}
        />
        <Input>
            <Field 
                placeholder='Type a message'
                onChange={(e) => setValue(e.target.value)}
                onMouseOver={handleMouseOver}
                onKeyPress= {(e) => sendText(e)}
                value = {value}
            />
        </Input>
        <MicIcon />
    </Container>
  )
}

export default Footer;