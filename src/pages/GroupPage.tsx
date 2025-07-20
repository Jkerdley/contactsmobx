import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ContactDto } from "src/types/dto/ContactDto";
import { GroupContactsDto } from "src/types/dto/GroupContactsDto";
import { GroupContactsCard } from "src/components/GroupContactsCard";
import { Empty } from "src/components/Empty";
import { ContactCard } from "src/components/ContactCard";
import { groupsStore } from "src/store/groupsStore";
import { contactsStore } from "src/store/contactsStore";

export const GroupPage = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const [filteredContacts, setFilteredContacts] = useState<ContactDto[]>([]);
  const { items: contacts, loading: isLoading, error } = contactsStore;
  const { items: groups } = groupsStore;

  const [groupContacts, setGroupContacts] = useState<GroupContactsDto>();

  useEffect(() => {
    if (groups) {
      const findGroup = groups.find(({ id }) => id === groupId);
      setGroupContacts(findGroup);
      if (contacts && findGroup) {
        setFilteredContacts(
          contacts.filter(({ id }) => findGroup.contactIds.includes(id))
        );
      }
    }
  }, [groupId, groups, contacts]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
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
