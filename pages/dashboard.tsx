import { Box,  Flex } from "@chakra-ui/react";
import axios from "axios";
import { NextPage } from "next";
import { useAuth } from "../lib/firebase";


const DashBoard: NextPage = () => {
  const userId = useAuth();

  return (
    <Flex direction="column">
    <Box w="100%" bgColor="gray.400">
    
        <Box maxW="1200px" bgColor="blue" m="auto">
            ss
        </Box>
      
    </Box>

    <Box>
   
    </Box>
    </Flex>
  );
};

export default DashBoard;
