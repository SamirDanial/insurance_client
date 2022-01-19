import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { EDIT_USER } from '../../../hooks/LoginAndRegister';
import { useNavigate } from "react-router-dom";
import { authActions } from '../../../../store/auth';

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth);
  const [profileToEdit, setProfileToEdit] = useState({
    _id: "",
    name: "",
    lastName: "",
  });

  const [editUser] = useMutation(EDIT_USER, {
      variables: {
          ID: profile._id,
          name: profileToEdit.name,
          lastName: profileToEdit.lastName,
          insurancePlan: profile.insurancePlan,
      },
      onCompleted: data => data
  })

  useEffect(() => {
    setProfileToEdit({
        ...profile,
        name: profile.name,
        lastName: profile.lastName,
        insurancePlan: profile.insurancePlan
    })
  }, [profile])

  const collectFormData = (e) =>
    setProfileToEdit({
      ...profileToEdit,
      [e.target.name]: e.target.value,
    });

  const onFormSubmit = (e) => {
      e.preventDefault();
    editUser().then(res => {
        dispatch(authActions.edit({
            name: res.data.editUser.name,
            lastName: res.data.editUser.lastName,
            insurancePlan: res.data.editUser.insurancePlan
        }))
        navigate('/dashboard', {replace: true});
    }).catch(error => {
        console.log(error.message);
    })
  };
  return (
    <div className="account-page">
      <div className="container">
        <div className="row">
          <div className="col-2">
            <div className="form-container">
              <div className="form-btn">
                <h2> Profile Edit Form </h2>
              </div>
              <form className="editRegForm" onSubmit={onFormSubmit}>
                <input
                  type="text"
                  name="name"
                  value={profileToEdit.name}
                  onChange={(e) => collectFormData(e)}
                  placeholder="Name"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  value={profileToEdit.lastName}
                  onChange={(e) => collectFormData(e)}
                  placeholder="Last Name"
                  required
                />

                <input type="submit" value="Saved" className="btn" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
