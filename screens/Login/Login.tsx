import { useMutation, useQuery } from "react-query";
import { CommonApi, ErrorResponse, LoginRequest, LoginResponse, UserApi, UserInfoResponse } from "../../api";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { DeviceEventEmitter, Keyboard, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import { useToast } from "react-native-toast-notifications";
import { useAppDispatch } from "../../redux/store";
import { login } from "../../redux/slices/auth";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/reducers";

const Container = styled.View`
  width: 100%;
  height: 95%;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 20px;
  padding-top: 30px;
`;

const Wrap = styled.View`
  width: 100%;
`;

const Form = styled.View`
  width: 100%;
  margin-bottom: 30px;
`;

const Title = styled.Text`
  color: #1b1717;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Input = styled.TextInput`
  border-bottom-width: 1px;
  border-bottom-color: #000000;
  padding-bottom: 5px;
  font-size: 18px;
`;

const View = styled.TouchableOpacity`
  width: 100%;
  margin-top: 10px;
  padding: 0;
  /* border-bottom-width: 1px;
  border-bottom-color: #6f6f6f; */
`;

const ForgetText = styled.Text`
  width: 100%;
  color: #6f6f6f;
  font-size: 12px;
  text-decoration: underline;
`;

const LoginButton = styled.TouchableOpacity<{ disabled: boolean }>`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  background-color: ${(props: any) => (props.disabled ? "#D3D3D3" : "#ff6534")};
`;

const LoginTitle = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: 700;
`;

const Login: React.FC<NativeStackScreenProps<any, "AuthStack">> = ({ navigation: { navigate } }) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const mutation = useMutation<LoginResponse, any, LoginRequest>(CommonApi.login, {
    onSuccess: async (res) => {
      if (res.status === 200) {
        const token = res.token;
        console.log(`Login: ${token}`);
        if (token) await dispatch(login({ token }));
      } else if (res.status === 400) {
        toast.show(`아이디와 비밀번호가 잘못되었습니다.`, { type: "warning" });
      } else if (res.status === 500) {
        toast.show(`알 수 없는 오류`, { type: "warning" });
      }
    },
    onError: (error) => {
      console.log(error);
      toast.show(`네트워크를 확인해주세요.`, { type: "warning" });
    },
  });

  const goToFindLoginInfo = () => {
    navigate("LoginStack", {
      screen: "FindLoginInfo",
    });
  };

  const onSubmit = () => {
    const requestData: LoginRequest = {
      email: email.trim(),
      password,
    };

    mutation.mutate(requestData);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <Container>
        <Wrap>
          <Form>
            <Title>아이디</Title>
            <Input placeholder="example@email.com" placeholderTextColor={"#B0B0B0"} onChangeText={(text: string) => setEmail(text)} />
          </Form>
          <Form>
            <Title>비밀번호</Title>
            <Input secureTextEntry={true} placeholder="비밀번호를 입력해주세요." placeholderTextColor={"#B0B0B0"} onChangeText={(text: string) => setPassword(text)} />
            <View onPress={goToFindLoginInfo}>
              <ForgetText>로그인 정보가 기억나지 않을때</ForgetText>
            </View>
          </Form>
        </Wrap>
        <Wrap>
          <LoginButton onPress={onSubmit} disabled={!(email.trim() && password)}>
            <LoginTitle>로그인</LoginTitle>
          </LoginButton>
        </Wrap>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Login;
