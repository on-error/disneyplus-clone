import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Card from './Card';

const Recommends = () => {
  const movies = useSelector((state) => state.movies.recommend);

  return (
    <Container>
      <h4>Recommended for you</h4>
      <Content>
        {movies?.length &&
          movies.map((movie, index) => {
            return (
              <Card
                key={movie.id + '' + index}
                link={'/details/' + movie.id}
                imgSrc={movie.cardImg}
                title={movie.title}
              />
            );
          })}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 0 26px;
`;

const Content = styled.div`
  display: grid;
  grid-gap: 25px;
  gap: 25px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export default Recommends;
