import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { detailMovie, getVideos, IdetailMovie, IVideos } from "../api";
import Detail from "../components/Detail";

const Wrapper = styled.div`
  padding-top: 100px;
`;

const PopDetail = () => {
  const { movieId } = useParams();
  const { isLoading: detailLoading, data: detailData } = useQuery<IdetailMovie>(
    ["detail", movieId],
    () => detailMovie(movieId || "")
  );
  const { isLoading: videosLoading, data: videosData } = useQuery<IVideos>(
    ["videos", movieId],
    () => getVideos(movieId || "")
  );
  return (
    <Wrapper>
      {detailLoading ? (
        <p>is loading...</p>
      ) : (
        <Detail
          detail={detailData}
          link={"popular"}
          videos={videosData}
        ></Detail>
      )}
    </Wrapper>
  );
};

export default PopDetail;
