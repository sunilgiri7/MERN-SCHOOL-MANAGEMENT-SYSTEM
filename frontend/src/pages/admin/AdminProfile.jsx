import { Avatar } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const ProfileContainer = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 24px;
  max-width: 400px;
  margin: 0 auto;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 16px;
`;

const ProfileInfo = styled.div`
  font-family: Arial, sans-serif;
  color: #333;
`;

const ProfileName = styled.h2`
  font-size: 24px;
  margin-bottom: 8px;
`;

const ProfileDetail = styled.p`
  font-size: 16px;
  margin-bottom: 4px;
`;

const AdminProfile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <ProfileContainer>
      <ProfileInfo>
        <Avatar alt="Admin Avatar" sx={{ width: 150, height: 150 }}>
          {String(currentUser.name).charAt(0)}
        </Avatar>
        <ProfileName>{currentUser.name}</ProfileName>
        <ProfileDetail>Email: {currentUser.email}</ProfileDetail>
        <ProfileDetail>School: {currentUser.schoolName}</ProfileDetail>
      </ProfileInfo>
    </ProfileContainer>
  );
};

export default AdminProfile;
