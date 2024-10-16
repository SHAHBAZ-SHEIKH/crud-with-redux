import React from 'react'
import './CustomModal.css'
import { useSelector } from 'react-redux'

const CustomModal = ({ id, setShowPopup }) => {

    const allData = useSelector((state) => state.app.users)
    const singleData = allData.find((item) => item.id === id)

    console.log("singleData", singleData)


    return (
        <div className='ModalBackground'>
            <div className='ModalContainer'>
                <div className='d-flex justify-content-end'>
                    <button onClick={() => setShowPopup(false)}> X</button>
                </div>
                <div className='d-flex flex-column align-items-center'>
                    <h1>{singleData.name}</h1>
                    <h2>{singleData.email}</h2>
                    <h2>{singleData.gender}</h2>
                </div>
            </div>
        </div>
    )
}

export default CustomModal
