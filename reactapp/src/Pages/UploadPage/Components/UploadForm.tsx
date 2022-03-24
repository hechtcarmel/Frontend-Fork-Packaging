import React, { useState } from "react";
import { MDBInput, MDBBtn, MDBCheckbox } from "mdb-react-ui-kit";
import "../CSS/UploadForm.css";

export default function App() {
  const [formValue, setFormValue] = useState({
    name: "",
    price: "",
    description: "",
    img_url: "",
    company: "",
  });

  const onChange = (e: any) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  return (
    <form id="upload-form" className="row g-3">
      <div className="col-md-4">
        <MDBInput
          value={formValue.name}
          name="appname"
          onChange={onChange}
          id="appname-input"
          required
          label="Application Name"
        />
      </div>
      <div className="col-md-4">
        <div className="input-group has-validation">
          <MDBInput
            type="text"
            className="form-control"
            id="company-input"
            label="Company"
            required
          />
          <div className="invalid-feedback">Please choose a username.</div>
        </div>
      </div>
      <div className="col-md-4">
        <MDBInput
          value={formValue.price}
          name="price"
          onChange={onChange}
          id="price-input"
          required
          label="Price"
        />
      </div>

      <div className="col-md-6">
        <MDBInput
          value={formValue.description}
          name="description"
          onChange={onChange}
          id="description-input"
          required
          label="Description"
        />
      </div>
      <div className="col-md-6">
        <MDBInput
          value={formValue.img_url}
          name="img_url"
          onChange={onChange}
          id="image-url-input"
          required
          label="Image URL"
        />
      </div>
      <div className="col-12">
        <MDBBtn type="submit">Submit form</MDBBtn>
      </div>
    </form>
  );
}
