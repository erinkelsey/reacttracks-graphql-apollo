import React, { useContext } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import IconButton from "@material-ui/core/IconButton";
import TrashIcon from "@material-ui/icons/DeleteForeverOutlined";

import { GET_TRACKS_QUERY } from "../../pages/App";
import { UserContext } from "../../Root";

const DeleteTrack = ({ track }) => {
  const currentUser = useContext(UserContext);
  const isCurrentUser = currentUser.id === track.postedBy.id;

  const handleUpdateCache = (cache, { data: { deleteTrack } }) => {
    const data = cache.readQuery({ query: GET_TRACKS_QUERY });
    const index = data.tracks.findIndex(
      track => Number(track.id) === deleteTrack.trackId
    )
    // 1 -> remove one element -> mutates array
    // data.tracks.splice(index, 1);

    // create a new array, omitting element to be deleted
    // slice does not mutate
    // ... array spread operator
    const tracks = [...data.tracks.slice(0, index), ...data.tracks.slice(index+1)];
    cache.writeQuery({ query: GET_TRACKS_QUERY, data: { tracks } });
  }

  return isCurrentUser && (
    <Mutation 
      mutation={DELETE_TRACK_MUTATION}
      variables={{ trackId: track.id }}
      onCompleted={data => {
        console.log({data});
      }}
      // refetchQueries={() =>[{ query: GET_TRACKS_QUERY }]}
      update={handleUpdateCache}
    >
      {deleteTrack => (
        <IconButton onClick={deleteTrack}>
          <TrashIcon />
        </IconButton>
      )}
    </Mutation>
  )
};

const DELETE_TRACK_MUTATION = gql`
  mutation($trackId: Int!){
    deleteTrack(trackId: $trackId){
      trackId
    }
  }
`

export default DeleteTrack;
