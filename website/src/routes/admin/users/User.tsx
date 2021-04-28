import { useParams } from "react-router-dom";
import UserProfile from '../../../components/UserProfile';
import { Heading1, Heading3 } from '../../../components/Typography';
import { gql, useQuery } from '@apollo/client';
import {GetUserQuery} from '../../../generated/graphql';

const GetUser = gql`
    query GetUser($id: String!) {
        getUser(id: $id) {
            id
            name
            isBeeping
            isStudent
            role
            venmo
            cashapp
            singlesRate
            groupRate
            capacity
            masksRequired
            photoUrl
            queueSize
            phone
            username
            rating
            location {
                latitude
                longitude
            }
        }
    }
`;

function UserPage() {
    const { userId } = useParams<{ userId: string }>();
    const { data, loading, error } = useQuery<GetUserQuery>(GetUser, { variables: { id: userId } }); 

    return (
        <>
            <Heading3>User</Heading3>
            {error && error}
            {loading ? <Heading1>Loading</Heading1> : <UserProfile user={data?.getUser} admin />}
        </>
    );
}

export default UserPage;
