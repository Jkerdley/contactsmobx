import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ContactDto } from "src/types/dto/ContactDto";
import { GroupContactsDto } from "src/types/dto/GroupContactsDto";
import { GroupContactsCard } from "src/components/GroupContactsCard";
import { Empty } from "src/components/Empty";
import { ContactCard } from "src/components/ContactCard";
import { useGetContactsQuery, useGetGroupsQuery } from "src/store/api";

export const GroupPage = () => {
    const { groupId } = useParams<{ groupId: string }>();
    const [filteredContacts, setFilteredContacts] = useState<ContactDto[]>([]);
    const { data: contacts, isLoading, error } = useGetContactsQuery();
    const { data: groups } = useGetGroupsQuery();

    const [groupContacts, setGroupContacts] = useState<GroupContactsDto>();

    useEffect(() => {
        if (groups) {
            const findGroup = groups.find(({ id }) => id === groupId);
            setGroupContacts(findGroup);
            if (contacts && findGroup) {
                setFilteredContacts(contacts.filter(({ id }) => findGroup.contactIds.includes(id)));
            }
        }
    }, [groupId, groups, contacts]);

    if (isLoading) return <div>Loading...</div>;
    if (error) {
        const errorMessage = "status" in error ? String(error.status) : "Неизвестная ошибка";
        return <div>Error: {errorMessage}</div>;
    }
    return (
        <Row className="g-4">
            {groupContacts ? (
                <>
                    <Col xxl={12}>
                        <Row xxl={3}>
                            <Col className="mx-auto">
                                <GroupContactsCard groupContacts={groupContacts} />
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row xxl={4} className="g-4">
                            {filteredContacts.map((contact) => (
                                <Col key={contact.id}>
                                    <ContactCard contact={contact} withLink />
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </>
            ) : (
                <Empty />
            )}
        </Row>
    );
};
