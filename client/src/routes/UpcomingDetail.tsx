import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { detailMovie, getVideos, IdetailMovie } from "../api";
import Detail from "../components/Detail";

const Wrapper = styled.div`
  padding-top: 100px;
`;

const UpcomingDetail = () => {
  const { movieId } = useParams();
  const { isLoading: detailLoading, data: detailData } = useQuery<IdetailMovie>(
    ["detail", movieId],
    () => detailMovie(movieId || "")
  );
  const { isLoading: videosLoading, data: videosData } = useQuery<IdetailMovie>(
    ["videos", movieId],
    () => getVideos(movieId || "")
  );
  return (
    <Wrapper>
      {detailLoading ? (
        <p>is loading...</p>
      ) : videosLoading ? (
        <p>is loading...</p>
      ) : (
        <Detail
          detail={detailData}
          link={"upcoming"}
          videos={videosData}
        ></Detail>
      )}
    </Wrapper>
  );
};

export default UpcomingDetail;
