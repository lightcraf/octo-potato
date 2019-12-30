import React from "react";
import "./Upload.scss";

function Upload() {
    return (
        <form className="upload-form">

            <label htmlFor="item-title">Title</label>
            <input type="text" id="item-title" className="upload-form__input form-control" maxLength="110" title="The maximum length of this field is 110 characters" required />

            <label htmlFor="item-type">Type</label>
            <select id="item-type" className="upload-form__select form-control">
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

            <label htmlFor="item-description">Description</label>
            <textarea id="item-description" className="upload-form__description form-control" maxLength="1000" title="The maximum length of this field is 1000 characters" required></textarea>

            <label htmlFor="img-url-1">Main image</label>
            <input type="file" id="img-url-1" className="upload-form__input form-control" accept="image/*"
                title="Allowed file types: jpeg, jpg, png, gif, bmp, tiff" required />

            <label htmlFor="img-url-2">Second image</label>
            <input type="file" id="img-url-2" className="upload-form__input form-control" accept="image/*"
                title="Allowed file types: jpeg, jpg, png, gif, bmp, tiff" required />

            <label htmlFor="img-url-3">Third image</label>
            <input type="file" id="img-url-3" className="upload-form__input form-control" accept="image/*"
                title="Allowed file types: jpeg, jpg, png, gif, bmp, tiff" required /><br />

            {/* <span className="error-1">The maximum lenght of the title field is 110 characters.</span>
                <span className="error-2">The maximum lenght of the description field is 1000 characters.</span>
                <span className="error-3">Incorrect file type</span> */}

            <button type="submit" className="upload-btn">Upload</button>
            {/* <button type="button" id="close-upload-btn-2" className="upload-form-btn upload-cancel-btn">Cancel</button> */}
        </form>
    );
}

export default Upload;