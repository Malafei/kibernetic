import './css/styleAdmin.css'
import { Formik, Form } from 'formik';
import { useEffect, useRef, useState } from "react";
import MySelectInput from '../../common/MySelectInput';
import AddGroup from '../addGroup/AddGroupPage';
import AddShedule from '../addShedue/AddShedulePage';
import DeleteGroupPage from '../deleteGroup/DeleteGroupPage';

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
        setAddSheduleVision(true);
        setEditSheduleVision(false);
        setExportSheduleVision(false);
        setDonwnloadTemplateSheduleVision(false);
        setAddNewGropVision(false);
        setDeleteGroupVision(false);
        setEditGroupVision(false);
    }

    const onEditShedule = () => {
        setAddSheduleVision(false);
        setEditSheduleVision(true);
        setExportSheduleVision(false);
        setDonwnloadTemplateSheduleVision(false);
        setAddNewGropVision(false);
        setDeleteGroupVision(false);
        setEditGroupVision(false);
    }

    const onExportShedule = () => {
        setAddSheduleVision(false);
        setEditSheduleVision(false);
        setExportSheduleVision(true);
        setDonwnloadTemplateSheduleVision(false);
        setAddNewGropVision(false);
        setDeleteGroupVision(false);
        setEditGroupVision(false);
    }

    const onDonwnloadTemplateShedule = () => {
        setAddSheduleVision(false);
        setEditSheduleVision(false);
        setExportSheduleVision(false);
        setDonwnloadTemplateSheduleVision(true);
        setAddNewGropVision(false);
        setDeleteGroupVision(false);
        setEditGroupVision(false);
    }

    const onAddNewGroup = () => {
        setAddSheduleVision(false);
        setEditSheduleVision(false);
        setExportSheduleVision(false);
        setDonwnloadTemplateSheduleVision(false);
        setAddNewGropVision(true);
        setDeleteGroupVision(false);
        setEditGroupVision(false);
    }

    const onDeleteGroup = () => {
        setAddSheduleVision(false);
        setEditSheduleVision(false);
        setExportSheduleVision(false);
        setDonwnloadTemplateSheduleVision(false);
        setAddNewGropVision(false);
        setDeleteGroupVision(true);
        setEditGroupVision(false);
    }

    const onEditGroup = () => {
        setAddSheduleVision(false);
        setEditSheduleVision(false);
        setExportSheduleVision(false);
        setDonwnloadTemplateSheduleVision(false);
        setAddNewGropVision(false);
        setDeleteGroupVision(false);
        setEditGroupVision(true);
    }


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
                        <div className='Button-div-admin' onClick={() => onAddNewGroup()}>
                            Додати нову групу
                        </div>
                        <div className='Button-div-admin' onClick={() => onDeleteGroup()}>
                            Видалити групу
                        </div>
                        <div className='Button-div-admin' onClick={() => onEditGroup()}>
                            Редагувати групу
                        </div>
                        <div onClick={() => console.log("насипав")} className='Button-div-admin'>
                            насипати хуїв у кружку
                        </div>
                        <div></div>
                    </div>
                </div>


                {addSheduleVision ?
                    <AddShedule></AddShedule>
                    :
                    <></>
                }


                {addNewGropVision ?
                    <AddGroup></AddGroup>
                    :
                    <></>
                }

                {deleteGroupVision ?
                    <DeleteGroupPage></DeleteGroupPage>
                    :
                    <></>
                }




            </div>

        </>
    )



}


export default SheduleAdminPage
