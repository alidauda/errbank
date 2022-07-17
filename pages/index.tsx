import type { NextPage } from "next";
import { useAuth } from "../lib/firebase";
import { FcGoogle } from "react-icons/fc";
import { Button, Center, Link, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
const Home: NextPage = () => {
  const auth = useAuth();
  const route = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <Center p={8}>
      <Button
        onClick={(e) => {
          setLoading(true);
          auth?.signin().then(() => {
            route.push("/dashboard");
            setLoading(false);
          });
        }}
        isLoading={loading}
        w={"full"}
        maxW={"md"}
        variant={"outline"}
        leftIcon={<FcGoogle />}
      >
        <Center>
          <Text>Sign in with Google</Text>
        </Center>
      </Button>
    </Center>
  );
};

export default Home;
