import React, { useContext, useState, useRef, useEffect } from 'react'
import { Modal, Button, TextField, Form, InputGroup, FormControl } from 'react-bootstrap'
import AuthContext from '@/context/AuthContext'
const LoginModal = (props) => {
    const context = useContext(AuthContext);
    let [disableVerify, setDisableVerify] = useState(0);
    const { user, login, otp, loading, verifyOTP, resetOTP, errorOTP } = context;
    let [phonenumber, setNumber] = useState(0);
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);
    useEffect(() => {
        return () => {
        }
    }, [])

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            fontFamily="Georama"
        >
            <Modal.Header className='tw-justify-center'>
                <Modal.Title id="contained-modal-title-vcenter">
                    {
                        !otp ?
                            "Phone Number Verification"
                            : <>
                                <div className='d-flex flex-row'>
                                    <div className='lg:tw--ml-40 tw-leading-10 tw-text-sm'><a href='#' onClick={() => { setNumber(0); resetOTP() }}>back</a></div>

                                    <div className='tw-ml-32'>Verify OTP</div>
                                </div>
                            </>
                    }

                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    otp ?
                        <>
                            <div className='d-flex flex-row gap-2 justify-content-center mt-4 mx-auto w-75'>
                                <div className='w-2'>
                                    <FormControl ref={ref1} id="inlineFormInputGroup1" type='number' placeholder="0" min="0" max="9" style={{ width: '50px', textAlign: 'center' }}
                                        onKeyDown={(e) => {
                                            if (e.key >= 0 && e.key <= 9) {

                                                ref1.current.value = ''

                                                setTimeout(() => { ref2.current.focus(); setDisableVerify(disableVerify += 1) }, 10)
                                            } else if (e.key === 'Backspace') {
                                                setTimeout(() => { ref1.current.focus(); setDisableVerify(disableVerify -= 1) }, 10)
                                            }
                                        }}

                                    />
                                </div>
                                <div className='w-2'>
                                    <FormControl ref={ref2} id="inlineFormInputGroup2" type='number' placeholder="0" min="0" max="9" style={{ width: '50px', textAlign: 'center' }}
                                        onKeyDown={(e) => {
                                            if (e.key >= 0 && e.key <= 9) {
                                                ref2.current.value = ''

                                                setTimeout(() => { ref3.current.focus(); setDisableVerify(disableVerify += 1) }, 10)
                                            } else if (e.key === 'Backspace') {
                                                setTimeout(() => { ref1.current.focus(); setDisableVerify(disableVerify -= 1) }, 10)
                                            }
                                        }}

                                    />
                                </div>
                                <div className='w-2'>
                                    <FormControl ref={ref3} id="inlineFormInputGroup3" type='number' placeholder="0" min="0" max="9" style={{ width: '50px', textAlign: 'center' }}
                                        onKeyDown={(e) => {
                                            if (e.key >= 0 && e.key <= 9) {
                                                ref3.current.value = ''

                                                setTimeout(() => { ref4.current.focus(); setDisableVerify(disableVerify += 1) }, 10)
                                            } else if (e.key === 'Backspace') {
                                                setTimeout(() => { ref2.current.focus(); setDisableVerify(disableVerify -= 1) }, 10)
                                            }
                                        }}

                                    />
                                </div>
                                <div className='w-2'>
                                    <FormControl ref={ref4} id="inlineFormInputGroup4" type='number' placeholder="0" min="0" max="9" style={{ width: '50px', textAlign: 'center' }}
                                        onKeyDown={(e) => {
                                            if (e.key >= 0 && e.key <= 9) {
                                                ref4.current.value = ''

                                                console.log(disableVerify)
                                                setTimeout(() => { ref4.current.focus(); setDisableVerify(disableVerify += 1) }, 10)
                                            } else if (e.key === 'Backspace') {
                                                setTimeout(() => { ref3.current.focus(); setDisableVerify(disableVerify -= 1) }, 10)
                                            }
                                            else if (e.key === 'Enter') {
                                                const otpnumber2 = `${ref1.current.value}${ref2.current.value}${ref3.current.value}${ref4.current.value}`
                                                verifyOTP(phonenumber, otpnumber2)
                                            }
                                        }}

                                    />
                                </div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <Button disabled={loading} variant="primary" className='w-50 mb-3 mt-3' onClick={() => {
                                    console.log(ref1.current.value, ref2.current.value, ref3.current.value, ref4.current.value)
                                    const otpnumber = `${ref1.current.value}${ref2.current.value}${ref3.current.value}${ref4.current.value}`
                                    verifyOTP(phonenumber, otpnumber)

                                }

                                }> {loading ? `Verifying OTP...` : `VERIFY`} </Button>
                            </div>
                            {
                                errorOTP ?
                                    <div className='d-flex justify-content-center tw-font-medium tw-text-red-600 tw-text-sm'>
                                        Expired or Invaid OTP!
                                    </div>
                                    :
                                    ""
                            }

                        </>
                        :
                        <>
                            <div className='mx-auto w-75 mt-4'>

                                <InputGroup className="mb-4">
                                    <InputGroup.Text>+91</InputGroup.Text>
                                    <FormControl pattern="\d{10}" id="inlineFormInputGroup" placeholder="Mobile Number" type='number' maxLength={10} onChange={(e) => { setNumber(e.target.value); console.log(e.target.value) }} onKeyDown={
                                        (e) => {
                                            if (e.target.value.length > 9) {
                                                e.target.value = e.target.value.slice(0, 9)
                                                return false;
                                            }
                                        }
                                    } />
                                </InputGroup>
                                <Button disabled={loading || phonenumber.length !== 10} variant="primary" className='w-100 mb-3' onClick={() => login(phonenumber)} > {loading ? `Sending SMS...` : `NEXT`}</Button>
                            </div>
                        </>
                }




            </Modal.Body>

        </Modal>
    )
}

export default LoginModal
