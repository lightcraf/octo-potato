import React, { useState, useEffect } from "react";
import "./AddContent.scss";

function AddContent() {
    const [errors, setErrors] = useState({
        titleError: false,
        descriptionError: false,
        typeError: false,
        genreError: false,
        fileError: false
    });
    const [formSuccess, setFormSuccess] = useState(false);

    useEffect(() => {
        document.title = "Add new";
    }, []);

    const addContent = (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        let type = "";

        for (let i = 0; i < form.length; i++) {
            if (form[i].id === "add-content-genre") {
                type = form[i].options[form[i].selectedIndex].parentNode.label.toLowerCase();
            }
        }

        formData.append("type", type);

        const itemValid = [];

        for (let [key, value] of formData.entries()) {
            if (key === "title") {
                if (value.trim().length === 0 || value.trim().length > 100) {
                    setErrors(prevState => ({ ...prevState, titleError: true }));
                    itemValid.push(false);
                } else {
                    setErrors(prevState => ({ ...prevState, titleError: false }));
                }
            } else if (key === "description") {
                if (value.trim().length === 0 || value.trim().length > 1000) {
                    setErrors(prevState => ({ ...prevState, descriptionError: true }));
                    itemValid.push(false);
                } else {
                    setErrors(prevState => ({ ...prevState, descriptionError: false }));
                }
            } else if (key === "type") {
                if (value.trim().length === 0) {
                    setErrors(prevState => ({ ...prevState, typeError: true }));
                    itemValid.push(false);
                } else {
                    setErrors(prevState => ({ ...prevState, typeError: false }));
                }
            } else if (key === "genre") {
                if (value.trim().length === 0) {
                    setErrors(prevState => ({ ...prevState, genreError: true }));
                    itemValid.push(false);
                } else {
                    setErrors(prevState => ({ ...prevState, genreError: false }));
                }
            } else if (key === "poster") {
                if (value.type !== "image/png" && value.type !== "image/jpg" && value.type !== "image/jpeg") {
                    setErrors(prevState => ({ ...prevState, fileError: true }));
                    itemValid.push(false);
                } else {
                    setErrors(prevState => ({ ...prevState, fileError: false }));
                }
            } else if (key === "secondImg") {
                if (value.type !== "image/png" && value.type !== "image/jpg" && value.type !== "image/jpeg") {
                    setErrors(prevState => ({ ...prevState, fileError: true }));
                    itemValid.push(false);
                } else {
                    setErrors(prevState => ({ ...prevState, fileError: false }));
                }
            } else if (key === "thirdImg") {
                if (value.type !== "image/png" && value.type !== "image/jpg" && value.type !== "image/jpeg") {
                    setErrors(prevState => ({ ...prevState, fileError: true }));
                    itemValid.push(false);
                } else {
                    setErrors(prevState => ({ ...prevState, fileError: false }));
                }
            }
        }

        const isFormInvalid = itemValid.some((item) => item === false);

        if (isFormInvalid) {
            return;
        } else {
            fetch("/api/add", {
                method: "POST",
                credentials: "include",
                body: formData
            })
                .then(res => res.json())
                .then(result => {
                    if (result.hasOwnProperty("errors")) {
                        setErrors( prevState => ({ 
                            ...prevState, 
                            titleError : result.errors.titleError, 
                            descriptionError : result.errors.descriptionError,
                            typeError: result.errors.typeError,
                            genreError: result.errors.genreError,
                            fileError: result.errors.fileError 
                        }));
                    } else if (result.status === 200) {
                        form.reset();
                        setFormSuccess(true);
                    }
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <form className="add-content-form" encType="multipart/form-data" onSubmit={addContent}>
            {formSuccess ? <p className="add-content-success">Form is successfully submitted. Thank you!</p> : null}
            <label htmlFor="add-content-title">Title</label>
            <input
                type="text"
                id="add-content-title"
                name="title"
                className={"add-content-form__input form-control" + (errors.titleError ? " error" : "")}
                maxLength="110"
                title="The maximum length of this field is 110 characters" />

            <label htmlFor="add-content-genre">Genre</label>
            <select
                id="add-content-genre"
                name="genre"
                className={"add-content-form__select form-control" + (errors.genreError ? " error" : "")}>
                <optgroup label="Video">
                    <option value="action">Action</option>
                    <option value="drama">Drama</option>
                    <option value="sci-fi">Sci-fi</option>
                </optgroup>
                <optgroup label="Book">
                    <option value="cookbook">Cookbooks</option>
                    <option value="romance">Romance</option>
                    <option value="science">Science</option>
                </optgroup>
            </select>

            <label htmlFor="add-content-description">Description</label>
            <textarea
                id="add-content-description"
                className={"add-content-form__description form-control" + (errors.descriptionError ? " error" : "")}
                name="description"
                maxLength="1000"
                title="The maximum length of this field is 1000 characters">
            </textarea>

            <label htmlFor="add-content-poster">Poster</label>
            <input
                type="file"
                id="add-content-poster"
                name="poster"
                className={"add-content-form__input form-control" + (errors.fileError ? " error" : "")}
                accept="image/png, image/jpeg, image/jpg"
                title="Allowed file types: jpeg, jpg, png" />

            <label htmlFor="add-content-img1">Second image</label>
            <input
                type="file"
                id="add-content-img1"
                className={"add-content-form__input form-control" + (errors.fileError ? " error" : "")}
                name="secondImg" accept="image/png, image/jpeg, image/jpg"
                title="Allowed file types: jpeg, jpg, png" />

            <label htmlFor="add-content-img2">Third image</label>
            <input
                type="file"
                id="add-content-img2"
                className={"add-content-form__input form-control" + (errors.fileError ? " error" : "")}
                name="thirdImg"
                accept="image/png, image/jpeg, image/jpg"
                title="Allowed file types: jpeg, jpg, png" />

            {errors.titleError ? <span className="add-content-error">The maximum lenght of the title field is 110 characters.</span> : null}
            {errors.descriptionError ? <span className="add-content-error">The maximum lenght of the description field is 1000 characters.</span> : null}
            {errors.typeError ? <span className="add-content-error">Incorrect content type.</span> : null}
            {errors.genreError ? <span className="add-content-error">Incorrect genre.</span> : null}
            {errors.fileError ? <span className="add-content-error">The image is invalid, or not supported. Allowed types: jpg, jpeg, png.</span> : null}
            {errors.fileSizeError ? <span className="add-content-error">The file is too large. Allowed maximum size is 5 MB.</span> : null}

            <button type="submit" className="add-content-btn">Add new</button>
        </form>
    );
}

export default AddContent;