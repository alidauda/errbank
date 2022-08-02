import { Box, Divider } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { firestore, useAuth } from '../../lib/firebase';

const ErrorDetail: NextPage = () => {
   const router = useRouter();
   const auth = useAuth();
   const{slug}=router.query;
   const [dat, setData] = useState([] as any);
   
      const data =firestore.collection("errors").doc(auth?.userId?.uid).collection("userErrors").doc(slug! as string);
      data.get().then((doc) => {
       setData([doc.data()])
    
      })
 
 

  return (
    <Box width='100%'>
      <Box height='80px' maxW='1200px' m='auto' bgColor='red.300'>
        <Divider orientation='vertical' />
        
       
        
      </Box>
      <Box  maxW='1200px' m='auto' bgColor='red.300' mt={7}>
        <Divider orientation='vertical' />
        {
         dat && dat.map((item:any)=>{
            return(
               <>
               <h1>{item.FixedCode}</h1>
               </>
            )
         })
        }
       
        
      </Box>
    </Box>
  );
};

export default ErrorDetail;
