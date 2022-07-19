import { WarningTwoIcon ,AddIcon} from "@chakra-ui/icons"
import { Box, Button, Flex, Heading, Spacer , IconButton} from "@chakra-ui/react"
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useAuth } from "../lib/firebase";
import auth from "./auth"

const Header:NextPage=()=>{
    const auth=useAuth();
    const route=useRouter();
    return(
        <Box w="100%" bgColor="gray.400">
        <Box maxW="1200px" m="auto">
          <Flex justifyContent={"flex-start"} alignItems='center'>
            <WarningTwoIcon w={8} h={8} color="red.500"/>
            <Heading p={5} color="red.500">ERRBANK</Heading>
            <Spacer/>

            <Button colorScheme='teal' onClick={(e) => {
              auth?.signout().then(() => {
                route.push("/")
              })
            }}>Log Out</Button>
<IconButton
m={2}
  colorScheme='blue'
  aria-label='add new error'
  icon={<AddIcon />}
  onClick={(e) => {
    route.push("/admin/addError");
  }}
  
/>
          </Flex>
        </Box>
      </Box>
    )
}

export default  Header;