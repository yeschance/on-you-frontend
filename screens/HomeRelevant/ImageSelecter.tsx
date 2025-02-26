import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Alert, Keyboard, Text, TouchableWithoutFeedback, useWindowDimensions, View, Image, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

interface ValueInfo {
  str: string;
  isHT: boolean;
  idxArr: number[];
}

const Container = styled.SafeAreaView`
  flex: 1;
  padding: 0 20px 0 20px;
`;
const ImagePickerView = styled.View`
  width: 100%;
  height: 50%;
  align-items: center;
`;

const PickBackground = styled.ImageBackground`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const ImagePickerButton = styled.TouchableOpacity<{ height: number }>`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: #c4c4c4;
`;

const PickedImage = styled.Image<{ height: number }>`
  width: 100%;
  height: 100%;
`;

const ImageCrop = styled.View`
  background-color: rgba(63, 63, 63, 0.7);
  width: 142px;
  height: 142px;
  border-radius: 100px;
  opacity: 0.5;
  justify-content: center;
  top: 30%;
  left: 30%;
`;

const ImagePickerText = styled.Text`
  font-size: 10px;
  color: white;
  text-align: center;
  padding: 50px 0;
`;

const FeedText = styled.TextInput`
  margin: 13px 15px 15px 30px;
  color: black;
`;

const SelectImageView = styled.View`
  background-color: rgba(0, 0, 0, 0.7);
  height: 70px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 19px 0 19px;
`;

const SelectImage = styled.Image`
  width: 55px;
  height: 55px;
  margin: 8px;
  background-color: lightgray;
`;

const CancleIcon = styled.View`
  position: relative;
  top: -530%;
  left: 73%;
`;

const ImageSelecter: React.FC<NativeStackScreenProps> = ({ navigation: { navigate } }) => {
  const Stack = createNativeStackNavigator();
  const [refreshing, setRefreshing] = useState(false);
  //사진권한 허용
  const [imageURI, setImageURI] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  let [alert, alertSet] = useState(true);

  const getValueInfos = (value: string): ValueInfo[] => {
    if (value.length === 0) {
      return [];
    }
    const splitedArr = value.split(" ");
    let idx = 0;
    return splitedArr.map((str) => {
      const idxArr = [idx, idx + str.length - 1];
      idx += str.length + 1;
      return {
        str,
        isHT: str.startsWith("#") || str.startsWith("@"),
        idxArr,
      };
    });
  };

  //컨텐츠
  const [title, setTitle] = useState<string>("");
  const valueInfos = getValueInfos(title);

  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const imageHeight = Math.floor(((SCREEN_WIDTH * 0.8) / 16) * 9);
  const [postText, setPostText] = useState("");
  const onText = (text: React.SetStateAction<string>) => setPostText(text);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [16, 9],
      quality: 1,
    });

    if (result.cancelled === false) {
      setImageURI(result.uri);
    }
  };

  const createFinish = () => {
    Alert.alert("등록되었습니다.");
    setRefreshing(true);
    return navigate("Home");

    //홈화면 새로고침 기능 넣기
  };

  /* const onSubmit = () => {
    const data = {
      category1Id: category1,
      category2Id: category2,
      clubName,
      clubMaxMember: clubMemberCount,
      clubShortDesc: briefIntroText,
      clubLongDesc: detailIntroText,
      isApproveRequired: approvalMethod === 0 ? "N" : "Y",
    };

    const splitedURI = new String(imageURI).split("/");

    const requestData: ClubCreationRequest =
      imageURI === null
        ? {
            image: null,
            data,
            token,
          }
        : {
            image: {
              uri: imageURI.replace("file://", ""),
              type: "image/jpeg",
              name: splitedURI[splitedURI.length - 1],
            },
            data,
            token,
          };

    mutation.mutate(requestData);
  }; */

  /*    const createHomeFeed=async ()=>{
            try{
                setLoading(true);
                const response= await axios.post(
                    `http://3.39.190.23:8080/api/clubs`
                );
                setData(response.data.data)
                Alert.alert("등록되었습니다.");
                setRefreshing(true);
                return navigate("Home");
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }*/

  useEffect(() => {
    let timer = setTimeout(() => {
      alertSet(false);
    }, 3000);
  });

  /**
   * 이미지 리스트 선택하면 사진 크게보는쪽 사진뜨게
   */
  const ImageFIx = () => {};

  /** X선택시 사진 없어지는 태그 */
  const ImageCancle = () => {
    uri: imageURI === null;
    console.log(imageURI);
  };

  useEffect(() => {
    return () => setLoading(false);
  }, []);

  return (
    <Container>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <ImagePickerView>
            <ImagePickerButton height={imageHeight} onPress={pickImage} activeOpacity={1}>
              {imageURI ? (
                // <PickedImage height={imageHeight} source={{ uri: imageURI }} />
                <PickedImage height={imageHeight} source={{ uri: imageURI }} />
              ) : (
                <PickBackground>
                  {alert === true ? (
                    <ImageCrop>
                      <MaterialCommunityIcons name="arrow-top-right-bottom-left" size={30} color="red" style={{ textAlign: "center", top: 40 }} />
                      <ImagePickerText>
                        손가락을 좌우로{"\n"} 동시에 벌려{"\n"} 이미지 크롭을 해보세요
                      </ImagePickerText>
                    </ImageCrop>
                  ) : null}
                </PickBackground>
              )}
            </ImagePickerButton>
          </ImagePickerView>
          <SelectImageView>
            <TouchableOpacity onPress={ImageFIx}>
              <SelectImage source={{ uri: imageURI }} />
              <TouchableOpacity onPress={ImageCancle}>
                <CancleIcon>
                  <AntDesign name="close" size={12} color="white" />
                </CancleIcon>
              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity onPress={ImageFIx}>
              <SelectImage source={{ uri: imageURI }} />
              <TouchableOpacity>
                <CancleIcon>
                  <AntDesign name="close" size={12} color="white" />
                </CancleIcon>
              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity onPress={ImageFIx}>
              <SelectImage source={{ uri: imageURI }} />
              <TouchableOpacity>
                <CancleIcon>
                  <AntDesign name="close" size={12} color="white" />
                </CancleIcon>
              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity onPress={ImageFIx}>
              <SelectImage source={{ uri: imageURI }} />
              <TouchableOpacity>
                <CancleIcon>
                  <AntDesign name="close" size={12} color="white" />
                </CancleIcon>
              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity onPress={ImageFIx}>
              <SelectImage source={{ uri: "https://i.pinimg.com/564x/c5/09/38/c509384458795569b0788a016b0fbc06.jpg" }} />
              <TouchableOpacity>
                <CancleIcon>
                  <AntDesign name="close" size={12} color="white" />
                </CancleIcon>
              </TouchableOpacity>
            </TouchableOpacity>
            {/* <SelectImage source={{ uri: "https://i.pinimg.com/564x/a6/69/e3/a669e31fdc751d576e1b0260e60022a9.jpg" }} />
            <SelectImage source={{ uri: "https://i.pinimg.com/564x/c5/09/38/c509384458795569b0788a016b0fbc06.jpg" }} />
            <SelectImage source={{ uri: "https://i.pinimg.com/564x/9e/d8/4c/9ed84cf3fc04d0011ec4f75c0692c83e.jpg" }} />
            <SelectImage source={{ uri: "https://i.pinimg.com/564x/aa/26/04/aa2604e4c5e060f97396f3f711de37c1.jpg" }} /> */}
          </SelectImageView>
          <FeedText
            key={"FeedCreateRequest"}
            placeholder="사진과 함께 남길 게시글을 작성해 보세요."
            onChangeText={setTitle}
            textContentType="none"
            autoCompleteType="off"
            autoCapitalize="none"
            multiline={true}
          >
            {valueInfos.map(({ str, isHT, idxArr }, idx) => {
              const [firstIdx, lastIdx] = idxArr;
              let value = title.slice(firstIdx, lastIdx + 1);
              const isLast = idx === valueInfos.length - 1;
              if (isHT) {
                return (
                  <Text style={{ color: "skyblue", backgroundColor: "transparent" }}>
                    {value}
                    {!isLast && <Text style={{ backgroundColor: "transparent" }}> </Text>}
                  </Text>
                );
              }
              return (
                <Text style={{ color: "black" }}>
                  {value}
                  {!isLast && <Text> </Text>}
                </Text>
              );
            })}
          </FeedText>
          {/* <FeedText
            key={"FeedCreateRequest"}
            placeholder="사진과 함께 남길 게시글을 작성해 보세요."
            onChangeText={setTitle}
            textContentType="none"
            autoCompleteType="off"
            autoCapitalize="none"
            multiline={true}
          >
            {valueInfos.map(({ str, isHT, idxArr }, idx) => {
              const [firstIdx, lastIdx] = idxArr;
              let value = title.slice(firstIdx, lastIdx + 1);
              const isLast = idx === valueInfos.length - 1;
              if (isHT) {
                return (
                  <Text style={{ color: "skyblue", backgroundColor: "transparent" }}>
                    {value}
                    {!isLast && <Text style={{ backgroundColor: "transparent", color: "black" }}> </Text>}
                  </Text>
                );
              }
              return (
                <Text style={{ color: "black" }}>
                  {value}
                  {!isLast && <Text> </Text>}
                </Text>
              );
            })}
          </FeedText> */}
        </>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default ImageSelecter;
