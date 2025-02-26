import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import styled from "styled-components/native";
import { ClubApi, ClubUpdateRequest, ClubUpdateResponse } from "../../api";
import CustomText from "../../components/CustomText";
import CustomTextInput from "../../components/CustomTextInput";
import { ClubEditIntroductionProps } from "../../Types/Club";

const Container = styled.SafeAreaView`
  flex: 1;
`;

const MainView = styled.ScrollView``;

const Content = styled.View`
  padding: 20px;
  margin-bottom: 50px;
`;
const ContentItem = styled.View`
  width: 100%;
  flex: 1;
  margin-bottom: 30px;
`;

const Item = styled.View`
  width: 100%;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ItemTitle = styled(CustomText)`
  font-size: 10px;
  line-height: 16px;
  color: #b0b0b0;
  margin-bottom: 8px;
`;

const ItemText = styled(CustomText)`
  font-size: 9px;
  line-height: 15px;
  padding: 8px 0px;
  color: #8c8c8c;
`;

const ShortDescInput = styled(CustomTextInput)`
  width: 100%;
  font-size: 12px;
  line-height: 17px;
  padding: 8px;
  background-color: #f3f3f3;
  text-align: center;
`;

const LongDescInput = styled(CustomTextInput)`
  width: 100%;
  height: 300px;
  font-size: 12px;
  line-height: 20px;
  padding: 12px;
  background-color: #f3f3f3;
`;

const ClubEditIntroduction: React.FC<ClubEditIntroductionProps> = ({
  navigation: { navigate, setOptions, goBack },
  route: {
    params: { clubData },
  },
}) => {
  const token = useSelector((state) => state.AuthReducers.authToken);
  const toast = useToast();
  const [clubShortDesc, setClubShortDesc] = useState(clubData.clubShortDesc ?? "");
  const [clubLongDesc, setClubLongDesc] = useState(clubData.clubLongDesc ?? "");
  const mutation = useMutation(ClubApi.updateClub, {
    onSuccess: (res) => {
      if (res.status === 200 && res.resultCode === "OK") {
        toast.show(`저장이 완료되었습니다.`, {
          type: "success",
        });
        navigate("ClubManagementMain", { clubData: res.data, refresh: true });
      } else {
        console.log(`mutation success but please check status code`);
        console.log(`status: ${res.status}`);
        console.log(res);
        toast.show(`Error Code: ${res.status}`, {
          type: "error",
        });
      }
    },
    onError: (error) => {
      console.log("--- Error ---");
      console.log(`error: ${error}`);
      toast.show(`Error Code: ${error}`, {
        type: "error",
      });
    },
    onSettled: (res, error) => {},
  });

  useEffect(() => {
    setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={save}>
          <CustomText style={{ color: "#2995FA", fontSize: 14, lineHeight: 20 }}>저장</CustomText>
        </TouchableOpacity>
      ),
    });
  }, [clubShortDesc, clubLongDesc]);

  const save = () => {
    const updateData: ClubUpdateRequest = {
      data: {
        clubShortDesc,
        clubLongDesc,
      },
      token,
      clubId: clubData.id,
    };

    console.log(updateData);

    mutation.mutate(updateData);
  };

  return (
    <Container>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={10} style={{ flex: 1 }}>
        <MainView>
          <Content>
            <ContentItem>
              <ItemTitle>간단 소개</ItemTitle>
              <ShortDescInput
                placeholder="36자 이내로 간단 소개글을 적어주세요."
                value={clubShortDesc}
                textAlign="center"
                multiline={true}
                maxLength={36}
                textAlignVertical="center"
                onChangeText={(value: string) => setClubShortDesc(value)}
              />
              <ItemText>ex) 매일 묵상훈련과 책모임을 함께하는 '경청'입니다!</ItemText>
            </ContentItem>

            <ContentItem>
              <ItemTitle>상세 소개</ItemTitle>
              <LongDescInput
                placeholder="모임의 상세 소개글을 적어주세요."
                value={clubLongDesc}
                textAlign="left"
                multiline={true}
                maxLength={1000}
                textAlignVertical="top"
                onChangeText={(value: string) => setClubLongDesc(value)}
              />
            </ContentItem>
          </Content>
        </MainView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default ClubEditIntroduction;
