import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { detailMovie, IdetailMovie } from "../api";
import Detail from "../components/Detail";

const Wrapper = styled.div`
  padding-top: 100px;
`;

const PopDetail = () => {
  const { movieId } = useParams();
  const { isLoading, data } = useQuery<IdetailMovie>(["detail", movieId], () =>
    detailMovie(movieId || "")
  ) as any;
  return (
    <Wrapper>
      {isLoading ? (
        <p>is loading...</p>
      ) : (
        <Detail detail={data} link={"popular"}></Detail>
      )}
    </Wrapper>
  );
};

export default PopDetail;
