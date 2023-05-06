import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Background from '../assets/images/home-background.png';
import db from '../firebase';
import { setMovies } from '../redux/features/movies';
import ImgSlider from './ImgSlider';
import NewDisney from './NewDisney';
import Originals from './Originals';
import Recommends from './Recommends';
import Trending from './Trending';
import Viewers from './Viewers';

const Home = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.user);
  let newDisney = [];
  let recommends = [];
  let originals = [];
  let trending = [];

  useEffect(() => {
    db.collection('movies').onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        console.log(recommends);

        switch (doc.data().type) {
          case 'new':
            // newDisney.push({ id: doc.id, ...doc.data() });
            newDisney = [...newDisney, { id: doc.id, ...doc.data() }];
            break;
          case 'original':
            originals = [...originals, { id: doc.id, ...doc.data() }];
            // originals.push({ id: doc.id, ...doc.data() });
            break;
          case 'trending':
            // trending.push({ id: doc.id, ...doc.data() });
            trending = [...trending, { id: doc.id, ...doc.data() }];
            break;
          case 'recommend':
            recommends = [...recommends, { id: doc.id, ...doc.data() }];
            // recommends.push({ id: doc.id, ...doc.data() });
            break;
          default:
            break;
        }
      });
      dispatch(
        setMovies({
          recommend: recommends,
          newDisney,
          original: originals,
          trending,
        })
      );
    });
  }, [name]);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url(${Background}) center center / cover no-repeat fixed;
    background-size: cover;
    content: '';
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
