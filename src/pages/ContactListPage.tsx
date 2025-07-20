import { Col, Row } from "react-bootstrap";
import { ContactCard } from "src/components/ContactCard";
import { useFilteredContacts } from "src/hooks";
import { FilterForm } from "src/components/FilterForm";
import { observer } from "mobx-react-lite";
import { contactsStore } from "src/store/contactsStore";
import { groupsStore } from "src/store/groupsStore";

export const ContactListPage = observer(() => {
  const {
    items: contacts,
    loading: contactsLoading,
    error: contactsError,
  } = contactsStore;
  const {
    items: groups,
    loading: groupsLoading,
    error: groupsError,
  } = groupsStore;

  const { filteredContacts, onSubmit } = useFilteredContacts(contacts, groups);

  const error = contactsError || groupsError;

  if (contactsLoading || groupsLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Row xxl={1}>
      <Col className="mb-3">
        <FilterForm
          groupContactsList={groups}
          initialValues={{}}
          onSubmit={onSubmit}
        />
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
    </Row>
  );
});
