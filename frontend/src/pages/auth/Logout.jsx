import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authLogout } from "../../redux/userRelated/UserSlice";
import styled from "styled-components";

const Logout = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authLogout());
    navigate("/");
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <LogoutContainer>
      <LogoutHeader>
        <h1>{currentUser.name}</h1>
        <p>Are you sure you want to log out?</p>
      </LogoutHeader>
      <LogoutButtonContainer>
        <LogoutButton primary onClick={handleLogout}>
          Log Out
        </LogoutButton>
        <LogoutButton secondary onClick={handleCancel}>
          Cancel
        </LogoutButton>
      </LogoutButtonContainer>
    </LogoutContainer>
  );
};

export default Logout;

const LogoutContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  color: #333333;
  max-width: 400px;
  margin: 0 auto;
`;

const LogoutHeader = styled.div`
  margin-bottom: 20px;
  text-align: center;

  h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    color: #666666;
  }
`;

const LogoutButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  }

  ${(props) =>
    props.primary &&
    `
    background-color: #ea0606;
    color: #ffffff;
    border: none;

    &:hover {
      background-color: #c20505;
    }
  `}

  ${(props) =>
    props.secondary &&
    `
    background-color: #f0f0f0;
    color: #333333;
    border: 1px solid #ccc;

    &:hover {
      background-color: #e0e0e0;
    }
  `}
`;
