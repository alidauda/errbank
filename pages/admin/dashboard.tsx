import { Box, Divider, Flex, Heading, Link, Text } from "@chakra-ui/react";

import { NextPage } from "next";
import { useRouter } from "next/router";
import { useAuth } from "../../lib/firebase";
import NextLink from "next/link";

import Header from "../../components/Header";

const DashBoard: NextPage = () => {
  const auth = useAuth();
  const route = useRouter();

  if (!auth?.userId?.uid) {
    return (
      <NextLink href="/" passHref>
        <Link>Home</Link>
      </NextLink>
    );
  }

  return (
    <Flex direction="column">
      <Header />
      <Box width="100%">
        <Box height="80px" maxW="1200px" m="auto">
          <Divider orientation="vertical" />
          <NextLink href="/admin/errorDetail" passHref>
            <Link >
              <Box p={5} shadow="md" borderWidth="1px" mt={2}>
                <Heading mb={4}>Error with jsx</Heading>
                <Text mt={4}>khcjbjxgcdhcvdhxvcdgcx dhcdcdhcg</Text>
              </Box>
            </Link>
          </NextLink>
        </Box>
      </Box>
    </Flex>
  );
};

export default DashBoard;
