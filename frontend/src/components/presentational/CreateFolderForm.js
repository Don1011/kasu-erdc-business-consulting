import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import NormalInputField from './NormalInputField';
import RichTextEditorInput from './RichTextEditorInput';
import AlertComp from './AlertComp';

const CreateFolderForm = () => {
    const [ cookies ] = useCookies(['loggedInUserToken'])

    const history = useHistory();

    // States for the alert
    const [[showAlert, setShowAlert], [alertMessage, setAlertMessage], [alertVariant, setAlertVariant]] = [useState(false), useState(""), useState("")];

    // state to handle client's full name
    const [ fullname, setFullname ] = useState('');
    // state to handle client's age
    const [ age, setAge ] = useState('');
    // state to handle client's email address
    const [ email, setEmail ] = useState('');
    // state to handle client's mobile number
    const [ mobileNumber, setMobileNumber ] = useState('');
    // state to handle client's business name
    const [ businessName, setBusinessName ] = useState('');
    // state to handle client's primary analysis tool
    const [ pat, setPat ] = useState('');
    // state to handle additional notes
    const [ an, setAn ] = useState('');
    // state to handle secondary analysis tool
    const [ sat, setSat ] = useState('');
    // state to mini contract
    const [ mc, setMc ] = useState('');
    // state to handle recommended support activities
    const [ rsa, setRsa ] = useState('');
    // state to handle negotiation and agreement
    const [ naa, setNaa ] = useState('');
    // state to handle feedback/follow up
    const [ ffu, setFfu ] = useState('');
    

    // function to handle client's full name change
    const onChangeFullName = e => setFullname(e.target.value);
    // function to handle client's age change
    const onChangeAge = e => setAge(e.target.value);
    // function to handle client's email change
    const onChangeEmail = e => setEmail(e.target.value);
    // function to handle client's mobile number change
    const onChangeMobileNumber = e => setMobileNumber(e.target.value);
    // function to handle client's mobile number change
    const onChangeBusinessName = e => setBusinessName(e.target.value);
    // function to handle primary analysis tool change
    const onChangePat = (e, editor) => setPat(editor.getData());
    // function to handle additional notes change
    const onChangeAn = (e, editor) => setAn(editor.getData());
    // function to handle secondary analysis tool change
    const onChangeSat = (e, editor) => setSat(editor.getData());
    // function to handle mini contract change
    const onChangeMc = (e, editor) => setMc(editor.getData());
    // function to handle recommended support activities change
    const onChangeRsa = (e, editor) => setRsa(editor.getData());
    // function to handle negotiation and agreement change
    const onChangeNaa = (e, editor) => setNaa(editor.getData());
    // function to handle feedback/follow up change
    const onChangeFfu = (e, editor) => setFfu(editor.getData());

    // function to show alerts
    const returnAlert = () => {
        if(showAlert){
            return (
                <AlertComp
                    close = {() => setShowAlert(false)}
                    variant = {alertVariant}
                    message = {alertMessage}
                />
            )
        }
    }

    // function to display alerts
    const displayAlert = (message, variant, showState) => {
        setAlertMessage(message);
        setAlertVariant(variant);
        setShowAlert(showState);
        window.scrollTo(0, 0);
    }
    
    const handleSubmit = e => {
        e.preventDefault();

        if(fullname !== "" && age !== "" && email !== "" && mobileNumber !== "" && businessName !== "" && pat !== "" && an !== "" && sat !== "" && mc !== "" && rsa !== "" && naa !== "" ){
            // setFfu((ffu==="")?[]:ffu);
            const newClient = { fullname, age, email, mobileNumber, businessName, pat, an, sat, mc, rsa, naa, ffu };

            fetch(`${process.env.REACT_APP_BACKEND_HOST}/get-admin/`, {
                method: "GET",
                headers: {
                    'content-type':'application/json',
                    'Authorization' : cookies['loggedInUserToken']
                }
            })
            .then(res => res.json())
            .then(adminData => {
                // console.log(adminData)
                fetch(`${process.env.REACT_APP_BACKEND_HOST}/create-folder/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization' : cookies['loggedInUserToken']
                    },
                    body: JSON.stringify({
                        ...newClient,
                        admin : {
                            id: adminData.data._id,
                            fullName: adminData.data.fullName,
                            email: adminData.data.email,
                            bdsp: adminData.data.bdsp
                        }
                    })
                })
                .then(res => res.json())
                .then(data => {
                    if(data.success){
                        const newID = data.data._id;

                        history.push(`/folder-details/${newID}`)

                    }else{
                        displayAlert(data.message, "danger", true)
    
                    }
                })
                .catch(err => {
                    displayAlert(`Error submitting form because: ${err}`, "danger", true)
                })

            })

        }else{
            displayAlert("Finish filling the form before submitting.", "danger", true)
        }

    }
    
    return (
        <div>
            <Form onSubmit = { handleSubmit }>
                {returnAlert()}

                <NormalInputField 
                    stateValue = {fullname} onStateValueChange = {onChangeFullName} title = "Full name." type = "text" formText = "Enter client's full name here." controlId = "clientFullName"
                />
                
                <NormalInputField 
                    stateValue = {age} onStateValueChange = {onChangeAge} title = "Age." type = "number" formText = "Enter client's age here." controlId = "clientAge"
                />
                
                <NormalInputField 
                    stateValue = {email} onStateValueChange = {onChangeEmail} title = "Email address." type = "email" formText = "Enter client's email address here." controlId = "clientEmail"
                />

                <NormalInputField 
                    stateValue = {mobileNumber} onStateValueChange = {onChangeMobileNumber} title = "Mobile number." type = "text" formText = "Enter client's mobile number here." controlId = "clientMobileNumber"
                />

                <NormalInputField 
                    stateValue = {businessName} onStateValueChange = {onChangeBusinessName} title = "Business name." type = "text" formText = "Enter client's business name here." controlId = "clientBusinessName"
                />
                
                <RichTextEditorInput 
                    stateValue = {pat} onStateValueChange = {onChangePat} title = "Primary analysis tool." formText = "Ask the client to make his/her generic problem statement." controlId = "pat"
                />

                <RichTextEditorInput 
                    stateValue = {an} onStateValueChange = {onChangeAn} title = "Additional notes." formText = "" controlId = "an"
                />

                <RichTextEditorInput 
                    stateValue = {sat} onStateValueChange = {onChangeSat} title = "Secondary analysis tool." formText = "Use the diagnostic template to ask questions for deeper understanding of the primary case." controlId = "sat"
                />
                
                <RichTextEditorInput 
                    stateValue = {mc} onStateValueChange = {onChangeMc} title = "Mini contract." formText = "" controlId = "mc"
                />
                
                <RichTextEditorInput 
                    stateValue = {rsa} onStateValueChange = {onChangeRsa} title = "Recommended support activities." formText = "Use this support activities sheet to recommend scope of the service to help client resolve the problem." controlId = "rsa"
                />
                
                <RichTextEditorInput 
                    stateValue = {naa} onStateValueChange = {onChangeNaa} title = "Negotiation and agreement on scope of support and pricing." formText = "" controlId = "naa"
                />
                
                <RichTextEditorInput 
                    stateValue = {ffu} onStateValueChange = {onChangeFfu} title = "Feedback/follow up." formText = "" controlId = "ffu"
                />
                
                <div className="text-center">
                    <Button variant = "light" type = "submit" className = "secondary-bg">Create</Button>
                </div>
            </Form>
        </div>
    )
}
export default CreateFolderForm