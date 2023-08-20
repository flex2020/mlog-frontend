import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../utils/auth';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (SpecificComponent) {
    function AuthenticationCheck(props) {
      const [isLogin, setIsLogin] = useState(false);
      const navigate = useNavigate();
  
      useEffect(() => {
        const checkAuth = async () => {
          const result = await auth();
          if (!result) {
            alert('권한이 없습니다!');
            navigate('/');
          } else {
            setIsLogin(true);
          }
        };
    
        checkAuth();
      }, [navigate]);
      if (isLogin) {
        return (
          <SpecificComponent {...props} />
        );
      } else {
        return null;
      }

    }
  
    return AuthenticationCheck;
  
  }