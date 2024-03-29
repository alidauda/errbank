import { NextPage } from 'next';
import { Box, Button, FormLabel, Textarea } from '@chakra-ui/react';
import { useState } from 'react';

import { useAuth } from '../../lib/firebase';
import axios from 'axios';
import { useRouter } from 'next/router';

const AddError: NextPage = () => {
  const [error, setError] = useState('');
  const [fixed, fixedError] = useState('');
  const auth = useAuth();
  const [loading, loadingError] = useState(false);
  const id = auth?.userId?.uid;
  const route = useRouter();

  async function Caller(errorName: string, id: string, fixed: string) {
    await axios
      .post('/api/errorHelper', {
        code: errorName,
        errorName,
        id,
        codeFix: fixed,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <Box width='100%'>
      <Box maxW='1200px' m='auto'>
        <FormLabel m='3px'>ErrorCode</FormLabel>
        <Textarea
          placeholder='paste your error code'
          m='3px'
          onChange={(e) => {
            setError(e.target.value);
          }}
        />
        <FormLabel m='3px'>CodeFix</FormLabel>
        <Textarea
          placeholder='paste the fixed code here'
          m='3px'
          onChange={(e) => {
            fixedError(e.target.value);
          }}
        />
        <Button
          colorScheme='teal'
          variant='solid'
          ml='50%'
          mt='10px'
          alignSelf='center'
          isLoading={loading}
          onClick={async (_) => {
            loadingError(true);
            await Caller(error, id!, fixed);
            loadingError(false);
            route.push('/admin/dashboard');
          }}
        >
          Button
        </Button>
      </Box>
    </Box>
  );
};

export default AddError;
