import React, { useState } from "react";
import "./AddContent.scss";

function AddContent() {

    const addContent = (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        console.log(form);

        let type = "";
  
        for (let i = 0; i < form.length; i++) { 
            if (form[i].id === "item-type") {
                type = form[i].options[form[i].selectedIndex].parentNode.label.toLowerCase();
            }
        }

        for (var [key, value] of formData.entries()) { 
            console.log(key, value);
        }

        formData.append("type", type);

        fetch("/api/add", {
            method: "POST",
            body:formData
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
            })
            .catch(err => console.log(true));
    };


    return (
        <form className="add-content-form" encType="multipart/form-data" onSubmit={addContent}>

            <label htmlFor="item-title">Title</label>
            <input type="text" id="item-title" name="title" className="add-content-form__input form-control" maxLength="110" title="The maximum length of this field is 110 characters" required />

            <label htmlFor="item-type">Type</label>
            <select id="item-type" name="genre" className="add-content-form__select form-control">
                <optgroup label="Video">
                    <option value="action">Action</option>
                    <option value="drama">Drama</option>
                    <option value="sci-fi">Sci-fi</option>
                </optgroup>
                <optgroup label="Book">
                    <option value="cookbooks">Cookbooks</option>
                    <option value="history">History</option>
                    <option value="romance">Romance</option>
                </optgroup>
            </select>

            {/* <label htmlFor="item-description">Description</label>
            <textarea id="item-description" className="add-content-form__description form-control" maxLength="1000" title="The maximum length of this field is 1000 characters" required></textarea> */}

            <label htmlFor="img-url-1">Main image</label>
            <input type="file" id="img-url-1" name="avatar" className="add-content-form__input form-control" accept="image/*"
                title="Allowed file types: jpeg, jpg, png, gif, bmp, tiff" />

            {/* <label htmlFor="img-url-2">Second image</label>
            <input type="file" id="img-url-2" name="avatar2" className="add-content-form__input form-control" accept="image/*"
                title="Allowed file types: jpeg, jpg, png, gif, bmp, tiff" required /> */}

            {/* <label htmlFor="img-url-3">Third image</label>
            <input type="file" id="img-url-3" className="add-content-form__input form-control" accept="image/*"
                title="Allowed file types: jpeg, jpg, png, gif, bmp, tiff" required /><br /> */}

            {/* <span className="error-1">The maximum lenght of the title field is 110 characters.</span>
                <span className="error-2">The maximum lenght of the description field is 1000 characters.</span>
                <span className="error-3">Incorrect file type</span> */}

            <button type="submit" className="add-content-btn">Add new</button>
        </form>
    );
}

export default AddContent;