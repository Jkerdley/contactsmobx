import { Col, Row } from "react-bootstrap";
import { GroupContactsCard } from "src/components/GroupContactsCard";
import { useGetGroupsQuery } from "src/store/api";

export const GroupListPage = () => {
    const { data: groups, isLoading, error } = useGetGroupsQuery();

    if (isLoading) return <div>Loading...</div>;
    if (error) {
        const errorMessage = "status" in error ? String(error.status) : "Неизвестная ошибка";
        return <div>Error: {errorMessage}</div>;
    }

    return (
        <Row xxl={4}>
            {groups?.map((groupContacts) => (
                <Col key={groupContacts.id}>
                    <GroupContactsCard groupContacts={groupContacts} withLink />
                </Col>
            ))}
        </Row>
    );
};
