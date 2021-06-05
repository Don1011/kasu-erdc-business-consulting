import { Form } from 'react-bootstrap';
import {CKEditor} from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const RichTextEditorInput = ({ stateValue, onStateValueChange, title, formText, controlId }) => {
    return (
        <Form.Group className = "py-3" controlId = {controlId}>
            <Form.Label className = "font-weight-bold d-block">{title}</Form.Label>
            <Form.Text className = "text-muted">{formText}</Form.Text>
            <CKEditor
                editor = {ClassicEditor}
                data = {stateValue}
                onChange = {onStateValueChange}
                style = {{
                    height: '200px'
                }}
                config = {{
                    toolbar: {
                        items: [
                            'heading',
                            '|',
                            'bold',
                            'italic',
                            '|',
                            'bulletedList',
                            'numberedList',
                            'indent',
                            'outdent',
                            '|',
                            'undo',
                            'redo'
                        ]
                    }
                }}
            />
        </Form.Group>
    )
}

export default RichTextEditorInput
