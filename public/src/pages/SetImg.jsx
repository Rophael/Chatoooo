import React, { useState, useEffect } from "react"; // Removed unused useEffect and other imports
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo13.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { apiRoutes } from "../utils/apiRoutes";

export default function SetImg() {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("Chat-app-user")) {
      navigate("/register");
    }
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSave = () => {
    if (!selectedImage) {
      toast.error("Please select an image", {
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    const token = localStorage.getItem("Chat-app-user");
    if (!token) {
      toast.error("Please login first", {
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    const formData = new FormData();
    formData.append("image", selectedImage);
    axios
      .post(apiRoutes.setImg, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.status === true) {
          toast.success("Image Uploaded Successfully", {
            position: "bottom-right",
            autoClose: 5000,
            pauseOnHover: true,
            draggable: true,
          });
          setTimeout(() => {
            navigate("/chat");
          }, 1000);
        } else {
          toast.error(res.data.message, {
            position: "bottom-right",
            autoClose: 5000,
            pauseOnHover: true,
            draggable: true,
          });
        }
      })
      .catch((err) => {
        toast.error("Something went wrong", {
          position: "bottom-right",
          autoClose: 5000,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

  return (
    <>
      <ImageContainer>
        <div className="title-container">
          <img src={logo} alt="logo" className="logo" />
          <p>Set Your Profile Image</p>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            id="profile-image"
            style={{ display: "none" }}
          />
          <label htmlFor="profile-image" className="image-label">
            {selectedImage ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected Profile"
                className="profile-image"
              />
            ) : (
              "Select an image"
            )}
          </label>
          {selectedImage && (
            <button onClick={handleSave} className="save-button">
              Save
            </button>
          )}
        </div>
      </ImageContainer>
      <ToastContainer />
    </>
  );
}

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;

  .title-container {
    text-align: center;
    border-radius: 3rem;
    display: flex;
    flex-direction: column;
    place-items: center;
    background-color: #fff;
    justify-content: center;
    gap: 1rem;
    height: 70%;
    width: 30%;
    .logo {
      width: 60%;
      height: 30%;
    }
    .save-button {
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  }
  .image-label {
    cursor: pointer;
    display: inline-block;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px;
  }
  .profile-image {
    max-width: 200px;
    max-height: 200px;
    height: 100%;
    width: 100%;
    display: block;
    margin-left: auto;
    margin-right: auto;
    border-radius: 50%;
    border: 2px solid #ccc;
    padding: 5px;
  }
`;
