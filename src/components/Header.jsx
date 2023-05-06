import React from 'react';
import styled from 'styled-components';
import LogoImg from '../assets/images/logo.svg';
import HomeLogo from '../assets/images/home-icon.svg';
import SearchLogo from '../assets/images/search-icon.svg';
import MovieLogo from '../assets/images/movie-icon.svg';
import SeriesLogo from '../assets/images/series-icon.svg';
import WatchlistLogo from '../assets/images/watchlist-icon.svg';
import OriginalLogo from '../assets/images/original-icon.svg';
import { auth, provider } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  setSignOutState,
  setUserLoginDetails,
} from '../redux/features/userSlice';
import { useEffect } from 'react';

// 1:16:40

const Header = () => {
  const dispatch = useDispatch();
  const { name, email, photo } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleAuth = () => {
    if (!name) {
      auth
        .signInWithPopup(provider)
        .then((result) => {
          console.log(result);
          dispatch(
            setUserLoginDetails({
              name: result.user.displayName,
              email: result.user.email,
              photo: result.user.photoURL,
            })
          );
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (name) {
      auth
        .signOut()
        .then(() => {
          dispatch(setSignOutState());
          navigate('/');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(
          setUserLoginDetails({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );
        navigate('/home');
      }
    });
  }, []);

  return (
    <Nav>
      <Logo>
        <img src={LogoImg} alt="Disney+" />
      </Logo>

      {!name ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
          <NavMenu>
            <a href="/home">
              <img src={HomeLogo} alt="home" />
              <span>HOME</span>
            </a>
            <a href="/search">
              <img src={SearchLogo} alt="search" />
              <span>SEARCH</span>
            </a>
            <a href="/watchlist">
              <img src={WatchlistLogo} alt="watchlist" />
              <span>WATCHLIST</span>
            </a>
            <a href="/originals">
              <img src={OriginalLogo} alt="originals" />
              <span>ORIGINALS</span>
            </a>
            <a href="/movies">
              <img src={MovieLogo} alt="movies" />
              <span>MOVIES</span>
            </a>
            <a href="/series">
              <img src={SeriesLogo} alt="series" />
              <span>SERIES</span>
            </a>
          </NavMenu>
          <SignOut>
            <UserImg src={photo} alt="user pic" />
            <Dropdown>
              <span onClick={handleAuth}>Sign Out</span>
            </Dropdown>
          </SignOut>
        </>
      )}
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  img {
    display: block;
    width: 100%;
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: 25px;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }

    span {
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;

      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: '';
        height: 2px;
        opacity: 0;
        left: 0px;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }

    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1;
      }
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Login = styled.a`
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  cursor: pointer;
  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const UserImg = styled.img`
  height: 100%;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 48px;
  right: 30px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0/50%) 0px 0px 18px 0px;
  padding: 10px 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 110px;
  text-align: center;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  &:hover {
    ${Dropdown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

export default Header;
