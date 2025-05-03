  import {
    View,
    Text,
    Dimensions,
    StatusBar,
    FlatList,
    Image,
    TouchableOpacity,
  } from "react-native";
  import React, { useEffect, useRef, useState } from "react";
  import voteImg from "../../assets/vote-img.png";
  import trustImg from "../../assets/trust-img.png";
  import securityImg from "../../assets/security-img.png";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { useNavigation } from "@react-navigation/native";

  const { width } = Dimensions.get("window");

  const slides = [
    {
      id: "1",
      title: "Welcome to Our App",
      description: "This is a brief introduction to our app and its features.",
      image: voteImg,
    },
    {
      id: "2",
      title: "Track Your Progress",
      description: "Keep an eye on your progress with our user-friendly dashboard.",
      image: trustImg,
    },
    {
      id: "3",
      title: "Get Started Now",
      description: "Join us today and unlock your potential.",
      image: securityImg,
    },
  ];

  const Slide = ({ item }) => (
    <View className="items-center justify-center" style={{ width }}>
      <Image source={item.image} className="w-[325px] h-[325px]" />
      <Text className="text-xl font-bold">{item.title}</Text>
      <Text className="text-center mt-2 px-4" style={{ width: width - 30 }}>
        {item.description}
      </Text>
    </View>
  );

  const Dots = ({ activeIndex }) => (
    <View className="flex-row justify-center">
      {slides.map((_, index) => (
        <View
          key={index}
          className={`h-2 w-2 mx-1 rounded-full ${
            index === activeIndex ? "bg-[#43C6AC]" : "bg-[#CED4D5]"
          }`}
        />
      ))}
    </View>
  );

  const OnboardingScreen = () => {

    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef(null);
    const navigation = useNavigation();

    const handleScroll = (event) => {
      const contentOffsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(contentOffsetX / width);
      setActiveIndex(index);
    };

    useEffect(() => {
      const interval = setInterval(() => {
        if (flatListRef.current) {
          const nextIndex = activeIndex === slides.length - 1 ? 0 : activeIndex + 1;
          setActiveIndex(nextIndex);
          flatListRef.current.scrollToIndex({
            index: nextIndex,
            animated: true,
          });
        }
      }, 2500);
      return () => clearInterval(interval); 
    }, [activeIndex]);

    return (
      <SafeAreaView className="flex-1 bg-white ">
        <StatusBar backgroundColor={"white"} />
        <View className="flex-1">
          <Text className="text-2xl font-bold text-center mt-12">VoteSmart</Text>
          <FlatList
            ref={flatListRef} 
            pagingEnabled
            data={slides}
            className="h-[50%]"
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <Slide item={item} />}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          />
          {/* Dots above the button */}
          <View className="mt-1 mb-10">
            <Dots activeIndex={activeIndex} />
          </View>
          {/* Get Started Button */}
          <TouchableOpacity
            className="bg-primarycolor p-3 rounded-lg mx-4 mt-auto mb-20"
            onPress={() => navigation.navigate("HomeTabs")}
          >
            <Text className="text-white text-center text-lg font-bold">
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  export default OnboardingScreen;
