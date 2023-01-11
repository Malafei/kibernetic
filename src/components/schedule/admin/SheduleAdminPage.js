import './css/styleAdmin.css'
import { Formik, Form } from 'formik';
import { useEffect, useRef, useState } from "react";
import MySelectInput from '../../common/MySelectInput';
import AddGroup from '../addGroup/AddGroupPage';
import AddShedule from '../addShedue/AddShedulePage';
import DeleteGroupPage from '../deleteGroup/DeleteGroupPage';
import EditGroup from '../editGroup/EditGroupPage';

const SheduleAdminPage = () => {

    const [addSheduleVision, setAddSheduleVision] = useState(false);
    const [editSheduleVision, setEditSheduleVision] = useState(false);
    const [exportSheduleVision, setExportSheduleVision] = useState(false);
    const [donwnloadTemplateSheduleVision, setDonwnloadTemplateSheduleVision] = useState(false);
    const [addNewGropVision, setAddNewGropVision] = useState(false);
    const [deleteGroupVision, setDeleteGroupVision] = useState(false);
    const [editGroupVision, setEditGroupVision] = useState(false);


    const onSubmitHandler = (values) => {

    }

    const onAddShedule = () => {
        onCloseAllWindow();
        setAddSheduleVision(true);
    }

    const onEditShedule = () => {
        onCloseAllWindow();
        setEditSheduleVision(true);
    }

    const onExportShedule = () => {
        onCloseAllWindow();
        setExportSheduleVision(true);
    }

    const onDonwnloadTemplateShedule = () => {
        onCloseAllWindow();
        setDonwnloadTemplateSheduleVision(true);
    }
    
    const onAddGroup = () => {
        onCloseAllWindow();
        setAddNewGropVision(true);
    }

    const onDeleteGroup = () => {
        onCloseAllWindow();
        setDeleteGroupVision(true);
    }

    const onEditGroup = () => {
        onCloseAllWindow();
        setEditGroupVision(true);
    }

    const onCloseAllWindow = () =>{
        setAddSheduleVision(false);
        setEditSheduleVision(false);
        setExportSheduleVision(false);
        setDonwnloadTemplateSheduleVision(false);
        setAddNewGropVision(false);
        setDeleteGroupVision(false);
        setEditGroupVision(false);
    }
    const onClose = () => onCloseAllWindow();

    return (
        <>
            <div className='Grid-wraper-admin'>
                <div key={0} className="album py-5">
                    <div className="container Title-menu-admin ">
                        <h2 className='Main-font-admin'>Панель керування</h2>
                    </div>
                    <div className="container Left-menu-admin">
                        <div className='Button-div-admin' onClick={() => onAddShedule()}>
                            Додати розклад
                        </div>
                        <div className='Button-div-admin' onClick={() => onEditShedule()}>
                            Редагувати розклад
                        </div>
                        <div className='Button-div-admin'>
                            Експортувати розклад
                        </div>
                        <div className='Button-div-admin'>  
                            Завантажити шаблон
                        </div>
                        <div className='Button-div-admin' onClick={() => onAddGroup()}>
                            Додати нову групу
                        </div>
                        <div className='Button-div-admin' onClick={() => onDeleteGroup()}>
                            Видалити групу
                        </div>
                        <div className='Button-div-admin' onClick={() => onEditGroup()}>
                            Редагувати групу
                        </div>
                        <div></div>
                    </div>
                </div>


                <AddShedule visible={addSheduleVision} onClose={onClose}/>

                <AddGroup visible={addNewGropVision} onClose={onClose}/>

                <DeleteGroupPage visible={deleteGroupVision}  onClose={onClose}/>
                
                <EditGroup visible={editGroupVision} onClose={onClose}/>




            </div>

        </>
    )



}


export default SheduleAdminPage
