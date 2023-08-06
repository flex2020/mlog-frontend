import React from 'react';
import styled from 'styled-components';

const SytledDiv = styled.div`
  padding: 0;
`;

const Page = ( {children} ) => {
  return (
    <SytledDiv>
      {children}
    </SytledDiv>
  );
};

export default Page;