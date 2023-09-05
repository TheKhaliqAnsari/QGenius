"use client";

import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Icon,
  IconProps,
  ChakraProvider,
} from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { DropDown } from "../DropDown/DropDown";
import { useState } from "react";
import QuestionSection from "./QuestionSection";

export default function DSA() {
  const [selectedOptions, setSelectedOptions] = useState({
    subtopic: "",
    difficulty: "",
  });
  const [data, setData] = useState("");
  const handleSearchData = (data) => {
    async function fetchData(selectedOptions) {
      let responce = await fetch(
        `http://localhost:8082/generate-dsa-questions/?difficulty=${selectedOptions.difficulty}&topic=${selectedOptions.subtopic}&numofquestion=1`
      );
      responce = await responce.json();
      setData(responce.ans);
      console.log(responce, "responce dsa");
    }
    console.log(data, "endpoints");
    fetchData(data);
  };
  return (
    <ChakraProvider>
      <Navbar />
      <Container maxW={"5xl"}>
        <Stack
          textAlign={"center"}
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Generate Random DSA Questions{" "}
            <Text as={"span"} color={"orange.400"}>
              - Tailored to Your Needs
            </Text>
          </Heading>
          <Text color={"gray.500"} maxW={"3xl"}>
            QGenius allows you to generate random Data Structures and Algorithms
            (DSA) questions. Select your preferred topic, difficulty level, and
            get questions tailored to your needs. You can also access detailed
            solutions, constraints, test cases, correct answers, FAQs, and more.
          </Text>
        </Stack>
      </Container>
      <DropDown
        type="dsa"
        setSelectedOptions={setSelectedOptions}
        selectedOptions={selectedOptions}
        handleSearchData={handleSearchData}
      />
      <QuestionSection data={data} />
      <Footer />
    </ChakraProvider>
  );
}
