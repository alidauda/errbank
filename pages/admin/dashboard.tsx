import {
  Box,
  Divider,
  Flex,
  Heading,
  Link,
  Text,
  Image,
} from '@chakra-ui/react';

import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { firestore, useAuth } from '../../lib/firebase';
import NextLink from 'next/link';

import Header from '../../components/Header';
import { useEffect, useState } from 'react';
import { Errors } from '../../utils/types';

const DashBoard: NextPage = () => {
  const auth = useAuth();
  const route = useRouter();
  const [dat, setData] = useState([] as any);
  const fetchBlogs = async () => {
    const response = firestore
      .collection('errors')
      .doc(auth?.userId?.uid)
      .collection('userErrors');
    const data = await response.get();
    data.docs.forEach((item) => {
      console.log(item.data());
      setData([item.data()]);
    });
  };
  useEffect(() => {
    fetchBlogs();
  }, []);

  console.log(dat);

  if (!auth?.userId?.uid) {
    return (
      <NextLink href='/' passHref>
        <Link>Home</Link>
      </NextLink>
    );
  }

  return (
    <Flex direction='column'>
      <Header />
      <Box width='100%'>
        <Box height='80px' maxW='1200px' m='auto'>
          <Divider orientation='vertical' />
          
              <Box p={5} shadow='md' borderWidth='1px' mt={2}>
                {dat &&
                  dat.map((item: Errors) => {
                    
                    return (
                      <>
                      <NextLink href={`/admin/${item.slug}`} passHref>
            <Link>
                        <Heading mb={4}>{item.errorName}</Heading>
                        </Link>
          </NextLink>
                        <Image src={item.errorImage} alt={item.errorName} />
                      </>
                    );
                  })}
              </Box>
            
        </Box>
      </Box>
    </Flex>
  );
};

export default DashBoard;
