import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";

const Container = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding-horizontal: 20px;
`;

const IdButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 53px;
  background-color: #ff714b;
`;

const IdTitle = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: 700;
`;

const PwButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 53px;
  border-width: 1px;
  border-color: #ff714b;
  background-color: #fff;
  margin-top: 10%;
`;

const PwTitle = styled.Text`
  color: #000;
  font-size: 18px;
  font-weight: 700;
`;

const FindLoginInfo: React.FC<NativeStackScreenProps<any, "Login">> = ({ navigation: { navigate } }) => {
  return (
    <Container>
      <IdButton>
        <IdTitle>아이디 찾기</IdTitle>
      </IdButton>
      <PwButton>
        <PwTitle>비밀번호 찾기</PwTitle>
      </PwButton>
    </Container>
  );
};

export default FindLoginInfo;
