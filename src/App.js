import React,{useState,useEffect} from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState,convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import {ToastContainer,toast} from 'react-toastify'
import { Container,Row,Col,FormGroup, Label, Input,Button} from 'reactstrap'
import Interface from './interface'


function App({socket}) {
  const [emails,setEmails] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [message, setMessage] = useState('')
  //const inputRef = useRef()
  useEffect(() => {
    setMessage(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  },[editorState])
  const getCommaSeperatedEmails = data => {
    let emails = data.reduce((acc, val) => {
      if (val['email']) {
        acc = acc + ',' + val['email'].replace(/;/g,'')
        return acc
      }
      return acc
    }, '')
    setEmails(emails)
  }

  useEffect(() => {
    setEditorState(EditorState.createEmpty())
    socket.on('sending', msg => {
      toast.success(msg);
    })
    socket.on('sent', msg => {
      toast.success(msg)
    })
    socket.on('fail', msg => {
      toast.error(msg)
    })
  },[])

  const onEditorStateChange = editorState => {
    setEditorState(editorState)
  }

  const send = (e) => {
    e.preventDefault()
    const payload = {emails, message};
    socket.emit('send payload', payload)
  }
  return (
    <Container>
      <ToastContainer/>
     <Row className="mt-3">
       <Col>
          <Interface getCommaSeperatedEmails={getCommaSeperatedEmails}/>
      <FormGroup>
        <Label for="emails">Mails</Label>
        <Input type="textarea" name="emails" id="emails" value={emails}/>
      </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
          />
        </Col>
      </Row>
      <Button onClick={send}>Send</Button>
    </Container>
  );
}

export default App;
