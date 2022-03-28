import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { MDBInput, MDBBtn, MDBTextArea, MDBFile } from "mdb-react-ui-kit";
import "../../../CSS/UploadForm.css";
import { MAX_DESCRIPTION_LENGTH } from "../../../ReactConstants";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../../CSS/appImage.css";
import AppData from "../../AppsPage/AppData";
import SpinnerButton from "@vlsergey/react-bootstrap-button-with-spinner";
import "./UpdateAppForm.css";

interface UpdateFormProps {
  currAppData: AppData;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
}

export default function UpdateForm({
  currAppData,
  setIsLoading,
  isLoading,
}: UpdateFormProps) {
  const [updatedImgUrl, setUpdatedImgUrl] = useState<string>("");

  const onImgUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdatedImgUrl(e.target.value);
    const img = document.getElementById("update-form-app-img");
    if (img) {
      img.style.display = "block";
    }
    formik.handleChange(e);
  };

  const formik = useFormik<any>({
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      appFile: "",
      price: "",
      description: "",
      img_url: "",
    },
    validationSchema: Yup.object({
      appFile: Yup.mixed().required("File is required"),
      price: Yup.number()
        .required("Must type number!")
        .moreThan(0, "Price must be greater than 0!")
        .typeError("Must be a number!"),
      description: Yup.string()
        .trim()
        .max(250, "Must be at most 250 characters long!")
        .required("Description cannot be empty!"),
    }),
    onSubmit: (values) => {
      console.log("Update form submitted with values: ", values);
      setIsLoading(true);

      //fetch the data
      return fetch("https://reqres.in/api/users/1")
        .then((response) => response.json())
        .then((data) => console.log(data))
        .then(() => new Promise((resolve) => setTimeout(resolve, 3000)))
        .catch((err) => {
          /*TODO*/
        })
        .finally(() => setIsLoading(false));
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    formik.submitForm();
  };

  return (
    <>
      <form id="update-form" className="row g-3" onSubmit={handleSubmit}>
        <div className={"row g-1"}>
          <MDBFile
            id="form-file-update"
            name="appFile"
            value={formik.values.appFile}
            onChange={formik.handleChange}
          />
          {formik.errors.name ? (
            <p className={"invalid-field-text"}>{formik.errors.appFile}</p>
          ) : null}
        </div>
        <div className={"row g-2"}>
          <div className="row g-2">
            <div className="col-md-2">
              <MDBInput
                value={formik.values.price}
                name="price"
                onChange={formik.handleChange}
                id="price-input"
                label="Price"
              />
              {formik.errors.price ? (
                <p className={"invalid-field-text"}>{formik.errors.price}</p>
              ) : null}
            </div>
          </div>
        </div>
        <div className="row g-2">
          <div className="col-md-6">
            <MDBTextArea
              value={formik.values.description}
              name="description"
              onChange={formik.handleChange}
              id="description-input"
              label="Description"
              rows={5}
              maxLength={MAX_DESCRIPTION_LENGTH}
            />
            {formik.errors.description ? (
              <p className={"invalid-field-text"}>
                {formik.errors.description}
              </p>
            ) : null}
          </div>
        </div>
        <div className="row g-1">
          <div id={"submit-btn-div"} className="col-md-2">
            <MDBBtn id={"submit-btn"} disabled={isLoading} type="submit">
              Upload New Version
            </MDBBtn>
          </div>
        </div>
      </form>
    </>
  );
}
