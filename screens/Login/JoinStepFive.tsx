import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { CommonApi } from "../../api";
import { useDispatch } from "react-redux";
import { Login } from "../../store/Actions";
import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Container = styled.View`
  width: 100%;
  height: 95%;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding-horizontal: 20px;
  padding-top: 30px;
`;

const Wrap = styled.View`
  width: 100%;
`;

const BorderWrap = styled.View`
  width: 100%;
  height: 2px;
  background-color: #d0d0d0;
`;

const Border = styled.View`
  width: 50%;
  height: 2px;
  background-color: #295af5;
`;

const AskText = styled.Text`
  color: #000000;
  font-size: 20px;
  font-weight: bold;
  margin-top: 24px;
`;

const SubText = styled.Text`
  color: #a0a0a0;
  font-size: 12px;
  margin-top: 7px;
`;

const Input = styled.TextInput`
  border-bottom-width: 1px;
  border-bottom-color: #b3b3b3;
  margin-top: 47px;
  font-size: 18px;
`;

const Button = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  background-color: #d3d3d3;
`;

const ButtonTitle = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: 700;
`;

const FieldContentView = styled.View`
  margin-top: 36px;
`;

const FieldContentLine = styled.View`
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 15px;
`;

const FieldContentText = styled.Text`
  font-size: 18px;
  margin-right: 10px;
`;

const ChoiceButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const JoinStepFive: React.FC<NativeStackScreenProps<any, "AuthStack">> = ({ navigation: { navigate } }) => {
  const goToNext = () => {
    navigate("LoginStack", {
      screen: "JoinStepSix",
    });
  };
  const [approvalMethod, setApprovalMethod] = useState<number>(0);

  return (
    <Container>
      <Wrap>
        <BorderWrap>
          <Border></Border>
        </BorderWrap>
        <AskText>성별이 어떻게 되시나요?</AskText>
        <SubText>멤버 관리와, 동명이인 구분을 위함 입니다.</SubText>
        <FieldContentView>
          <FieldContentLine>
            <ChoiceButton onPress={() => setApprovalMethod(0)} activeOpacity={0.5}>
              <FieldContentText> 남성</FieldContentText>
              {approvalMethod ? <MaterialCommunityIcons name="radiobox-blank" size={20} color="#ABABAB" /> : <MaterialCommunityIcons name="radiobox-marked" size={20} color="#295AF5" />}
            </ChoiceButton>
          </FieldContentLine>
          <FieldContentLine>
            <ChoiceButton onPress={() => setApprovalMethod(1)} activeOpacity={0.5}>
              <FieldContentText> 여성</FieldContentText>
              {approvalMethod ? <MaterialCommunityIcons name="radiobox-marked" size={20} color="#295AF5" /> : <MaterialCommunityIcons name="radiobox-blank" size={20} color="#ABABAB" />}
            </ChoiceButton>
          </FieldContentLine>
        </FieldContentView>
      </Wrap>
      <Wrap>
        <Button onPress={goToNext}>
          <ButtonTitle>다음</ButtonTitle>
        </Button>
      </Wrap>
    </Container>
  );
};

export default JoinStepFive;
