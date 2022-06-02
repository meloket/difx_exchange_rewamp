import React from "react";
import { PageStyledAddModal } from "./styled";

export default function AddModal ({onCancel}) {
    return (
        <PageStyledAddModal>
            <div className="container">
                <div className="header">
                    Add Nominee
                    <img src="/imgs/nomination/cross.svg" alt="" onClick={onCancel}/>
                </div>
                <div className="inputContainer">
                    <div className="inputItem">
                        <div> First Name </div>
                        <div className="inpuBox">
                            <input placeholder = "Enter your first name"/>
                        </div>
                    </div>
                    <div className="inputItem">
                        <div> Last Name(Optional) </div>
                        <div className="inpuBox">
                            <input placeholder = "Enter your last name"/>
                        </div>
                    </div>
                    <div className="inputItem">
                        <div> Relationship </div>
                        <div className="inpuBox">
                            <input placeholder = "Select the relationship"/>
                        </div>
                    </div>
                </div>
            </div>
        </PageStyledAddModal>
    )
}