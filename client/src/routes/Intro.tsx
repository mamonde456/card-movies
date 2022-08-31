import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ItmdbMovies, popularMovies, topRatedMovies } from "../api";
import { makeImageFormat } from "../until";
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
`;

const CardBox = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-evenly;
`;

const Cards = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;

  &:nth-child(2n) {
    top: -150px;
  }
`;
const Card = styled.div`
  width: 300px;
  height: 400px;
  border-radius: 15px;
`;

const Image = styled.div<{ bgPhoto: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center;
  border-radius: 15px;
  position: relative;
  display: flex;
  align-items: end;
  justify-content: center;
  p {
    padding: 10px;
    font-weight: 700;
    font-size: 24px;
    color: white;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.8);
    text-align: center;
    position: absolute;
  }
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;

const Title = styled.div`
  padding: 10px;
  font-size: 42px;
  font-weight: 700;
`;
const Text = styled.div`
  padding: 10px;
  font-size: 28px;
  color: #eeee;
`;

const Btn = styled.div`
  margin-top: 100px;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 30px;
  background-color: #f1f1f1;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
  span {
    color: black;
    padding: 5px;
  }
`;
const Icon = styled.svg`
  width: 50px;
  height: 50px;
  padding: 10px;
`;

const Intro = () => {
  const { isLoading, data } = useQuery<ItmdbMovies>(
    ["intro", "top"],
    popularMovies
  );
  return (
    <Wrapper>
      {isLoading ? (
        <p>loading...</p>
      ) : (
        <>
          <CardBox>
            <AnimatePresence>
              <Cards
                initial={{ y: 150 }}
                animate={{ y: -150 }}
                transition={{ type: "tween", duration: 1 }}
              >
                {data?.results?.slice(0, 3).map((movie) => (
                  <Card>
                    <Image
                      bgPhoto={makeImageFormat(movie.backdrop_path, "w500")}
                    ></Image>
                  </Card>
                ))}
              </Cards>
              <Cards
                initial={{ y: 0 }}
                animate={{ y: -150 }}
                transition={{ type: "tween", duration: 1 }}
              >
                {data?.results?.slice(3, 6).map((movie) => (
                  <Card>
                    <Image
                      bgPhoto={makeImageFormat(movie.backdrop_path, "w500")}
                    ></Image>
                  </Card>
                ))}
              </Cards>
              <Cards
                initial={{ y: 150 }}
                animate={{ y: -150 }}
                transition={{ type: "tween", duration: 1 }}
              >
                {data?.results?.slice(6, 9).map((movie) => (
                  <Card>
                    <Image
                      bgPhoto={makeImageFormat(movie.backdrop_path, "w500")}
                    ></Image>
                  </Card>
                ))}
              </Cards>
              <Cards
                initial={{ y: 0 }}
                animate={{ y: -150 }}
                transition={{ type: "tween", duration: 1 }}
              >
                {data?.results?.slice(9, 12).map((movie) => (
                  <Card>
                    <Image
                      bgPhoto={makeImageFormat(movie.backdrop_path, "w500")}
                    ></Image>
                  </Card>
                ))}
              </Cards>
              <Cards
                initial={{ y: 150 }}
                animate={{ y: -150 }}
                transition={{ type: "tween", duration: 1 }}
              >
                {data?.results?.slice(12, 15).map((movie) => (
                  <Card>
                    <Image
                      bgPhoto={makeImageFormat(movie.backdrop_path, "w500")}
                    ></Image>
                  </Card>
                ))}
              </Cards>
              <Cards
                initial={{ y: 0 }}
                animate={{ y: -150 }}
                transition={{ type: "tween", duration: 1 }}
              >
                {data?.results?.slice(15, 18).map((movie) => (
                  <Card>
                    <Image
                      bgPhoto={makeImageFormat(movie.backdrop_path, "w500")}
                    ></Image>
                  </Card>
                ))}
              </Cards>
            </AnimatePresence>
          </CardBox>
          <Overlay>
            <Title>
              Watch unlimited movies and dramas and upload your own movies and
              dramas!
            </Title>
            <Text>New movies and dramas are updated every week.</Text>
            <Link to="movies">
              <Btn>
                <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path d="M560 448H512V113.5c0-27.25-21.5-49.5-48-49.5L352 64.01V128h96V512h112c8.875 0 16-7.125 16-15.1v-31.1C576 455.1 568.9 448 560 448zM280.3 1.007l-192 49.75C73.1 54.51 64 67.76 64 82.88V448H16c-8.875 0-16 7.125-16 15.1v31.1C0 504.9 7.125 512 16 512H320V33.13C320 11.63 300.5-4.243 280.3 1.007zM232 288c-13.25 0-24-14.37-24-31.1c0-17.62 10.75-31.1 24-31.1S256 238.4 256 256C256 273.6 245.3 288 232 288z" />
                </Icon>
                <span>Get a free experience</span>
              </Btn>
            </Link>
          </Overlay>
        </>
      )}
    </Wrapper>
  );
};

export default Intro;
